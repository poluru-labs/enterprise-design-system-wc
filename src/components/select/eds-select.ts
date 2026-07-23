import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { hostBase, fieldStyles } from '../../foundations/shared.js';

export type EdsSelectOption = { label: string; value: string; disabled?: boolean };
export type EdsSelectSize = 'sm' | 'md' | 'lg';

/**
 * Native select styled for enterprise forms.
 *
 * @fires eds-change - Fired when the selected value changes
 *
 * @element eds-select
 */
@customElement('eds-select')
export class EdsSelect extends LitElement {
  static override styles = [
    hostBase,
    fieldStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      select.control {
        width: 100%;
        border: 0;
        background: transparent;
        padding: 0;
        min-height: unset;
        cursor: pointer;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23525252' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 0 center;
        padding-right: 1.5rem;
      }

      select.control:focus,
      select.control:focus-visible {
        box-shadow: none;
      }

      select.control:disabled {
        cursor: not-allowed;
      }
    `,
  ];

  @property()
  label = '';

  @property()
  value = '';

  @property()
  placeholder = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true })
  invalid = false;

  @property({ attribute: 'error-message' })
  errorMessage = '';

  @property()
  hint = '';

  @property({ reflect: true })
  size: EdsSelectSize = 'md';

  @property({ type: Array })
  options: EdsSelectOption[] = [];

  private selectId = `eds-select-${Math.random().toString(36).slice(2, 9)}`;

  private handleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('eds-change', {
        detail: { value: this.value, originalEvent: event },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    const controlClasses = {
      control: true,
      [this.size]: true,
    };

    return html`
      <div class="field">
        ${this.label
          ? html`<label class="label" for=${this.selectId}>${this.label}</label>`
          : nothing}
        <div
          class=${classMap(controlClasses)}
          data-invalid=${this.invalid ? 'true' : 'false'}
        >
          <select
            class="control"
            id=${this.selectId}
            .value=${this.value}
            ?disabled=${this.disabled}
            ?required=${this.required}
            aria-invalid=${this.invalid ? 'true' : 'false'}
            aria-describedby=${ifDefined(
              this.errorMessage ? `${this.selectId}-error` : this.hint ? `${this.selectId}-hint` : undefined,
            )}
            @change=${this.handleChange}
          >
            ${this.placeholder
              ? html`<option value="" disabled ?selected=${!this.value}>${this.placeholder}</option>`
              : nothing}
            ${this.options.map(
              (option) => html`
                <option value=${option.value} ?disabled=${option.disabled ?? false}>
                  ${option.label}
                </option>
              `,
            )}
          </select>
        </div>
        ${this.invalid && this.errorMessage
          ? html`<span class="error" id=${`${this.selectId}-error`}>${this.errorMessage}</span>`
          : this.hint
            ? html`<span class="hint" id=${`${this.selectId}-hint`}>${this.hint}</span>`
            : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-select': EdsSelect;
  }
}
