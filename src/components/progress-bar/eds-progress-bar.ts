import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { hostBase } from '../../foundations/shared.js';

/**
 * Progress indicator for determinate and indeterminate loading states.
 *
 * @element eds-progress-bar
 * @example
 * ```html
 * <eds-progress-bar value="65" label="Uploading"></eds-progress-bar>
 * ```
 */
@customElement('eds-progress-bar')
export class EdsProgressBar extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .progress {
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

      .track {
        position: relative;
        width: 100%;
        height: 0.5rem;
        overflow: hidden;
        border-radius: var(--eds-radius-full);
        background: var(--eds-color-ink-100);
      }

      .fill {
        height: 100%;
        border-radius: inherit;
        background: var(--eds-color-primary);
        transition: width var(--eds-duration-normal) var(--eds-easing-standard);
      }

      .indeterminate .fill {
        position: absolute;
        inset: 0 auto 0 0;
        width: 40%;
        animation: indeterminate var(--eds-duration-slow) var(--eds-easing-standard) infinite;
      }

      @keyframes indeterminate {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(350%);
        }
      }
    `,
  ];

  @property({ type: Number })
  value = 0;

  @property({ type: Number })
  max = 100;

  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  @property()
  label = '';

  @property({ type: Boolean, attribute: 'show-value', reflect: true })
  showValue = false;

  private get clampedValue(): number {
    const max = this.max > 0 ? this.max : 100;
    return Math.min(Math.max(this.value, 0), max);
  }

  private get percentage(): number {
    const max = this.max > 0 ? this.max : 100;
    return Math.round((this.clampedValue / max) * 100);
  }

  override render() {
    const ariaValueText = this.indeterminate ? 'Loading' : `${this.percentage}%`;

    return html`
      <div class="progress">
        ${this.label || this.showValue
          ? html`
              <div class="header">
                ${this.label ? html`<span class="label">${this.label}</span>` : html`<span></span>`}
                ${this.showValue && !this.indeterminate
                  ? html`<span class="value">${this.percentage}%</span>`
                  : nothing}
              </div>
            `
          : nothing}
        <div
          class=${this.indeterminate ? 'track indeterminate' : 'track'}
          role="progressbar"
          aria-label=${this.label || 'Progress'}
          aria-valuemin="0"
          aria-valuemax=${ifDefined(this.indeterminate ? undefined : String(this.max))}
          aria-valuenow=${ifDefined(this.indeterminate ? undefined : String(this.clampedValue))}
          aria-valuetext=${ariaValueText}
        >
          <div
            class="fill"
            style=${this.indeterminate ? nothing : `width: ${this.percentage}%`}
          ></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-progress-bar': EdsProgressBar;
  }
}
