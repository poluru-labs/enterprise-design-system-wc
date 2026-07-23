import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { hostBase } from '../../foundations/shared.js';

export type EdsDrawerSide = 'left' | 'right';
export type EdsDrawerSize = 'sm' | 'md' | 'lg';

/**
 * Side panel overlay with backdrop dismiss and scroll lock.
 *
 * @slot - Drawer body content
 * @slot footer - Optional footer actions
 * @fires eds-open - Fired when the drawer opens
 * @fires eds-close - Fired when the drawer closes
 *
 * @element eds-drawer
 */
@customElement('eds-drawer')
export class EdsDrawer extends LitElement {
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
        background: linear-gradient(180deg, rgb(15 23 32 / 0.35), rgb(15 23 32 / 0.5));
        backdrop-filter: blur(2px);
        opacity: 0;
        pointer-events: none;
        transition: opacity var(--eds-duration-normal) var(--eds-easing-standard);
      }

      .backdrop[data-open='true'] {
        opacity: 1;
        pointer-events: auto;
      }

      .panel {
        position: fixed;
        top: 0;
        bottom: 0;
        z-index: 1001;
        display: flex;
        flex-direction: column;
        background: var(--eds-color-surface);
        border: 1px solid var(--eds-color-border);
        box-shadow: var(--eds-shadow-lg);
        transition: transform var(--eds-duration-normal) var(--eds-easing-emphasized);
      }

      .panel.side-right {
        right: 0;
        border-left-width: 1px;
        border-right-width: 0;
        transform: translateX(100%);
      }

      .panel.side-left {
        left: 0;
        border-right-width: 1px;
        border-left-width: 0;
        transform: translateX(-100%);
      }

      .backdrop[data-open='true'] .panel {
        transform: translateX(0);
      }

      .panel.sm {
        width: min(100%, 20rem);
      }

      .panel.md {
        width: min(100%, 28rem);
      }

      .panel.lg {
        width: min(100%, 36rem);
      }

      .header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: var(--eds-space-4);
        padding: var(--eds-space-5) var(--eds-space-5) var(--eds-space-3);
        border-bottom: 1px solid var(--eds-color-border);
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
        flex: 1;
        overflow: auto;
        padding: var(--eds-space-5);
        color: var(--eds-color-text-muted);
        font-size: var(--eds-font-size-md);
        line-height: var(--eds-line-height-relaxed);
      }

      .footer {
        display: flex;
        justify-content: flex-end;
        gap: var(--eds-space-2);
        padding: var(--eds-space-4) var(--eds-space-5);
        border-top: 1px solid var(--eds-color-border);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ reflect: true })
  side: EdsDrawerSide = 'right';

  @property()
  heading = 'Panel';

  @property({ reflect: true })
  size: EdsDrawerSize = 'md';

  @query('.panel')
  private panel!: HTMLElement;

  @state()
  private previouslyFocused: HTMLElement | null = null;

  private boundKeyDown = (event: KeyboardEvent) => this.onDocumentKeyDown(event);

  override updated(changed: Map<string, unknown>) {
    if (changed.has('open')) {
      if (this.open) {
        this.previouslyFocused = document.activeElement as HTMLElement | null;
        document.addEventListener('keydown', this.boundKeyDown);
        document.body.style.overflow = 'hidden';
        queueMicrotask(() => this.panel?.focus());
        this.dispatchEvent(new CustomEvent('eds-open', { bubbles: true, composed: true }));
      } else if (changed.get('open') === true) {
        document.removeEventListener('keydown', this.boundKeyDown);
        document.body.style.overflow = '';
        this.previouslyFocused?.focus?.();
        this.dispatchEvent(new CustomEvent('eds-close', { bubbles: true, composed: true }));
      }
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.boundKeyDown);
    document.body.style.overflow = '';
  }

  private onDocumentKeyDown(event: KeyboardEvent) {
    if (!this.open || event.key !== 'Escape') return;
    event.preventDefault();
    this.close();
  }

  private onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  /** Opens the drawer. */
  show() {
    this.open = true;
  }

  /** Closes the drawer. */
  close() {
    this.open = false;
  }

  override render() {
    const panelClasses = {
      panel: true,
      [`side-${this.side}`]: true,
      [this.size]: true,
    };

    return html`
      <div
        class="backdrop"
        data-open=${this.open ? 'true' : 'false'}
        ?hidden=${!this.open}
        @click=${this.onBackdropClick}
      >
        ${this.open
          ? html`
              <aside
                class=${classMap(panelClasses)}
                role="dialog"
                aria-modal="true"
                aria-labelledby="eds-drawer-title"
                tabindex="-1"
                @click=${(event: Event) => event.stopPropagation()}
              >
                <div class="header">
                  <h2 class="title" id="eds-drawer-title">${this.heading}</h2>
                  <button
                    class="close"
                    type="button"
                    aria-label="Close panel"
                    @click=${this.close}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M4 4L12 12M12 4L4 12"
                        stroke="currentColor"
                        stroke-width="1.75"
                        stroke-linecap="round"
                      />
                    </svg>
                  </button>
                </div>
                <div class="body"><slot></slot></div>
                <div class="footer"><slot name="footer"></slot></div>
              </aside>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-drawer': EdsDrawer;
  }
}
