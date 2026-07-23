import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { hostBase } from '../../foundations/shared.js';

/**
 * Circular progress indicator with determinate and indeterminate modes.
 *
 * @element eds-circular-progress
 * @example
 * ```html
 * <eds-circular-progress value="72"></eds-circular-progress>
 * ```
 */
@customElement('eds-circular-progress')
export class EdsCircularProgress extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      .progress {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      svg {
        display: block;
        transform: rotate(-90deg);
      }

      .track {
        fill: none;
        stroke: var(--eds-color-ink-100);
      }

      .indicator {
        fill: none;
        stroke: var(--eds-color-primary);
        stroke-linecap: round;
        transition: stroke-dashoffset var(--eds-duration-normal) var(--eds-easing-standard);
      }

      .indeterminate svg {
        animation: spin var(--eds-duration-slow) linear infinite;
      }

      .indeterminate .indicator {
        stroke-dasharray: 1 3;
        animation: dash var(--eds-duration-slow) var(--eds-easing-standard) infinite;
      }

      .value {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--eds-font-size-xs);
        font-weight: var(--eds-font-weight-semibold);
        font-variant-numeric: tabular-nums;
        color: var(--eds-color-text);
        line-height: 1;
      }

      @keyframes spin {
        to {
          transform: rotate(270deg);
        }
      }

      @keyframes dash {
        0% {
          stroke-dasharray: 1 3;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 2.5 1.5;
          stroke-dashoffset: -1;
        }
        100% {
          stroke-dasharray: 1 3;
          stroke-dashoffset: -3;
        }
      }
    `,
  ];

  @property({ type: Number })
  value = 0;

  @property({ type: Number })
  max = 100;

  @property({ type: Number })
  size = 48;

  @property({ type: Number, attribute: 'stroke-width' })
  strokeWidth = 4;

  @property({ type: Boolean, attribute: 'show-value', reflect: true })
  showValue = false;

  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  private get clampedValue(): number {
    const max = this.max > 0 ? this.max : 100;
    return Math.min(Math.max(this.value, 0), max);
  }

  private get percentage(): number {
    const max = this.max > 0 ? this.max : 100;
    return Math.round((this.clampedValue / max) * 100);
  }

  private get radius(): number {
    return (this.size - this.strokeWidth) / 2;
  }

  private get circumference(): number {
    return 2 * Math.PI * this.radius;
  }

  private get strokeDashoffset(): number {
    return this.circumference * (1 - this.percentage / 100);
  }

  override render() {
    const center = this.size / 2;
    const ariaValueText = this.indeterminate ? 'Loading' : `${this.percentage}%`;

    return html`
      <div
        class=${classMap({ progress: true, indeterminate: this.indeterminate })}
        role="progressbar"
        aria-label="Progress"
        aria-valuemin="0"
        aria-valuemax=${ifDefined(this.indeterminate ? undefined : String(this.max))}
        aria-valuenow=${ifDefined(this.indeterminate ? undefined : String(this.clampedValue))}
        aria-valuetext=${ariaValueText}
        style=${styleMap({ width: `${this.size}px`, height: `${this.size}px` })}
      >
        <svg
          width=${this.size}
          height=${this.size}
          viewBox=${`0 0 ${this.size} ${this.size}`}
          aria-hidden="true"
        >
          <circle
            class="track"
            cx=${center}
            cy=${center}
            r=${this.radius}
            stroke-width=${this.strokeWidth}
          ></circle>
          <circle
            class="indicator"
            cx=${center}
            cy=${center}
            r=${this.radius}
            stroke-width=${this.strokeWidth}
            stroke-dasharray=${this.circumference}
            stroke-dashoffset=${this.indeterminate ? this.circumference * 0.75 : this.strokeDashoffset}
          ></circle>
        </svg>
        ${this.showValue && !this.indeterminate
          ? html`<span class="value">${this.percentage}%</span>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-circular-progress': EdsCircularProgress;
  }
}
