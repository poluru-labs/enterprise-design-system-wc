import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { focusRing, hostBase } from '../../foundations/shared.js';
import '../icon/eds-icon.js';

export type EdsRatingSize = 'sm' | 'md' | 'lg';

/**
 * Star rating control with optional half-star selection.
 *
 * @fires eds-change - Fired when the rating value changes
 *
 * @element eds-rating
 */
@customElement('eds-rating')
export class EdsRating extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: inline-flex;
      }

      .rating {
        display: inline-flex;
        align-items: center;
        gap: var(--eds-space-1);
        margin: 0;
        padding: 0;
        border: none;
        background: transparent;
        list-style: none;
      }

      .star {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 0;
        border: none;
        background: transparent;
        color: var(--eds-color-ink-300);
        cursor: pointer;
        line-height: 0;
        transition: color var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .star:hover:not(:disabled) {
        color: var(--eds-color-warning-600);
      }

      .star[data-filled='true'],
      .star[data-half='true'] {
        color: var(--eds-color-warning-600);
      }

      .star:disabled {
        cursor: default;
        opacity: 0.55;
      }

      .star.readonly {
        cursor: default;
      }

      .star.readonly:hover {
        color: inherit;
      }

      .star.readonly[data-filled='true'],
      .star.readonly[data-half='true'] {
        color: var(--eds-color-warning-600);
      }

      ${focusRing}

      .half-overlay {
        position: absolute;
        inset: 0;
        overflow: hidden;
        width: 50%;
        color: var(--eds-color-warning-600);
        pointer-events: none;
      }
    `,
  ];

  @property({ type: Number })
  value = 0;

  @property({ type: Number })
  max = 5;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ reflect: true })
  size: EdsRatingSize = 'md';

  @property({ type: Boolean, attribute: 'allow-half', reflect: true })
  allowHalf = false;

  private emitChange() {
    this.dispatchEvent(
      new CustomEvent('eds-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private starState(index: number): 'empty' | 'half' | 'full' {
    const starValue = index + 1;
    if (this.value >= starValue) return 'full';
    if (this.allowHalf && this.value >= starValue - 0.5) return 'half';
    return 'empty';
  }

  private handleStarClick(index: number, event: MouseEvent) {
    if (this.readonly || this.disabled) return;

    let next = index + 1;
    if (this.allowHalf) {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const isLeftHalf = event.clientX - rect.left < rect.width / 2;
      next = isLeftHalf ? index + 0.5 : index + 1;
    }

    if (this.value === next) {
      next = this.allowHalf ? Math.max(0, next - 0.5) : 0;
    }

    this.value = next;
    this.emitChange();
  }

  private iconSize(): 'sm' | 'md' | 'lg' {
    return this.size;
  }

  override render() {
    const stars = Array.from({ length: this.max }, (_, index) => {
      const state = this.starState(index);
      const classes = {
        star: true,
        readonly: this.readonly,
        [this.size]: true,
      };

      return html`
        <li>
          <button
            type="button"
            class=${classMap(classes)}
            data-filled=${state === 'full' ? 'true' : 'false'}
            data-half=${state === 'half' ? 'true' : 'false'}
            ?disabled=${this.disabled}
            aria-label=${`Rate ${index + 1} of ${this.max}`}
            @click=${(event: MouseEvent) => this.handleStarClick(index, event)}
          >
            <eds-icon name="star" size=${this.iconSize()} aria-hidden="true"></eds-icon>
            ${state === 'half'
              ? html`
                  <span class="half-overlay" aria-hidden="true">
                    <eds-icon name="star" size=${this.iconSize()}></eds-icon>
                  </span>
                `
              : nothing}
          </button>
        </li>
      `;
    });

    return html`
      <ul
        class="rating"
        role="group"
        aria-label="Rating"
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.value}
        aria-readonly=${this.readonly ? 'true' : 'false'}
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        ${stars}
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-rating': EdsRating;
  }
}
