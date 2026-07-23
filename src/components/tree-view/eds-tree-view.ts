import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase } from '../../foundations/shared.js';

/**
 * Single node in a tree. Nest child `eds-tree-item` elements in the default slot.
 *
 * @slot - Nested `eds-tree-item` children
 *
 * @element eds-tree-item
 */
@customElement('eds-tree-item')
export class EdsTreeItem extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: block;
      }

      .row {
        display: flex;
        align-items: center;
        gap: var(--eds-space-2);
        min-height: 2rem;
        padding: var(--eds-space-1) var(--eds-space-2);
        border-radius: var(--eds-radius-sm);
        cursor: pointer;
        user-select: none;
        color: var(--eds-color-text);
        font-size: var(--eds-font-size-sm);
        transition:
          background-color var(--eds-duration-fast) var(--eds-easing-standard),
          color var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .row:hover {
        background: var(--eds-color-ink-50);
      }

      .row:focus-visible {
        outline: none;
        box-shadow: var(--eds-shadow-focus);
      }

      :host([selected]) .row {
        background: var(--eds-color-brand-50);
        color: var(--eds-color-primary);
        font-weight: var(--eds-font-weight-semibold);
      }

      .toggle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem;
        height: 1.25rem;
        margin: 0;
        padding: 0;
        border: 0;
        background: transparent;
        color: var(--eds-color-text-muted);
        cursor: pointer;
        border-radius: var(--eds-radius-sm);
        flex-shrink: 0;
      }

      .toggle:focus-visible {
        outline: none;
        box-shadow: var(--eds-shadow-focus);
      }

      .toggle svg {
        width: 0.75rem;
        height: 0.75rem;
        transition: transform var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .toggle[data-expanded='true'] svg {
        transform: rotate(90deg);
      }

      .toggle-spacer {
        width: 1.25rem;
        flex-shrink: 0;
      }

      .label {
        flex: 1;
        min-width: 0;
      }

      .children {
        margin-left: var(--eds-space-4);
        border-left: 1px solid var(--eds-color-border);
        padding-left: var(--eds-space-2);
      }

      .children[data-hidden='true'] {
        display: none;
      }
    `,
  ];

  @property()
  itemId = '';

  @property()
  label = '';

  @property({ type: Boolean, reflect: true })
  expanded = false;

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, attribute: 'has-children', reflect: true })
  hasChildren = false;

  private handleToggle(event: Event) {
    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('eds-toggle', {
        detail: { id: this.itemId, expanded: !this.expanded },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleSelect() {
    this.dispatchEvent(
      new CustomEvent('eds-select', {
        detail: { id: this.itemId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.handleSelect();
        break;
      case 'ArrowRight':
        if (this.hasChildren && !this.expanded) {
          event.preventDefault();
          this.dispatchEvent(
            new CustomEvent('eds-toggle', {
              detail: { id: this.itemId, expanded: true },
              bubbles: true,
              composed: true,
            }),
          );
        }
        break;
      case 'ArrowLeft':
        if (this.hasChildren && this.expanded) {
          event.preventDefault();
          this.dispatchEvent(
            new CustomEvent('eds-toggle', {
              detail: { id: this.itemId, expanded: false },
              bubbles: true,
              composed: true,
            }),
          );
        }
        break;
      default:
        break;
    }
  }

  override render() {
    return html`
      <div
        class="row"
        role="treeitem"
        aria-selected=${this.selected ? 'true' : 'false'}
        aria-expanded=${this.hasChildren ? (this.expanded ? 'true' : 'false') : nothing}
        tabindex="0"
        @click=${this.handleSelect}
        @keydown=${this.handleKeyDown}
      >
        ${this.hasChildren
          ? html`
              <button
                type="button"
                class="toggle"
                data-expanded=${this.expanded ? 'true' : 'false'}
                aria-label=${this.expanded ? 'Collapse' : 'Expand'}
                @click=${this.handleToggle}
              >
                <svg viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                  <path d="M3 1 8 5 3 9z" />
                </svg>
              </button>
            `
          : html`<span class="toggle-spacer" aria-hidden="true"></span>`}
        <span class="label">${this.label}</span>
      </div>
      <div class="children" data-hidden=${!this.expanded || !this.hasChildren ? 'true' : 'false'}>
        <slot></slot>
      </div>
    `;
  }
}

export type EdsTreeNode = {
  id: string;
  label: string;
  children?: EdsTreeNode[];
};

/**
 * Hierarchical tree navigation with selection and expand/collapse.
 *
 * @fires eds-select - Fired when a node is selected
 * @fires eds-toggle - Fired when a node is expanded or collapsed
 *
 * @element eds-tree-view
 */
@customElement('eds-tree-view')
export class EdsTreeView extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: block;
        width: 100%;
        max-width: 20rem;
        padding: var(--eds-space-2);
        border: 1px solid var(--eds-color-border);
        border-radius: var(--eds-radius-md);
        background: var(--eds-color-surface);
      }

      .tree {
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .empty {
        padding: var(--eds-space-4);
        text-align: center;
        color: var(--eds-color-text-muted);
        font-size: var(--eds-font-size-sm);
      }
    `,
  ];

  @property({ type: Array })
  items: EdsTreeNode[] = [];

  @property()
  selectedId = '';

  @property({ type: Object })
  expandedIds: Record<string, boolean> = {};

  private isExpanded(id: string) {
    return this.expandedIds[id] ?? false;
  }

  private handleSelect(event: CustomEvent<{ id: string }>) {
    event.stopPropagation();
    this.selectedId = event.detail.id;
    this.dispatchEvent(
      new CustomEvent('eds-select', {
        detail: { id: event.detail.id },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleToggle(event: CustomEvent<{ id: string; expanded: boolean }>) {
    event.stopPropagation();
    this.expandedIds = {
      ...this.expandedIds,
      [event.detail.id]: event.detail.expanded,
    };
    this.dispatchEvent(
      new CustomEvent('eds-toggle', {
        detail: event.detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private renderNode(node: EdsTreeNode): TemplateResult {
    const hasChildren = Boolean(node.children?.length);

    return html`
      <li role="none">
        <eds-tree-item
          .itemId=${node.id}
          label=${node.label}
          ?expanded=${this.isExpanded(node.id)}
          ?selected=${this.selectedId === node.id}
          ?has-children=${hasChildren}
          @eds-select=${this.handleSelect}
          @eds-toggle=${this.handleToggle}
        >
          ${hasChildren
            ? html`
                <ul class="tree" role="group">
                  ${node.children!.map((child) => this.renderNode(child))}
                </ul>
              `
            : nothing}
        </eds-tree-item>
      </li>
    `;
  }

  override render() {
    if (!this.items.length) {
      return html`<div class="empty">No items</div>`;
    }

    return html`
      <ul class="tree" role="tree" aria-label="Tree navigation">
        ${this.items.map((item) => this.renderNode(item))}
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-tree-view': EdsTreeView;
    'eds-tree-item': EdsTreeItem;
  }
}
