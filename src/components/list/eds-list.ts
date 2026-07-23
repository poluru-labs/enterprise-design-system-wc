import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { focusRing, hostBase } from '../../foundations/shared.js';
import type { EdsIconName } from '../../icons/paths.js';
import '../icon/eds-icon.js';

/**
 * Single row in an `eds-list`.
 *
 * @slot - Custom row content when `label` is not set
 * @fires eds-select - Fired when the item is activated
 *
 * @element eds-list-item
 */
@customElement('eds-list-item')
export class EdsListItem extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: block;
      }

      .item {
        display: flex;
        align-items: center;
        gap: var(--eds-space-3);
        width: 100%;
        min-height: 2.75rem;
        padding: var(--eds-space-3) var(--eds-space-4);
        border: none;
        background: transparent;
        color: inherit;
        font: inherit;
        text-align: left;
        text-decoration: none;
        cursor: pointer;
        transition:
          background-color var(--eds-duration-fast) var(--eds-easing-standard),
          color var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .item:hover:not([data-disabled='true']) {
        background: var(--eds-color-ink-50);
      }

      ${focusRing}

      :host([selected]) .item {
        background: var(--eds-color-brand-50);
        color: var(--eds-color-primary);
      }

      .item[data-disabled='true'] {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .icon {
        display: inline-flex;
        flex-shrink: 0;
        color: var(--eds-color-text-muted);
        line-height: 0;
      }

      :host([selected]) .icon {
        color: var(--eds-color-primary);
      }

      .text {
        display: flex;
        flex-direction: column;
        gap: var(--eds-space-1);
        min-width: 0;
        flex: 1;
      }

      .label {
        font-size: var(--eds-font-size-sm);
        font-weight: var(--eds-font-weight-semibold);
        line-height: var(--eds-line-height-snug);
      }

      .description {
        font-size: var(--eds-font-size-xs);
        line-height: var(--eds-line-height-normal);
        color: var(--eds-color-text-muted);
      }

      :host([selected]) .description {
        color: var(--eds-color-primary);
        opacity: 0.85;
      }
    `,
  ];

  @property()
  label = '';

  @property()
  description = '';

  @property()
  icon: EdsIconName | '' = '';

  @property()
  href?: string;

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  private handleActivate(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    this.dispatchEvent(
      new CustomEvent('eds-select', {
        detail: { label: this.label },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    const content = html`
      ${this.icon ? html`<span class="icon"><eds-icon name=${this.icon} size="md"></eds-icon></span>` : nothing}
      ${this.label || this.description
        ? html`
            <span class="text">
              ${this.label ? html`<span class="label">${this.label}</span>` : nothing}
              ${this.description ? html`<span class="description">${this.description}</span>` : nothing}
            </span>
          `
        : html`<span class="text"><slot></slot></span>`}
    `;

    if (this.href && !this.disabled) {
      return html`
        <a
          class="item"
          href=${ifDefined(this.href || undefined)}
          data-disabled=${this.disabled ? 'true' : 'false'}
          @click=${this.handleActivate}
        >
          ${content}
        </a>
      `;
    }

    return html`
      <button
        type="button"
        class="item"
        data-disabled=${this.disabled ? 'true' : 'false'}
        ?disabled=${this.disabled}
        @click=${this.handleActivate}
      >
        ${content}
      </button>
    `;
  }
}

export type EdsListItemData = {
  label: string;
  description?: string;
  icon?: string;
  href?: string;
};

/**
 * Vertical list of selectable rows.
 *
 * @slot - Optional `eds-list-item` children when not using `items`
 *
 * @element eds-list
 */
@customElement('eds-list')
export class EdsList extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .list {
        margin: 0;
        padding: 0;
        list-style: none;
        border: 1px solid var(--eds-color-border);
        border-radius: var(--eds-radius-md);
        background: var(--eds-color-surface);
        overflow: hidden;
      }

      :host([divided]) ::slotted(eds-list-item:not(:last-child)),
      :host([divided]) .item-row:not(:last-child) {
        border-bottom: 1px solid var(--eds-color-border);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  divided = false;

  @property({ type: Array })
  items: EdsListItemData[] = [];

  @property({ type: Number })
  selectedIndex = -1;

  private handleItemSelect(event: Event) {
    const detail = (event as CustomEvent<{ label: string }>).detail;
    const index = this.items.findIndex((item) => item.label === detail.label);
    if (index >= 0) {
      this.selectedIndex = index;
    }
    this.dispatchEvent(
      new CustomEvent('eds-select', {
        detail: { label: detail.label, index: index >= 0 ? index : undefined },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private renderFromItems() {
    return html`
      <div class="list" role="list">
        ${this.items.map(
          (item, index) => html`
            <div class="item-row" role="listitem">
              <eds-list-item
                label=${item.label}
                description=${item.description ?? ''}
                icon=${(item.icon as EdsIconName) ?? ''}
                .href=${item.href}
                ?selected=${index === this.selectedIndex}
                @eds-select=${this.handleItemSelect}
              ></eds-list-item>
            </div>
          `,
        )}
      </div>
    `;
  }

  override render() {
    if (this.items.length) {
      return this.renderFromItems();
    }

    return html`
      <div class="list" role="list">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-list': EdsList;
    'eds-list-item': EdsListItem;
  }
}
