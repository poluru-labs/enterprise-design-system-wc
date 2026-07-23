import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { hostBase, fieldStyles } from '../../foundations/shared.js';
import type { EdsIconName } from '../../icons/paths.js';
import '../icon/eds-icon.js';

export type EdsInputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
export type EdsInputSize = 'sm' | 'md' | 'lg';

/**
 * Text-like input for forms and filters.
 *
 * @slot icon - Custom leading icon
 * @slot icon-trailing - Custom trailing icon
 * @fires eds-input - Fired on each keystroke with the current value
 * @fires eds-change - Fired when the value is committed (blur or Enter)
 *
 * @element eds-input
 */
@customElement('eds-input')
export class EdsInput extends LitElement {
  static override styles = [
    hostBase,
    fieldStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      input.control {
        width: 100%;
        border: 0;
        background: transparent;
        padding: 0;
        min-height: unset;
        color: inherit;
        font: inherit;
      }

      input.control:focus,
      input.control:focus-visible {
        box-shadow: none;
        border-color: transparent;
        outline: none;
      }

      .wrapper {
        display: flex;
        align-items: center;
        gap: var(--eds-space-2);
        width: 100%;
      }

      .affix {
        display: inline-flex;
        align-items: center;
        color: var(--eds-color-text-muted);
        line-height: 0;
        flex-shrink: 0;
      }

      .affix[data-empty='true'] {
        display: contents;
      }
    `,
  ];

  @property()
  label = '';

  @property({ reflect: true })
  type: EdsInputType = 'text';

  @property()
  value = '';

  @property()
  placeholder = '';

  @property()
  name = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true })
  invalid = false;

  @property({ attribute: 'error-message' })
  errorMessage = '';

  @property()
  hint = '';

  @property({ reflect: true })
  size: EdsInputSize = 'md';

  /** Leading icon name. */
  @property()
  icon: EdsIconName | '' = '';

  /** Trailing icon name. */
  @property({ attribute: 'icon-trailing' })
  iconTrailing: EdsIconName | '' = '';

  private inputId = `eds-input-${Math.random().toString(36).slice(2, 9)}`;

  private emit(name: 'eds-input' | 'eds-change', originalEvent: Event) {
    this.dispatchEvent(
      new CustomEvent(name, {
        detail: { value: this.value, originalEvent },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleInput(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.emit('eds-input', event);
  }

  private handleChange(event: Event) {
    this.emit('eds-change', event);
  }

  private iconSize(): 'sm' | 'md' {
    return this.size === 'sm' ? 'sm' : 'md';
  }

  override render() {
    const controlClasses = {
      control: true,
      wrapper: true,
      [this.size]: true,
    };

    return html`
      <div class="field">
        ${this.label
          ? html`<label class="label" for=${this.inputId}>${this.label}</label>`
          : nothing}
        <div
          class=${classMap(controlClasses)}
          data-invalid=${this.invalid ? 'true' : 'false'}
        >
          <span class="affix" data-empty=${this.icon ? 'false' : 'true'}>
            <slot name="icon">
              ${this.icon
                ? html`<eds-icon name=${this.icon} size=${this.iconSize()}></eds-icon>`
                : nothing}
            </slot>
          </span>
          <input
            class="control"
            id=${this.inputId}
            type=${this.type}
            .value=${this.value}
            placeholder=${this.placeholder}
            name=${ifDefined(this.name || undefined)}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            aria-invalid=${this.invalid ? 'true' : 'false'}
            aria-describedby=${ifDefined(
              this.errorMessage
                ? `${this.inputId}-error`
                : this.hint
                  ? `${this.inputId}-hint`
                  : undefined,
            )}
            @input=${this.handleInput}
            @change=${this.handleChange}
          />
          <span class="affix" data-empty=${this.iconTrailing ? 'false' : 'true'}>
            <slot name="icon-trailing">
              ${this.iconTrailing
                ? html`<eds-icon name=${this.iconTrailing} size=${this.iconSize()}></eds-icon>`
                : nothing}
            </slot>
          </span>
        </div>
        ${this.invalid && this.errorMessage
          ? html`<span class="error" id=${`${this.inputId}-error`}>${this.errorMessage}</span>`
          : this.hint
            ? html`<span class="hint" id=${`${this.inputId}-hint`}>${this.hint}</span>`
            : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-input': EdsInput;
  }
}
