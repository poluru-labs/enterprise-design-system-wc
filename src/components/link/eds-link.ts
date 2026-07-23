import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { focusRing, hostBase } from '../../foundations/shared.js';
import '../icon/eds-icon.js';

export type EdsLinkVariant = 'default' | 'subtle' | 'danger';

/**
 * Styled anchor link with optional external indicator.
 *
 * @slot - Link text content
 * @fires eds-click - Fired when the link is activated
 *
 * @element eds-link
 */
@customElement('eds-link')
export class EdsLink extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        vertical-align: baseline;
      }

      .link {
        display: inline-flex;
        align-items: center;
        gap: var(--eds-space-1);
        font: inherit;
        font-weight: var(--eds-font-weight-medium);
        line-height: var(--eds-line-height-normal);
        text-decoration: underline;
        text-underline-offset: 0.15em;
        cursor: pointer;
        transition:
          color var(--eds-duration-fast) var(--eds-easing-standard),
          opacity var(--eds-duration-fast) var(--eds-easing-standard);
      }

      ${focusRing}

      .default {
        color: var(--eds-color-primary);
      }

      .default:hover:not([aria-disabled='true']) {
        color: var(--eds-color-brand-700);
      }

      .subtle {
        color: var(--eds-color-text-muted);
        text-decoration-color: var(--eds-color-border-strong);
      }

      .subtle:hover:not([aria-disabled='true']) {
        color: var(--eds-color-text);
      }

      .danger {
        color: var(--eds-color-danger-600);
      }

      .danger:hover:not([aria-disabled='true']) {
        filter: brightness(0.85);
      }

      .link[aria-disabled='true'] {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
        text-decoration: none;
      }

      .external-icon {
        flex-shrink: 0;
      }
    `,
  ];

  @property()
  href = '';

  @property()
  target?: string;

  @property()
  rel?: string;

  @property({ type: Boolean, reflect: true })
  external = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ reflect: true })
  variant: EdsLinkVariant = 'default';

  private get resolvedRel(): string | undefined {
    if (this.rel) return this.rel;
    if (this.external || this.target === '_blank') return 'noopener noreferrer';
    return undefined;
  }

  private get resolvedTarget(): string | undefined {
    if (this.target) return this.target;
    if (this.external) return '_blank';
    return undefined;
  }

  private handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.dispatchEvent(
      new CustomEvent('eds-click', {
        detail: { originalEvent: event },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    const classes = {
      link: true,
      [this.variant]: true,
    };

    return html`
      <a
        class=${classMap(classes)}
        href=${this.disabled ? nothing : this.href || '#'}
        target=${ifDefined(this.resolvedTarget)}
        rel=${ifDefined(this.resolvedRel)}
        aria-disabled=${this.disabled ? 'true' : nothing}
        tabindex=${this.disabled ? '-1' : nothing}
        @click=${this.handleClick}
      >
        <span class="text"><slot></slot></span>
        ${this.external
          ? html`<eds-icon class="external-icon" name="external-link" size="sm" decorative></eds-icon>`
          : nothing}
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-link': EdsLink;
  }
}
