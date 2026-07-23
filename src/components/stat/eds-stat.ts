import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { hostBase } from '../../foundations/shared.js';
import '../icon/eds-icon.js';

export type EdsStatTrend = 'up' | 'down' | 'flat' | '';

/**
 * Compact KPI / metric display block.
 *
 * @element eds-stat
 * @example
 * ```html
 * <eds-stat label="Revenue" value="$128k" hint="+12% MoM"></eds-stat>
 * ```
 */
@customElement('eds-stat')
export class EdsStat extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: block;
      }

      .stat {
        display: flex;
        flex-direction: column;
        gap: var(--eds-space-1);
      }

      .label {
        font-size: var(--eds-font-size-sm);
        font-weight: var(--eds-font-weight-medium);
        color: var(--eds-color-text-muted);
        line-height: var(--eds-line-height-snug);
      }

      .value-row {
        display: flex;
        align-items: baseline;
        flex-wrap: wrap;
        gap: var(--eds-space-2);
      }

      .value {
        font-size: var(--eds-font-size-2xl);
        font-weight: var(--eds-font-weight-semibold);
        font-variant-numeric: tabular-nums;
        line-height: var(--eds-line-height-tight);
        color: var(--eds-color-text);
      }

      .trend {
        display: inline-flex;
        align-items: center;
        gap: var(--eds-space-1);
        font-size: var(--eds-font-size-sm);
        font-weight: var(--eds-font-weight-medium);
        font-variant-numeric: tabular-nums;
        line-height: 1;
      }

      .trend.up {
        color: var(--eds-color-success-600);
      }

      .trend.down {
        color: var(--eds-color-danger-600);
      }

      .trend.flat {
        color: var(--eds-color-text-muted);
      }

      .hint {
        font-size: var(--eds-font-size-xs);
        line-height: var(--eds-line-height-normal);
        color: var(--eds-color-text-subtle);
      }
    `,
  ];

  @property()
  value: string | number = '';

  @property()
  label = '';

  @property()
  hint = '';

  @property({ reflect: true })
  trend: EdsStatTrend = '';

  @property({ attribute: 'trend-value' })
  trendValue = '';

  private trendIcon(): 'chevron-up' | 'chevron-down' | 'minus' | '' {
    if (this.trend === 'up') return 'chevron-up';
    if (this.trend === 'down') return 'chevron-down';
    if (this.trend === 'flat') return 'minus';
    return '';
  }

  override render() {
    const icon = this.trendIcon();

    return html`
      <div class="stat">
        ${this.label ? html`<div class="label">${this.label}</div>` : nothing}
        <div class="value-row">
          <div class="value">${this.value}</div>
          ${this.trend
            ? html`
                <div class=${classMap({ trend: true, [this.trend]: true })}>
                  ${icon ? html`<eds-icon name=${icon} size="sm"></eds-icon>` : nothing}
                  ${this.trendValue ? html`<span>${this.trendValue}</span>` : nothing}
                </div>
              `
            : nothing}
        </div>
        ${this.hint ? html`<div class="hint">${this.hint}</div>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-stat': EdsStat;
  }
}
