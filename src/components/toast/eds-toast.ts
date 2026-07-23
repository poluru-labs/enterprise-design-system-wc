import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { hostBase } from '../../foundations/shared.js';
import type { EdsIconName } from '../../icons/paths.js';
import '../icon/eds-icon.js';

export type EdsToastVariant = 'success' | 'info' | 'warning' | 'danger';

export interface EdsToastOptions {
  message: string;
  variant?: EdsToastVariant;
  duration?: number;
  icon?: EdsIconName | '';
}

/**
 * Individual toast notification.
 *
 * @fires eds-close - Fired when the toast closes (manual or auto-dismiss)
 *
 * @element eds-toast
 */
@customElement('eds-toast')
export class EdsToast extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: block;
        width: min(100%, 22rem);
        pointer-events: auto;
      }

      .toast {
        display: flex;
        align-items: flex-start;
        gap: var(--eds-space-3);
        padding: var(--eds-space-4);
        border: 1px solid var(--eds-color-border);
        border-radius: var(--eds-radius-lg);
        background: var(--eds-color-surface);
        box-shadow: var(--eds-shadow-md);
        color: var(--eds-color-text);
        font-size: var(--eds-font-size-sm);
        line-height: var(--eds-line-height-relaxed);
        opacity: 0;
        transform: translateY(8px);
        transition:
          opacity var(--eds-duration-normal) var(--eds-easing-emphasized),
          transform var(--eds-duration-normal) var(--eds-easing-emphasized);
      }

      .toast[data-open='true'] {
        opacity: 1;
        transform: translateY(0);
      }

      .toast.success {
        border-color: var(--eds-color-success-600);
        background: linear-gradient(180deg, var(--eds-color-success-100), var(--eds-color-surface));
      }

      .toast.info {
        border-color: var(--eds-color-info-600);
        background: linear-gradient(180deg, var(--eds-color-info-100), var(--eds-color-surface));
      }

      .toast.warning {
        border-color: var(--eds-color-warning-600);
        background: linear-gradient(180deg, var(--eds-color-warning-100), var(--eds-color-surface));
      }

      .toast.danger {
        border-color: var(--eds-color-danger-600);
        background: linear-gradient(180deg, var(--eds-color-danger-100), var(--eds-color-surface));
      }

      .icon {
        display: inline-flex;
        flex-shrink: 0;
        margin-top: 1px;
        line-height: 0;
      }

      .toast.success .icon {
        color: var(--eds-color-success-600);
      }

      .toast.info .icon {
        color: var(--eds-color-info-600);
      }

      .toast.warning .icon {
        color: var(--eds-color-warning-600);
      }

      .toast.danger .icon {
        color: var(--eds-color-danger-600);
      }

      .message {
        flex: 1;
        margin: 0;
      }

      .close {
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
        margin: 0;
        padding: 0;
        border: 0;
        border-radius: var(--eds-radius-sm);
        background: transparent;
        color: var(--eds-color-text-muted);
        cursor: pointer;
      }

      .close:hover {
        background: var(--eds-color-ink-100);
        color: var(--eds-color-text);
      }

      .close:focus-visible {
        outline: none;
        box-shadow: var(--eds-shadow-focus);
      }
    `,
  ];

  @property()
  message = '';

  @property({ reflect: true })
  variant: EdsToastVariant = 'info';

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Number })
  duration = 5000;

  /** Override the default variant icon. */
  @property()
  icon: EdsIconName | '' = '';

  /** Hide the status icon. */
  @property({ type: Boolean, attribute: 'hide-icon', reflect: true })
  hideIcon = false;

  private dismissTimer: ReturnType<typeof setTimeout> | null = null;

  override updated(changed: Map<string, unknown>) {
    if (changed.has('open')) {
      if (this.open) {
        this.startDismissTimer();
      } else if (changed.get('open') === true) {
        this.clearDismissTimer();
        this.dispatchEvent(new CustomEvent('eds-close', { bubbles: true, composed: true }));
      }
    }

    if (changed.has('duration') && this.open) {
      this.startDismissTimer();
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.clearDismissTimer();
  }

  private startDismissTimer() {
    this.clearDismissTimer();
    if (this.duration <= 0) return;
    this.dismissTimer = setTimeout(() => this.close(), this.duration);
  }

  private clearDismissTimer() {
    if (this.dismissTimer) clearTimeout(this.dismissTimer);
    this.dismissTimer = null;
  }

  /** Shows the toast. */
  show() {
    this.open = true;
  }

  /** Closes the toast. */
  close() {
    this.open = false;
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
    return html`
      <div
        class=${classMap({ toast: true, [this.variant]: true })}
        role="status"
        aria-live="polite"
        data-open=${this.open ? 'true' : 'false'}
        ?hidden=${!this.open}
      >
        ${this.renderIcon()}
        <p class="message">${this.message}</p>
        <button class="close" type="button" aria-label="Dismiss notification" @click=${this.close}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    `;
  }
}

/**
 * Fixed-position host that stacks toast notifications.
 *
 * @slot - Optional declarative `eds-toast` children
 *
 * @element eds-toast-host
 */
@customElement('eds-toast-host')
export class EdsToastHost extends LitElement {
  static override styles = css`
    :host {
      position: fixed;
      z-index: 1200;
      inset: auto var(--eds-space-6) var(--eds-space-6) auto;
      display: flex;
      flex-direction: column;
      gap: var(--eds-space-3);
      pointer-events: none;
      max-width: calc(100vw - var(--eds-space-12));
    }
  `;

  /** Creates and shows a toast inside this host. */
  show(options: EdsToastOptions): EdsToast {
    const toast = document.createElement('eds-toast') as EdsToast;
    toast.message = options.message;
    toast.variant = options.variant ?? 'info';
    toast.duration = options.duration ?? 5000;
    if (options.icon) toast.icon = options.icon;
    toast.addEventListener('eds-close', () => {
      queueMicrotask(() => toast.remove());
    });
    this.appendChild(toast);
    queueMicrotask(() => toast.show());
    return toast;
  }

  override render() {
    return html`<slot></slot>`;
  }
}

const TOAST_HOST_ID = 'eds-toast-host-root';

/**
 * Ensures a global {@link EdsToastHost} exists on `document.body`.
 * Safe to call multiple times — returns the existing host when present.
 *
 * @returns The toast host element
 */
export function ensureToastHost(): EdsToastHost {
  let host = document.getElementById(TOAST_HOST_ID) as EdsToastHost | null;
  if (!host) {
    host = document.createElement('eds-toast-host') as EdsToastHost;
    host.id = TOAST_HOST_ID;
    document.body.appendChild(host);
  }
  return host;
}

/**
 * Imperatively show a toast notification (creates the host if needed).
 *
 * @param options - Toast title, optional description, variant, and duration
 * @returns The created {@link EdsToast} element
 *
 * @example
 * ```ts
 * import { showToast } from '@poluru-labs/enterprise-design-system-wc';
 * showToast({ title: 'Saved', variant: 'success' });
 * ```
 */
export function showToast(options: EdsToastOptions): EdsToast {
  return ensureToastHost().show(options);
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-toast': EdsToast;
    'eds-toast-host': EdsToastHost;
  }
}
