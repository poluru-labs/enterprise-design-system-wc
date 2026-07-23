import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { hostBase, fieldStyles } from '../../foundations/shared.js';

/**
 * Time picker using a styled native `input[type="time"]` (24-hour HH:MM).
 *
 * @fires eds-change - Fired when the selected time changes. Detail: `{ value: string }`.
 *
 * @element eds-time-picker
 */
@customElement('eds-time-picker')
export class EdsTimePicker extends LitElement {
  static override styles = [
    hostBase,
    fieldStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .wrapper {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 0 var(--eds-space-3);
      }

      input.control {
        flex: 1;
        min-width: 0;
        width: 100%;
        border: 0;
        background: transparent;
        padding: 0;
        margin: 0;
        min-height: unset;
        color: inherit;
        font: inherit;
        font-variant-numeric: tabular-nums;
      }

      input.control:focus,
      input.control:focus-visible {
        box-shadow: none;
        outline: none;
      }

      input.control::-webkit-calendar-picker-indicator {
        cursor: pointer;
        opacity: 0.65;
        filter: none;
      }

      input.control:hover:not(:disabled)::-webkit-calendar-picker-indicator {
        opacity: 1;
      }

      input.control:disabled::-webkit-calendar-picker-indicator {
        cursor: not-allowed;
        opacity: 0.35;
      }
    `,
  ];

  @property()
  label = '';

  /** Time value in 24-hour HH:MM format. */
  @property()
  value = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  invalid = false;

  @property({ attribute: 'error-message' })
  errorMessage = '';

  @property()
  hint = '';

  private inputId = `eds-time-picker-${Math.random().toString(36).slice(2, 9)}`;

  private handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
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
          <input
            class="control"
            id=${this.inputId}
            type="time"
            .value=${this.value}
            ?disabled=${this.disabled}
            aria-invalid=${this.invalid ? 'true' : 'false'}
            aria-describedby=${ifDefined(
              this.errorMessage
                ? `${this.inputId}-error`
                : this.hint
                  ? `${this.inputId}-hint`
                  : undefined,
            )}
            @change=${this.handleChange}
          />
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
    'eds-time-picker': EdsTimePicker;
  }
}
