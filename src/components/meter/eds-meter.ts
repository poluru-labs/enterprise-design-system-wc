import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase } from '../../foundations/shared.js';

/**
 * Accessible meter for scalar measurements within a known range.
 *
 * @element eds-meter
 * @example
 * ```html
 * <eds-meter value="40" min="0" max="100" label="Storage"></eds-meter>
 * ```
 */
@customElement('eds-meter')
export class EdsMeter extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .meter {
        display: flex;
        flex-direction: column;
        gap: var(--eds-space-2);
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--eds-space-3);
      }

      .label {
        font-size: var(--eds-font-size-sm);
        font-weight: var(--eds-font-weight-medium);
        color: var(--eds-color-text);
      }

      .value {
        font-size: var(--eds-font-size-sm);
        font-variant-numeric: tabular-nums;
        color: var(--eds-color-text-muted);
      }

      meter {
        display: block;
        width: 100%;
        height: 0.625rem;
        appearance: none;
        border: none;
        border-radius: var(--eds-radius-full);
        background: var(--eds-color-ink-100);
      }

      meter::-webkit-meter-bar {
        border: none;
        border-radius: var(--eds-radius-full);
        background: var(--eds-color-ink-100);
      }

      meter::-webkit-meter-optimum-value {
        border-radius: var(--eds-radius-full);
        background: var(--eds-color-success-600);
      }

      meter::-webkit-meter-suboptimum-value {
        border-radius: var(--eds-radius-full);
        background: var(--eds-color-warning-600);
      }

      meter::-webkit-meter-even-less-good-value {
        border-radius: var(--eds-radius-full);
        background: var(--eds-color-danger-600);
      }

      meter::-moz-meter-bar {
        border: none;
        border-radius: var(--eds-radius-full);
        background: var(--eds-color-ink-100);
      }

      meter:-moz-meter-optimum::-moz-meter-bar {
        background: var(--eds-color-success-600);
      }

      meter:-moz-meter-sub-optimum::-moz-meter-bar {
        background: var(--eds-color-warning-600);
      }

      meter:-moz-meter-sub-sub-optimum::-moz-meter-bar {
        background: var(--eds-color-danger-600);
      }
    `,
  ];

  @property({ type: Number })
  value = 0;

  @property({ type: Number })
  min = 0;

  @property({ type: Number })
  max = 100;

  @property({ type: Number })
  low = 25;

  @property({ type: Number })
  high = 75;

  @property({ type: Number })
  optimum = 0;

  @property()
  label = '';

  @property({ type: Boolean, attribute: 'show-value', reflect: true })
  showValue = false;

  private get clampedValue(): number {
    return Math.min(Math.max(this.value, this.min), this.max);
  }

  override render() {
    const ariaLabel = this.label || 'Meter';
    const valueText = `${this.clampedValue} of ${this.max}`;

    return html`
      <div class="meter">
        ${this.label || this.showValue
          ? html`
              <div class="header">
                ${this.label ? html`<span class="label">${this.label}</span>` : html`<span></span>`}
                ${this.showValue ? html`<span class="value">${valueText}</span>` : nothing}
              </div>
            `
          : nothing}
        <meter
          min=${this.min}
          max=${this.max}
          low=${this.low}
          high=${this.high}
          optimum=${this.optimum}
          value=${this.clampedValue}
          aria-label=${ariaLabel}
        ></meter>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-meter': EdsMeter;
  }
}
