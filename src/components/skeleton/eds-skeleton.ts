import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { hostBase } from '../../foundations/shared.js';

export type EdsSkeletonVariant = 'text' | 'circular' | 'rectangular';

/**
 * Placeholder shimmer for loading content.
 *
 * @element eds-skeleton
 * @example
 * ```html
 * <eds-skeleton style="width:12rem;height:1rem"></eds-skeleton>
 * ```
 */
@customElement('eds-skeleton')
export class EdsSkeleton extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: block;
      }

      .skeleton {
        position: relative;
        overflow: hidden;
        background: var(--eds-color-ink-100);
      }

      .skeleton::after {
        content: '';
        position: absolute;
        inset: 0;
        transform: translateX(-100%);
        background: linear-gradient(
          90deg,
          transparent,
          var(--eds-color-ink-50),
          transparent
        );
        animation: shimmer var(--eds-duration-slow) var(--eds-easing-standard) infinite;
      }

      .text {
        height: 0.875rem;
        border-radius: var(--eds-radius-sm);
      }

      .text + .text {
        margin-top: var(--eds-space-2);
      }

      .circular {
        border-radius: var(--eds-radius-full);
      }

      .rectangular {
        border-radius: var(--eds-radius-md);
      }

      @keyframes shimmer {
        100% {
          transform: translateX(100%);
        }
      }
    `,
  ];

  @property({ reflect: true })
  variant: EdsSkeletonVariant = 'text';

  @property()
  width = '';

  @property()
  height = '';

  @property({ type: Number })
  lines = 1;

  private get dimensionStyle() {
    const style: Record<string, string> = {};

    if (this.width) {
      style.width = this.width;
    }

    if (this.height) {
      style.height = this.height;
    }

    if (this.variant === 'text' && !this.width) {
      style.width = '100%';
    }

    if (this.variant === 'circular' && !this.width && !this.height) {
      style.width = '2.5rem';
      style.height = '2.5rem';
    }

    if (this.variant === 'rectangular' && !this.width) {
      style.width = '100%';
    }

    if (this.variant === 'rectangular' && !this.height) {
      style.height = '8rem';
    }

    return style;
  }

  override render() {
    if (this.variant === 'text' && this.lines > 1) {
      return html`
        ${Array.from({ length: this.lines }, (_, index) => {
          const lineStyle =
            index === this.lines - 1 ? { ...this.dimensionStyle, width: '75%' } : this.dimensionStyle;
          return html`
            <div
              class=${classMap({ skeleton: true, text: true })}
              style=${styleMap(lineStyle)}
              aria-hidden="true"
            ></div>
          `;
        })}
      `;
    }

    return html`
      <div
        class=${classMap({ skeleton: true, [this.variant]: true })}
        style=${styleMap(this.dimensionStyle)}
        aria-hidden="true"
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-skeleton': EdsSkeleton;
  }
}
