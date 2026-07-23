import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase } from '../../foundations/shared.js';

function range(start: number, end: number) {
  const values: number[] = [];
  for (let index = start; index <= end; index += 1) {
    values.push(index);
  }
  return values;
}

function buildPaginationItems(current: number, total: number, siblingCount: number) {
  if (total <= 1) {
    return total === 1 ? [1] : [];
  }

  const totalNumbers = siblingCount * 2 + 5;
  if (total <= totalNumbers) {
    return range(1, total);
  }

  const leftSibling = Math.max(current - siblingCount, 1);
  const rightSibling = Math.min(current + siblingCount, total);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < total - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = range(1, 3 + siblingCount * 2);
    return [...leftRange, 'ellipsis', total];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightRange = range(total - (2 + siblingCount * 2), total);
    return [1, 'ellipsis', ...rightRange];
  }

  if (showLeftEllipsis && showRightEllipsis) {
    const middleRange = range(leftSibling, rightSibling);
    return [1, 'ellipsis', ...middleRange, 'ellipsis', total];
  }

  return range(1, total);
}

/**
 * Page navigation with previous/next controls and numbered pages.
 *
 * @fires eds-change - Fired when the active page changes
 *
 * @element eds-pagination
 */
@customElement('eds-pagination')
export class EdsPagination extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: inline-block;
      }

      nav {
        display: inline-flex;
        align-items: center;
        gap: var(--eds-space-1);
      }

      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 2.25rem;
        height: 2.25rem;
        margin: 0;
        padding: 0 var(--eds-space-2);
        border: 1px solid var(--eds-color-border-strong);
        border-radius: var(--eds-radius-md);
        background: var(--eds-color-surface);
        color: var(--eds-color-text);
        font: inherit;
        font-size: var(--eds-font-size-sm);
        font-weight: var(--eds-font-weight-semibold);
        cursor: pointer;
        transition:
          background-color var(--eds-duration-fast) var(--eds-easing-standard),
          border-color var(--eds-duration-fast) var(--eds-easing-standard),
          color var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .button:hover:not(:disabled):not([data-active='true']) {
        background: var(--eds-color-ink-50);
        border-color: var(--eds-color-ink-400);
      }

      .button:focus-visible {
        outline: none;
        box-shadow: var(--eds-shadow-focus);
      }

      .button:disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }

      .button[data-active='true'] {
        background: var(--eds-color-primary);
        border-color: var(--eds-color-primary);
        color: var(--eds-color-text-inverse);
      }

      .ellipsis {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 2.25rem;
        height: 2.25rem;
        color: var(--eds-color-text-muted);
        font-size: var(--eds-font-size-sm);
        user-select: none;
      }
    `,
  ];

  @property({ type: Number, reflect: true })
  page = 1;

  @property({ type: Number, attribute: 'page-size' })
  pageSize = 10;

  @property({ type: Number })
  total = 0;

  @property({ type: Number, attribute: 'sibling-count' })
  siblingCount = 1;

  private get totalPages() {
    return Math.max(Math.ceil(this.total / this.pageSize), 0);
  }

  private changePage(nextPage: number) {
    const clamped = Math.min(Math.max(nextPage, 1), Math.max(this.totalPages, 1));
    if (clamped === this.page) return;

    this.page = clamped;
    this.dispatchEvent(
      new CustomEvent('eds-change', {
        detail: { page: clamped },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    const totalPages = this.totalPages;
    const items = buildPaginationItems(this.page, totalPages, this.siblingCount);

    return html`
      <nav aria-label="Pagination">
        <button
          type="button"
          class="button"
          aria-label="Previous page"
          ?disabled=${this.page <= 1 || totalPages === 0}
          @click=${() => this.changePage(this.page - 1)}
        >
          Prev
        </button>

        ${totalPages === 0
          ? nothing
          : items.map((item) =>
              item === 'ellipsis'
                ? html`<span class="ellipsis" aria-hidden="true">…</span>`
                : html`
                    <button
                      type="button"
                      class="button"
                      data-active=${this.page === item ? 'true' : 'false'}
                      aria-label=${`Page ${item}`}
                      aria-current=${this.page === item ? 'page' : nothing}
                      @click=${() => this.changePage(item as number)}
                    >
                      ${item}
                    </button>
                  `,
            )}

        <button
          type="button"
          class="button"
          aria-label="Next page"
          ?disabled=${this.page >= totalPages || totalPages === 0}
          @click=${() => this.changePage(this.page + 1)}
        >
          Next
        </button>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-pagination': EdsPagination;
  }
}
