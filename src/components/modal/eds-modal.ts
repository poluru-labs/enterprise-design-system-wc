import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { hostBase } from '../../foundations/shared.js';

/**
 * Accessible modal dialog with focus trap and escape-to-close.
 *
 * @slot - Modal body content
 * @slot footer - Optional footer actions
 * @fires eds-modal-open - Fired when the modal opens
 * @fires eds-modal-close - Fired when the modal closes
 *
 * @element eds-modal
 */
@customElement('eds-modal')
export class EdsModal extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: contents;
      }

      .backdrop {
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: grid;
        place-items: center;
        padding: var(--eds-space-6);
        background:
          linear-gradient(180deg, rgb(15 23 32 / 0.45), rgb(15 23 32 / 0.55));
        backdrop-filter: blur(2px);
        opacity: 0;
        pointer-events: none;
        transition: opacity var(--eds-duration-normal) var(--eds-easing-standard);
      }

      .backdrop[data-open='true'] {
        opacity: 1;
        pointer-events: auto;
      }

      .dialog {
        width: min(100%, 28rem);
        max-height: min(90vh, 40rem);
        display: flex;
        flex-direction: column;
        background: var(--eds-color-surface);
        border: 1px solid var(--eds-color-border);
        border-radius: var(--eds-radius-xl);
        box-shadow: var(--eds-shadow-lg);
        transform: translateY(8px) scale(0.98);
        opacity: 0;
        transition:
          transform var(--eds-duration-normal) var(--eds-easing-emphasized),
          opacity var(--eds-duration-normal) var(--eds-easing-emphasized);
      }

      .backdrop[data-open='true'] .dialog {
        transform: translateY(0) scale(1);
        opacity: 1;
      }

      .header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: var(--eds-space-4);
        padding: var(--eds-space-5) var(--eds-space-5) var(--eds-space-3);
      }

      .title {
        margin: 0;
        font-family: var(--eds-font-display);
        font-size: var(--eds-font-size-xl);
        font-weight: var(--eds-font-weight-semibold);
        letter-spacing: var(--eds-letter-spacing-tight);
        color: var(--eds-color-ink-950);
        line-height: var(--eds-line-height-snug);
      }

      .close {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        margin: 0;
        padding: 0;
        border: 0;
        border-radius: var(--eds-radius-md);
        background: transparent;
        color: var(--eds-color-text-muted);
        cursor: pointer;
        transition:
          background-color var(--eds-duration-fast) var(--eds-easing-standard),
          color var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .close:hover {
        background: var(--eds-color-ink-100);
        color: var(--eds-color-text);
      }

      .close:focus-visible {
        outline: none;
        box-shadow: var(--eds-shadow-focus);
      }

      .body {
        padding: 0 var(--eds-space-5) var(--eds-space-5);
        overflow: auto;
        color: var(--eds-color-text-muted);
        font-size: var(--eds-font-size-md);
        line-height: var(--eds-line-height-relaxed);
      }

      .footer {
        display: flex;
        justify-content: flex-end;
        gap: var(--eds-space-2);
        padding: var(--eds-space-3) var(--eds-space-5) var(--eds-space-5);
        border-top: 1px solid var(--eds-color-border);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  open = false;

  @property()
  heading = 'Dialog';

  @property({ type: Boolean, attribute: 'close-on-backdrop', reflect: true })
  closeOnBackdrop = true;

  @property({ type: Boolean, attribute: 'close-on-escape', reflect: true })
  closeOnEscape = true;

  @query('.dialog')
  private dialog!: HTMLElement;

  @state()
  private previouslyFocused: HTMLElement | null = null;

  private boundKeyDown = (event: KeyboardEvent) => this.onDocumentKeyDown(event);

  override updated(changed: Map<string, unknown>) {
    if (changed.has('open')) {
      if (this.open) {
        this.previouslyFocused = document.activeElement as HTMLElement | null;
        document.addEventListener('keydown', this.boundKeyDown);
        document.body.style.overflow = 'hidden';
        queueMicrotask(() => {
          const focusable = this.getFocusable()[0];
          (focusable ?? this.dialog)?.focus();
        });
        this.dispatchEvent(
          new CustomEvent('eds-modal-open', { bubbles: true, composed: true }),
        );
      } else if (changed.get('open') === true) {
        document.removeEventListener('keydown', this.boundKeyDown);
        document.body.style.overflow = '';
        this.previouslyFocused?.focus?.();
        this.dispatchEvent(
          new CustomEvent('eds-modal-close', { bubbles: true, composed: true }),
        );
      }
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.boundKeyDown);
    document.body.style.overflow = '';
  }

  private getFocusable(): HTMLElement[] {
    if (!this.dialog) return [];
    const nodes = this.dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    return [...nodes].filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1);
  }

  private onDocumentKeyDown(event: KeyboardEvent) {
    if (!this.open) return;

    if (event.key === 'Escape' && this.closeOnEscape) {
      event.preventDefault();
      this.close();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = this.getFocusable();
    if (!focusable.length) {
      event.preventDefault();
      this.dialog?.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = this.shadowRoot?.activeElement as HTMLElement | null;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private onBackdropClick(event: MouseEvent) {
    if (!this.closeOnBackdrop) return;
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  /** Opens the modal. */
  show() {
    this.open = true;
  }

  /** Closes the modal. */
  close() {
    this.open = false;
  }

  override render() {
    return html`
      <div
        class="backdrop"
        data-open=${this.open ? 'true' : 'false'}
        ?hidden=${!this.open}
        @click=${this.onBackdropClick}
      >
        ${this.open
          ? html`
              <div
                class="dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="eds-modal-title"
                tabindex="-1"
              >
                <div class="header">
                  <h2 class="title" id="eds-modal-title">${this.heading}</h2>
                  <button class="close" type="button" aria-label="Close dialog" @click=${this.close}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
                    </svg>
                  </button>
                </div>
                <div class="body"><slot></slot></div>
                <div class="footer"><slot name="footer"></slot></div>
              </div>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-modal': EdsModal;
  }
}
