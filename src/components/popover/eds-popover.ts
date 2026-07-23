import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { hostBase } from '../../foundations/shared.js';

export type EdsPopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Click-triggered popover with optional heading and slotted content.
 *
 * @slot trigger - Element that toggles the popover
 * @slot - Popover body content
 * @fires eds-open - Fired when the popover opens
 * @fires eds-close - Fired when the popover closes
 *
 * @element eds-popover
 */
@customElement('eds-popover')
export class EdsPopover extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        position: relative;
        display: inline-block;
      }

      .trigger {
        display: inline-flex;
      }

      .panel {
        position: absolute;
        z-index: 1050;
        min-width: 12rem;
        max-width: 20rem;
        padding: var(--eds-space-4);
        border: 1px solid var(--eds-color-border);
        border-radius: var(--eds-radius-lg);
        background: var(--eds-color-surface);
        box-shadow: var(--eds-shadow-md);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translateY(4px);
        transition:
          opacity var(--eds-duration-fast) var(--eds-easing-standard),
          visibility var(--eds-duration-fast) var(--eds-easing-standard),
          transform var(--eds-duration-fast) var(--eds-easing-emphasized);
      }

      .panel[data-open='true'] {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateY(0);
      }

      .panel.placement-top {
        bottom: calc(100% + var(--eds-space-2));
        left: 50%;
        transform: translateX(-50%) translateY(-4px);
      }

      .panel.placement-top[data-open='true'] {
        transform: translateX(-50%) translateY(0);
      }

      .panel.placement-bottom {
        top: calc(100% + var(--eds-space-2));
        left: 0;
      }

      .panel.placement-left {
        right: calc(100% + var(--eds-space-2));
        top: 0;
        transform: translateX(-4px);
      }

      .panel.placement-left[data-open='true'] {
        transform: translateX(0);
      }

      .panel.placement-right {
        left: calc(100% + var(--eds-space-2));
        top: 0;
        transform: translateX(4px);
      }

      .panel.placement-right[data-open='true'] {
        transform: translateX(0);
      }

      .heading {
        margin: 0 0 var(--eds-space-3);
        font-family: var(--eds-font-display);
        font-size: var(--eds-font-size-md);
        font-weight: var(--eds-font-weight-semibold);
        color: var(--eds-color-ink-950);
        line-height: var(--eds-line-height-snug);
      }

      .body {
        color: var(--eds-color-text-muted);
        font-size: var(--eds-font-size-sm);
        line-height: var(--eds-line-height-relaxed);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ reflect: true })
  placement: EdsPopoverPlacement = 'bottom';

  @property()
  heading = '';

  @query('slot[name="trigger"]')
  private triggerSlot!: HTMLSlotElement;

  private triggerId = `eds-popover-trigger-${Math.random().toString(36).slice(2, 9)}`;

  private panelId = `eds-popover-panel-${Math.random().toString(36).slice(2, 9)}`;
  private boundDocumentClick = (event: MouseEvent) => this.onDocumentClick(event);
  private boundDocumentKeyDown = (event: KeyboardEvent) => this.onDocumentKeyDown(event);

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('mousedown', this.boundDocumentClick);
    document.addEventListener('keydown', this.boundDocumentKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('mousedown', this.boundDocumentClick);
    document.removeEventListener('keydown', this.boundDocumentKeyDown);
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('open')) {
      this.syncTriggerAria();
      if (this.open) {
        this.dispatchEvent(new CustomEvent('eds-open', { bubbles: true, composed: true }));
      } else if (changed.get('open') === true) {
        this.dispatchEvent(new CustomEvent('eds-close', { bubbles: true, composed: true }));
      }
    }
  }

  private syncTriggerAria() {
    const triggers = this.triggerSlot?.assignedElements({ flatten: true }) ?? [];
    for (const el of triggers) {
      el.setAttribute('aria-expanded', this.open ? 'true' : 'false');
      el.setAttribute('aria-controls', this.panelId);
      if (!el.id) el.id = this.triggerId;
    }
  }

  private onTriggerClick(event: Event) {
    event.stopPropagation();
    this.toggle();
  }

  private toggle() {
    this.open = !this.open;
  }

  /** Opens the popover. */
  show() {
    this.open = true;
  }

  /** Closes the popover. */
  close() {
    this.open = false;
  }

  private onDocumentClick(event: MouseEvent) {
    if (!this.open) return;
    const path = event.composedPath();
    if (path.includes(this)) return;
    this.close();
  }

  private onDocumentKeyDown(event: KeyboardEvent) {
    if (!this.open || event.key !== 'Escape') return;
    event.preventDefault();
    this.close();
  }

  override render() {
    return html`
      <div class="trigger" @click=${this.onTriggerClick}>
        <slot name="trigger" @slotchange=${() => this.syncTriggerAria()}></slot>
      </div>
      <div
        id=${this.panelId}
        class="panel placement-${this.placement}"
        role="dialog"
        aria-labelledby=${ifDefined(this.heading ? `${this.panelId}-heading` : undefined)}
        data-open=${this.open ? 'true' : 'false'}
        ?hidden=${!this.open}
      >
        ${this.heading
          ? html`<h3 class="heading" id="${this.panelId}-heading">${this.heading}</h3>`
          : nothing}
        <div class="body"><slot></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-popover': EdsPopover;
  }
}
