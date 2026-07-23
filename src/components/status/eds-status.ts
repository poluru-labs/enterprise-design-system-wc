import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { hostBase } from '../../foundations/shared.js';

export type EdsStatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

/**
 * Compact status indicator with a colored dot and label.
 *
 * @element eds-status
 * @example
 * ```html
 * <eds-status variant="success" label="Healthy"></eds-status>
 * ```
 */
@customElement('eds-status')
export class EdsStatus extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      .status {
        display: inline-flex;
        align-items: center;
        gap: var(--eds-space-2);
        font-size: var(--eds-font-size-sm);
        font-weight: var(--eds-font-weight-medium);
        line-height: var(--eds-line-height-snug);
        color: var(--eds-color-text);
      }

      .dot {
        position: relative;
        display: inline-flex;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .dot.success {
        background: var(--eds-color-success-600);
      }

      .dot.warning {
        background: var(--eds-color-warning-600);
      }

      .dot.danger {
        background: var(--eds-color-danger-600);
      }

      .dot.info {
        background: var(--eds-color-info-600);
      }

      .dot.neutral {
        background: var(--eds-color-ink-400);
      }

      .dot[data-pulse='true']::after {
        content: '';
        position: absolute;
        inset: -0.125rem;
        border-radius: inherit;
        background: inherit;
        opacity: 0.45;
        animation: eds-status-pulse 1.5s ease-out infinite;
      }

      @keyframes eds-status-pulse {
        0% {
          transform: scale(0.85);
          opacity: 0.55;
        }

        70% {
          transform: scale(1.75);
          opacity: 0;
        }

        100% {
          transform: scale(1.75);
          opacity: 0;
        }
      }
    `,
  ];

  @property()
  label = '';

  @property({ reflect: true })
  variant: EdsStatusVariant = 'neutral';

  @property({ type: Boolean, reflect: true })
  pulse = false;

  override render() {
    const dotClasses = {
      dot: true,
      [this.variant]: true,
    };

    return html`
      <span class="status" role="status">
        <span class=${classMap(dotClasses)} data-pulse=${this.pulse ? 'true' : 'false'} aria-hidden="true"></span>
        <span class="label">${this.label}</span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-status': EdsStatus;
  }
}
