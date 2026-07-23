import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { focusRing, hostBase } from '../../foundations/shared.js';
import type { EdsIconName } from '../../icons/paths.js';
import '../icon/eds-icon.js';

export type EdsSideNavItem = {
  label: string;
  href?: string;
  icon?: string;
  active?: boolean;
  children?: EdsSideNavItem[];
};

/**
 * Vertical side navigation for app shells.
 *
 * @fires eds-navigate - Fired when a nav item is activated
 *
 * @element eds-side-nav
 */
@customElement('eds-side-nav')
export class EdsSideNav extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: block;
        width: 100%;
      }

      nav {
        display: flex;
        flex-direction: column;
        gap: var(--eds-space-1);
        padding: var(--eds-space-3);
        border: 1px solid var(--eds-color-border);
        border-radius: var(--eds-radius-md);
        background: var(--eds-color-surface);
      }

      :host([collapsed]) nav {
        align-items: center;
        padding: var(--eds-space-2);
      }

      .item {
        display: flex;
        align-items: center;
        gap: var(--eds-space-3);
        width: 100%;
        min-height: 2.5rem;
        padding: var(--eds-space-2) var(--eds-space-3);
        border: none;
        border-radius: var(--eds-radius-md);
        background: transparent;
        color: var(--eds-color-text-muted);
        font: inherit;
        font-size: var(--eds-font-size-sm);
        font-weight: var(--eds-font-weight-medium);
        text-align: left;
        text-decoration: none;
        cursor: pointer;
        transition:
          background-color var(--eds-duration-fast) var(--eds-easing-standard),
          color var(--eds-duration-fast) var(--eds-easing-standard);
      }

      :host([collapsed]) .item {
        justify-content: center;
        width: 2.5rem;
        padding: var(--eds-space-2);
      }

      .item:hover {
        background: var(--eds-color-ink-50);
        color: var(--eds-color-text);
      }

      ${focusRing}

      .item[data-active='true'] {
        background: var(--eds-color-brand-50);
        color: var(--eds-color-primary);
        font-weight: var(--eds-font-weight-semibold);
      }

      .icon {
        display: inline-flex;
        flex-shrink: 0;
        line-height: 0;
      }

      .label {
        flex: 1;
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      :host([collapsed]) .label {
        display: none;
      }

      .children {
        display: flex;
        flex-direction: column;
        gap: var(--eds-space-1);
        margin: 0;
        padding: 0 0 0 var(--eds-space-6);
        list-style: none;
      }

      :host([collapsed]) .children {
        display: none;
      }

      .child .item {
        min-height: 2.25rem;
        font-size: var(--eds-font-size-xs);
      }
    `,
  ];

  @property({ type: Array })
  items: EdsSideNavItem[] = [];

  @property({ type: Boolean, reflect: true })
  collapsed = false;

  @state()
  private expandedSections = new Set<string>();

  private handleNavigate(item: EdsSideNavItem, event: Event) {
    if (item.children?.length) {
      event.preventDefault();
      if (this.expandedSections.has(item.label)) {
        this.expandedSections.delete(item.label);
      } else {
        this.expandedSections.add(item.label);
      }
      this.requestUpdate();
      return;
    }

    this.dispatchEvent(
      new CustomEvent('eds-navigate', {
        detail: { label: item.label, href: item.href },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private renderItem(item: EdsSideNavItem, isChild = false): TemplateResult {
    const hasChildren = Boolean(item.children?.length);
    const expanded = this.expandedSections.has(item.label);

    const inner = html`
      ${item.icon
        ? html`<span class="icon"><eds-icon name=${item.icon as EdsIconName} size="md"></eds-icon></span>`
        : nothing}
      <span class="label">${item.label}</span>
      ${hasChildren && !this.collapsed
        ? html`
            <eds-icon
              name=${expanded ? 'chevron-up' : 'chevron-down'}
              size="sm"
            ></eds-icon>
          `
        : nothing}
    `;

    const row = item.href && !hasChildren
      ? html`
          <a
            class="item"
            href=${item.href}
            data-active=${item.active ? 'true' : 'false'}
            aria-current=${item.active ? 'page' : nothing}
            title=${this.collapsed ? item.label : nothing}
            @click=${(event: Event) => this.handleNavigate(item, event)}
          >
            ${inner}
          </a>
        `
      : html`
          <button
            type="button"
            class="item"
            data-active=${item.active ? 'true' : 'false'}
            aria-current=${item.active ? 'page' : nothing}
            aria-expanded=${hasChildren ? (expanded ? 'true' : 'false') : nothing}
            title=${this.collapsed ? item.label : nothing}
            @click=${(event: Event) => this.handleNavigate(item, event)}
          >
            ${inner}
          </button>
        `;

    if (isChild) {
      return html`<li class="child">${row}</li>`;
    }

    return html`
      <li>
        ${row}
        ${hasChildren && expanded
          ? html`
              <ul class="children">
                ${item.children!.map((child) => this.renderItem(child, true))}
              </ul>
            `
          : nothing}
      </li>
    `;
  }

  override render() {
    return html`
      <nav aria-label="Side navigation">
        <ul style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:var(--eds-space-1);width:100%;">
          ${this.items.map((item) => this.renderItem(item))}
        </ul>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-side-nav': EdsSideNav;
  }
}
