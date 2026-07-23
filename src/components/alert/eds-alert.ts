import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { focusRing, hostBase } from '../../foundations/shared.js';
import type { EdsIconName } from '../../icons/paths.js';
import '../icon/eds-icon.js';

export type EdsAlertVariant = 'success' | 'info' | 'warning' | 'danger';

/**
 * Inline alert for status messages and contextual feedback.
 *
 * @slot - Alert body content when `message` is not set
 * @fires eds-dismiss - Fired when the alert is dismissed
 *
 * @element eds-alert
 */
@customElement('eds-alert')
export class EdsAlert extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .alert {
        display: flex;
        align-items: flex-start;
        gap: var(--eds-space-3);
        padding: var(--eds-space-3) var(--eds-space-4);
        border: 1px solid transparent;
        border-radius: var(--eds-radius-md);
        font-size: var(--eds-font-size-sm);
        line-height: var(--eds-line-height-normal);
      }

      .icon {
        display: inline-flex;
        flex-shrink: 0;
        margin-top: 0.0625rem;
        line-height: 0;
      }

      .content {
        flex: 1;
        min-width: 0;
      }

      .title {
        margin: 0 0 var(--eds-space-1);
        font-weight: var(--eds-font-weight-semibold);
        font-size: var(--eds-font-size-sm);
        line-height: var(--eds-line-height-snug);
      }

      .message {
        margin: 0;
        color: inherit;
      }

      .close {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 1.75rem;
        height: 1.75rem;
        margin: -0.25rem -0.25rem -0.25rem 0;
        padding: 0;
        border: none;
        border-radius: var(--eds-radius-sm);
        background: transparent;
        color: inherit;
        cursor: pointer;
        opacity: 0.75;
        transition: opacity var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .close:hover {
        opacity: 1;
      }

      ${focusRing}

      .success {
        background: var(--eds-color-success-100);
        border-color: rgb(31 122 77 / 0.2);
        color: var(--eds-color-success-600);
      }

      .info {
        background: var(--eds-color-info-100);
        border-color: rgb(23 92 211 / 0.2);
        color: var(--eds-color-info-600);
      }

      .warning {
        background: var(--eds-color-warning-100);
        border-color: rgb(154 103 0 / 0.2);
        color: var(--eds-color-warning-600);
      }

      .danger {
        background: var(--eds-color-danger-100);
        border-color: rgb(180 35 24 / 0.2);
        color: var(--eds-color-danger-600);
      }
    `,
  ];

  @property({ reflect: true })
  variant: EdsAlertVariant = 'info';

  @property()
  title = '';

  @property()
  message = '';

  @property({ type: Boolean, reflect: true })
  dismissible = false;

  /** Override the default variant icon. Empty string keeps the variant default. */
  @property()
  icon: EdsIconName | '' = '';

  /** Hide the status icon entirely. */
  @property({ type: Boolean, attribute: 'hide-icon', reflect: true })
  hideIcon = false;

  @state()
  private dismissed = false;

  private handleDismiss() {
    this.dismissed = true;
    this.hidden = true;
    this.dispatchEvent(
      new CustomEvent('eds-dismiss', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private defaultIcon(): EdsIconName {
    switch (this.variant) {
      case 'success':
        return 'check-circle';
      case 'warning':
        return 'warning';
      case 'danger':
        return 'x-circle';
      case 'info':
      default:
        return 'info';
    }
  }

  private renderIcon() {
    if (this.hideIcon) return nothing;
    const name = this.icon || this.defaultIcon();
    return html`<span class="icon"><eds-icon name=${name} size="md"></eds-icon></span>`;
  }

  override render() {
    if (this.dismissed) {
      return nothing;
    }

    return html`
      <div
        class=${classMap({ alert: true, [this.variant]: true })}
        role="alert"
        aria-live="polite"
      >
        ${this.renderIcon()}
        <div class="content">
          ${this.title ? html`<p class="title">${this.title}</p>` : nothing}
          ${this.message
            ? html`<p class="message">${this.message}</p>`
            : html`<div class="message"><slot></slot></div>`}
        </div>
        ${this.dismissible
          ? html`
              <button
                class="close"
                type="button"
                aria-label="Dismiss alert"
                @click=${this.handleDismiss}
              >
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
                  <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
              </button>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-alert': EdsAlert;
  }
}
