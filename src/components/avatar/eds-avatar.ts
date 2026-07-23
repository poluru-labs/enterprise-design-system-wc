import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { hostBase } from '../../foundations/shared.js';

export type EdsAvatarSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Circular avatar with image or initials fallback.
 *
 * @element eds-avatar
 * @example
 * ```html
 * <eds-avatar name="Alex Rivera" size="md"></eds-avatar>
 * ```
 */
@customElement('eds-avatar')
export class EdsAvatar extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      .avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-radius: var(--eds-radius-full);
        background: var(--eds-color-brand-100);
        color: var(--eds-color-brand-800);
        font-weight: var(--eds-font-weight-semibold);
        letter-spacing: 0.02em;
        user-select: none;
        flex-shrink: 0;
      }

      .sm {
        width: 2rem;
        height: 2rem;
        font-size: var(--eds-font-size-xs);
      }

      .md {
        width: 2.5rem;
        height: 2.5rem;
        font-size: var(--eds-font-size-sm);
      }

      .lg {
        width: 3rem;
        height: 3rem;
        font-size: var(--eds-font-size-md);
      }

      .xl {
        width: 4rem;
        height: 4rem;
        font-size: var(--eds-font-size-lg);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `,
  ];

  @property()
  name = '';

  @property()
  src = '';

  @property({ reflect: true })
  size: EdsAvatarSize = 'md';

  @property()
  alt = '';

  @state()
  private imageError = false;

  private get initials(): string {
    const parts = this.name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) {
      return '?';
    }
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }

  private get accessibleLabel(): string {
    if (this.alt) {
      return this.alt;
    }
    if (this.name) {
      return this.name;
    }
    return 'Avatar';
  }

  private handleImageError() {
    this.imageError = true;
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('src')) {
      this.imageError = false;
    }
  }

  override render() {
    const showImage = this.src && !this.imageError;

    return html`
      <span
        class=${classMap({ avatar: true, [this.size]: true })}
        role="img"
        aria-label=${this.accessibleLabel}
      >
        ${showImage
          ? html`
              <img
                src=${this.src}
                alt=""
                aria-hidden="true"
                @error=${this.handleImageError}
              />
            `
          : html`<span aria-hidden="true">${this.initials}</span>`}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-avatar': EdsAvatar;
  }
}
