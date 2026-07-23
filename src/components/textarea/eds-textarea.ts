import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { hostBase, fieldStyles } from '../../foundations/shared.js';

export type EdsTextareaResize = 'none' | 'vertical' | 'both';

/**
 * Multi-line text input for forms and long-form content.
 *
 * @slot - Textarea body when `value` is not set
 * @fires eds-input - Fired on each keystroke with the current value
 * @fires eds-change - Fired when the value is committed (blur)
 *
 * @element eds-textarea
 */
@customElement('eds-textarea')
export class EdsTextarea extends LitElement {
  static override styles = [
    hostBase,
    fieldStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      textarea.control {
        width: 100%;
        min-height: 5rem;
        border: 0;
        background: transparent;
        padding: 0;
        margin: 0;
        color: inherit;
        font: inherit;
        line-height: var(--eds-line-height-normal);
      }

      textarea.control:focus,
      textarea.control:focus-visible {
        box-shadow: none;
        border-color: transparent;
        outline: none;
      }

      .wrapper {
        display: flex;
        align-items: stretch;
        width: 100%;
        min-height: 5rem;
        padding: var(--eds-space-3);
      }
    `,
  ];

  @property()
  label = '';

  @property()
  value = '';

  @property()
  placeholder = '';

  @property({ type: Number })
  rows = 4;

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
  resize: EdsTextareaResize = 'vertical';

  @property({ type: Number })
  maxlength = 0;

  private inputId = `eds-textarea-${Math.random().toString(36).slice(2, 9)}`;

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
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.emit('eds-input', event);
  }

  private handleChange(event: Event) {
    this.emit('eds-change', event);
  }

  override render() {
    const controlClasses = {
      control: true,
      wrapper: true,
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
          <textarea
            class="control"
            id=${this.inputId}
            style=${styleMap({ resize: this.resize })}
            .value=${this.value}
            placeholder=${this.placeholder}
            rows=${this.rows}
            maxlength=${ifDefined(this.maxlength > 0 ? this.maxlength : undefined)}
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
          ></textarea>
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
    'eds-textarea': EdsTextarea;
  }
}
