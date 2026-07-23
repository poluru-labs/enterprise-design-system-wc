import { LitElement, html, css } from 'lit';
import { customElement, property, queryAssignedElements, state } from 'lit/decorators.js';
import { hostBase } from '../../foundations/shared.js';

/**
 * Single accordion item. Place inside `eds-accordion`.
 *
 * @slot - Expandable body content
 *
 * @element eds-accordion-item
 */
@customElement('eds-accordion-item')
export class EdsAccordionItem extends LitElement {
  static override styles = css`
    :host {
      display: block;
      border-bottom: 1px solid var(--eds-color-border);
    }

    :host(:last-of-type) {
      border-bottom: 0;
    }

    .trigger {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      gap: var(--eds-space-4);
      margin: 0;
      padding: var(--eds-space-4) 0;
      border: 0;
      background: transparent;
      color: var(--eds-color-text);
      font: inherit;
      font-weight: var(--eds-font-weight-semibold);
      font-size: var(--eds-font-size-md);
      text-align: left;
      cursor: pointer;
    }

    .trigger:focus-visible {
      outline: none;
      box-shadow: var(--eds-shadow-focus);
      border-radius: var(--eds-radius-sm);
    }

    .trigger:hover .title {
      color: var(--eds-color-primary);
    }

    .title {
      transition: color var(--eds-duration-fast) var(--eds-easing-standard);
    }

    h3 {
      margin: 0;
      font: inherit;
    }

    .icon {
      flex-shrink: 0;
      width: 1.25rem;
      height: 1.25rem;
      color: var(--eds-color-text-muted);
      transition: transform var(--eds-duration-normal) var(--eds-easing-standard);
    }

    .icon[data-open='true'] {
      transform: rotate(180deg);
      color: var(--eds-color-primary);
    }

    .panel {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--eds-duration-normal) var(--eds-easing-standard);
    }

    .panel[data-open='true'] {
      grid-template-rows: 1fr;
    }

    .panel-inner {
      overflow: hidden;
    }

    .content {
      padding: 0 0 var(--eds-space-4);
      color: var(--eds-color-text-muted);
      font-family: var(--eds-font-sans);
      font-size: var(--eds-font-size-md);
      line-height: var(--eds-line-height-relaxed);
    }
  `;

  @property({ reflect: true })
  heading = '';

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  private toggle() {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('eds-accordion-toggle', {
        detail: { open: !this.open },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    const panelId = `panel-${this.heading.replace(/\s+/g, '-').toLowerCase() || 'item'}`;

    return html`
      <h3>
        <button
          class="trigger"
          type="button"
          id=${`${panelId}-trigger`}
          aria-expanded=${this.open ? 'true' : 'false'}
          aria-controls=${panelId}
          ?disabled=${this.disabled}
          @click=${this.toggle}
        >
          <span class="title">${this.heading}</span>
          <svg class="icon" data-open=${this.open ? 'true' : 'false'} viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </h3>
      <div class="panel" data-open=${this.open ? 'true' : 'false'} id=${panelId} role="region" aria-labelledby=${`${panelId}-trigger`}>
        <div class="panel-inner">
          <div class="content"><slot></slot></div>
        </div>
      </div>
    `;
  }
}

/**
 * Accordion group with single or multiple expansion.
 *
 * @slot - One or more `eds-accordion-item` children
 * @fires eds-accordion-change - Fired when open items change
 *
 * @element eds-accordion
 */
@customElement('eds-accordion')
export class EdsAccordion extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: block;
        width: 100%;
        max-width: 40rem;
        background: var(--eds-color-surface);
        border: 1px solid var(--eds-color-border);
        border-radius: var(--eds-radius-lg);
        padding: 0 var(--eds-space-5);
        box-shadow: var(--eds-shadow-xs);
      }
    `,
  ];

  /** When true, only one item may be open at a time. */
  @property({ type: Boolean, reflect: true })
  single = false;

  @queryAssignedElements({ selector: 'eds-accordion-item' })
  private items!: EdsAccordionItem[];

  @state()
  private privateItems: EdsAccordionItem[] = [];

  override firstUpdated() {
    this.syncFromSlot();
  }

  private syncFromSlot() {
    this.privateItems = [...this.items];
  }

  private onToggle(event: Event) {
    const target = event.target as EdsAccordionItem;
    const detail = (event as CustomEvent<{ open: boolean }>).detail;
    const nextOpen = detail.open;

    if (this.single && nextOpen) {
      this.privateItems.forEach((item) => {
        item.open = item === target;
      });
    } else {
      target.open = nextOpen;
    }

    this.dispatchEvent(
      new CustomEvent('eds-accordion-change', {
        detail: {
          openHeadings: this.privateItems.filter((i) => i.open).map((i) => i.heading),
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <div @eds-accordion-toggle=${this.onToggle} @slotchange=${this.syncFromSlot}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-accordion': EdsAccordion;
    'eds-accordion-item': EdsAccordionItem;
  }
}
