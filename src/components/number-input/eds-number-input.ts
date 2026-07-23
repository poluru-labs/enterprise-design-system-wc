import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { focusRing, hostBase, fieldStyles } from '../../foundations/shared.js';
import '../icon/eds-icon.js';

export type EdsNumberInputSize = 'sm' | 'md' | 'lg';

/**
 * Numeric input with stepper controls.
 *
 * @fires eds-input - Fired on each value change with the current number
 * @fires eds-change - Fired when the value is committed (blur or stepper)
 *
 * @element eds-number-input
 */
@customElement('eds-number-input')
export class EdsNumberInput extends LitElement {
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
        align-items: stretch;
        width: 100%;
        padding: 0;
        overflow: hidden;
      }

      .stepper {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 2.5rem;
        margin: 0;
        padding: 0;
        border: 0;
        background: transparent;
        color: var(--eds-color-text-muted);
        cursor: pointer;
        transition:
          background-color var(--eds-duration-fast) var(--eds-easing-standard),
          color var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .stepper:hover:not(:disabled) {
        background: var(--eds-color-ink-100);
        color: var(--eds-color-text);
      }

      .stepper:disabled {
        cursor: not-allowed;
        opacity: 0.45;
      }

      ${focusRing}

      .wrapper.sm .stepper {
        width: 2rem;
      }

      .wrapper.lg .stepper {
        width: 3rem;
      }

      .divider {
        width: 1px;
        align-self: stretch;
        background: var(--eds-color-border);
        flex-shrink: 0;
      }

      input.control {
        flex: 1;
        min-width: 0;
        width: 100%;
        border: 0;
        background: transparent;
        padding: 0 var(--eds-space-2);
        margin: 0;
        min-height: unset;
        color: inherit;
        font: inherit;
        text-align: center;
        font-variant-numeric: tabular-nums;
        -moz-appearance: textfield;
      }

      input.control::-webkit-outer-spin-button,
      input.control::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      input.control:focus,
      input.control:focus-visible {
        box-shadow: none;
        outline: none;
      }
    `,
  ];

  @property()
  label = '';

  @property({ type: Number })
  value = 0;

  @property({ type: Number })
  min = Number.NEGATIVE_INFINITY;

  @property({ type: Number })
  max = Number.POSITIVE_INFINITY;

  @property({ type: Number })
  step = 1;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  invalid = false;

  @property({ attribute: 'error-message' })
  errorMessage = '';

  @property()
  hint = '';

  @property({ reflect: true })
  size: EdsNumberInputSize = 'md';

  private inputId = `eds-number-input-${Math.random().toString(36).slice(2, 9)}`;

  private iconSize(): 'sm' | 'md' {
    return this.size === 'sm' ? 'sm' : 'md';
  }

  private clamp(value: number): number {
    return Math.min(this.max, Math.max(this.min, value));
  }

  private roundToStep(value: number): number {
    if (this.step <= 0) return value;
    const precision = (String(this.step).split('.')[1] ?? '').length;
    const rounded =
      Math.round((value - this.min) / this.step) * this.step + this.min;
    return Number(rounded.toFixed(precision));
  }

  private setValue(next: number, event: Event, emitInput = true) {
    const normalized = this.clamp(this.roundToStep(next));
    if (normalized === this.value) return;
    this.value = normalized;
    if (emitInput) this.emit('eds-input', event);
    this.emit('eds-change', event);
  }

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
    const parsed = target.value === '' ? 0 : Number(target.value);
    if (Number.isNaN(parsed)) return;
    this.value = this.clamp(parsed);
    this.emit('eds-input', event);
  }

  private handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const parsed = target.value === '' ? 0 : Number(target.value);
    if (!Number.isNaN(parsed)) {
      this.value = this.clamp(this.roundToStep(parsed));
    }
    this.emit('eds-change', event);
  }

  private decrement(event: Event) {
    this.setValue(this.value - this.step, event);
  }

  private increment(event: Event) {
    this.setValue(this.value + this.step, event);
  }

  override render() {
    const wrapperClasses = {
      control: true,
      wrapper: true,
      [this.size]: true,
    };

    const canDecrement = !this.disabled && this.value - this.step >= this.min;
    const canIncrement = !this.disabled && this.value + this.step <= this.max;

    return html`
      <div class="field">
        ${this.label
          ? html`<label class="label" for=${this.inputId}>${this.label}</label>`
          : nothing}
        <div
          class=${classMap(wrapperClasses)}
          data-invalid=${this.invalid ? 'true' : 'false'}
        >
          <button
            class="stepper"
            type="button"
            aria-label="Decrease value"
            ?disabled=${!canDecrement}
            @click=${this.decrement}
          >
            <eds-icon name="minus" size=${this.iconSize()}></eds-icon>
          </button>
          <span class="divider" aria-hidden="true"></span>
          <input
            class="control"
            id=${this.inputId}
            type="number"
            .value=${String(this.value)}
            min=${ifDefined(Number.isFinite(this.min) ? this.min : undefined)}
            max=${ifDefined(Number.isFinite(this.max) ? this.max : undefined)}
            step=${this.step}
            ?disabled=${this.disabled}
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
          <span class="divider" aria-hidden="true"></span>
          <button
            class="stepper"
            type="button"
            aria-label="Increase value"
            ?disabled=${!canIncrement}
            @click=${this.increment}
          >
            <eds-icon name="plus" size=${this.iconSize()}></eds-icon>
          </button>
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
    'eds-number-input': EdsNumberInput;
  }
}
