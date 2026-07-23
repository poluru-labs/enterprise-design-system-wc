import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase, fieldStyles } from '../../foundations/shared.js';

/**
 * Styled range input for numeric values.
 *
 * @fires eds-input - Fired while dragging with the current value
 * @fires eds-change - Fired when the value is committed on release
 *
 * @element eds-slider
 */
@customElement('eds-slider')
export class EdsSlider extends LitElement {
  static override styles = [
    hostBase,
    fieldStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--eds-space-3);
      }

      .value {
        font-size: var(--eds-font-size-sm);
        font-weight: var(--eds-font-weight-semibold);
        color: var(--eds-color-primary);
        font-variant-numeric: tabular-nums;
      }

      input[type='range'] {
        width: 100%;
        margin: var(--eds-space-2) 0 0;
        accent-color: var(--eds-color-primary);
        cursor: pointer;
      }

      input[type='range']:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }

      input[type='range']:focus-visible {
        outline: none;
      }

      input[type='range']:focus-visible::-webkit-slider-thumb {
        box-shadow: var(--eds-shadow-focus);
      }
    `,
  ];

  @property()
  label = '';

  @property({ type: Number })
  min = 0;

  @property({ type: Number })
  max = 100;

  @property({ type: Number })
  step = 1;

  @property({ type: Number })
  value = 50;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, attribute: 'show-value', reflect: true })
  showValue = false;

  private sliderId = `eds-slider-${Math.random().toString(36).slice(2, 9)}`;

  private emit(name: 'eds-input' | 'eds-change', originalEvent: Event) {
    this.dispatchEvent(
      new CustomEvent(name, {
        detail: { value: this.value, originalEvent },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = Number(target.value);
    this.emit('eds-input', event);
  }

  private handleChange(event: Event) {
    this.emit('eds-change', event);
  }

  override render() {
    return html`
      <div class="field">
        <div class="header">
          ${this.label
            ? html`<label class="label" for=${this.sliderId}>${this.label}</label>`
            : html`<span></span>`}
          ${this.showValue ? html`<span class="value">${this.value}</span>` : nothing}
        </div>
        <input
          id=${this.sliderId}
          type="range"
          min=${this.min}
          max=${this.max}
          step=${this.step}
          .value=${String(this.value)}
          ?disabled=${this.disabled}
          aria-valuemin=${this.min}
          aria-valuemax=${this.max}
          aria-valuenow=${this.value}
          @input=${this.handleInput}
          @change=${this.handleChange}
        />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-slider': EdsSlider;
  }
}
