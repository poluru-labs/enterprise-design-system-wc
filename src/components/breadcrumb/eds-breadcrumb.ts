import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase } from '../../foundations/shared.js';

/**
 * Single breadcrumb segment. Place inside `eds-breadcrumb`.
 *
 * @slot - Link or text content when `label` is not set
 *
 * @element eds-breadcrumb-item
 */
@customElement('eds-breadcrumb-item')
export class EdsBreadcrumbItem extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--eds-space-2);
      font-family: var(--eds-font-sans);
      font-size: var(--eds-font-size-sm);
      color: var(--eds-color-text-muted);
    }

    :host([current]) {
      color: var(--eds-color-text);
      font-weight: var(--eds-font-weight-semibold);
    }

    a {
      color: inherit;
      text-decoration: none;
      border-radius: var(--eds-radius-sm);
      transition: color var(--eds-duration-fast) var(--eds-easing-standard);
    }

    a:hover {
      color: var(--eds-color-primary);
      text-decoration: underline;
    }

    a:focus-visible {
      outline: none;
      box-shadow: var(--eds-shadow-focus);
    }

    .separator {
      color: var(--eds-color-text-muted);
      user-select: none;
    }
  `;

  @property()
  label = '';

  @property()
  href?: string;

  @property({ type: Boolean, reflect: true })
  current = false;

  @property({ type: Boolean, reflect: true })
  separator = false;

  override render() {
    const content = this.label
      ? this.href && !this.current
        ? html`<a href=${this.href}>${this.label}</a>`
        : html`<span aria-current=${this.current ? 'page' : nothing}>${this.label}</span>`
      : html`<slot></slot>`;

    return html`
      ${content}
      ${this.separator ? html`<span class="separator" aria-hidden="true">/</span>` : nothing}
    `;
  }
}

export type EdsBreadcrumbItemData = {
  label: string;
  href?: string;
};

/**
 * Navigation trail showing the current page location.
 *
 * @slot - Optional `eds-breadcrumb-item` children when not using `items`
 *
 * @element eds-breadcrumb
 */
@customElement('eds-breadcrumb')
export class EdsBreadcrumb extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: block;
      }

      nav {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--eds-space-2);
      }

      .list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--eds-space-2);
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .item {
        display: inline-flex;
        align-items: center;
        gap: var(--eds-space-2);
        font-size: var(--eds-font-size-sm);
        color: var(--eds-color-text-muted);
      }

      .item[data-current='true'] {
        color: var(--eds-color-text);
        font-weight: var(--eds-font-weight-semibold);
      }

      .item a {
        color: inherit;
        text-decoration: none;
        border-radius: var(--eds-radius-sm);
        transition: color var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .item a:hover {
        color: var(--eds-color-primary);
        text-decoration: underline;
      }

      .item a:focus-visible {
        outline: none;
        box-shadow: var(--eds-shadow-focus);
      }

      .separator {
        color: var(--eds-color-text-muted);
        user-select: none;
      }
    `,
  ];

  @property({ type: Array })
  items: EdsBreadcrumbItemData[] = [];

  private renderFromItems() {
    const lastIndex = this.items.length - 1;

    return html`
      <ol class="list">
        ${this.items.map(
          (item, index) => html`
            <li class="item" data-current=${index === lastIndex ? 'true' : 'false'}>
              ${item.href && index !== lastIndex
                ? html`<a href=${item.href}>${item.label}</a>`
                : html`
                    <span aria-current=${index === lastIndex ? 'page' : nothing}>${item.label}</span>
                  `}
              ${index < lastIndex ? html`<span class="separator" aria-hidden="true">/</span>` : nothing}
            </li>
          `,
        )}
      </ol>
    `;
  }

  override render() {
    if (this.items.length) {
      return html`<nav aria-label="Breadcrumb">${this.renderFromItems()}</nav>`;
    }

    return html`
      <nav aria-label="Breadcrumb">
        <slot></slot>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-breadcrumb': EdsBreadcrumb;
    'eds-breadcrumb-item': EdsBreadcrumbItem;
  }
}
