import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBase } from '../../foundations/shared.js';

export type EdsDataTableColumn = {
  key: string;
  label: string;
  sortable?: boolean;
};

export type EdsSortDirection = 'asc' | 'desc';

/**
 * Tabular data display with optional sorting.
 *
 * @fires eds-sort - Fired when a sortable column header is activated
 *
 * @element eds-data-table
 */
@customElement('eds-data-table')
export class EdsDataTable extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .wrapper {
        overflow-x: auto;
        border: 1px solid var(--eds-color-border);
        border-radius: var(--eds-radius-md);
        background: var(--eds-color-surface);
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: var(--eds-font-size-md);
        line-height: var(--eds-line-height-normal);
      }

      :host([compact]) table {
        font-size: var(--eds-font-size-sm);
      }

      thead {
        background: var(--eds-color-ink-50);
        border-bottom: 1px solid var(--eds-color-border);
      }

      th {
        padding: var(--eds-space-3) var(--eds-space-4);
        text-align: left;
        font-weight: var(--eds-font-weight-semibold);
        color: var(--eds-color-text);
        white-space: nowrap;
      }

      :host([compact]) th {
        padding: var(--eds-space-2) var(--eds-space-3);
      }

      td {
        padding: var(--eds-space-3) var(--eds-space-4);
        color: var(--eds-color-text);
        border-bottom: 1px solid var(--eds-color-border);
      }

      :host([compact]) td {
        padding: var(--eds-space-2) var(--eds-space-3);
      }

      tbody tr:last-child td {
        border-bottom: 0;
      }

      :host([striped]) tbody tr:nth-child(even) {
        background: var(--eds-color-ink-50);
      }

      tbody tr:hover {
        background: var(--eds-color-brand-50);
      }

      .header-button {
        display: inline-flex;
        align-items: center;
        gap: var(--eds-space-2);
        margin: 0;
        padding: 0;
        border: 0;
        background: transparent;
        color: inherit;
        font: inherit;
        font-weight: inherit;
        cursor: pointer;
        border-radius: var(--eds-radius-sm);
      }

      .header-button:focus-visible {
        outline: none;
        box-shadow: var(--eds-shadow-focus);
      }

      .header-label {
        display: inline-flex;
        align-items: center;
        gap: var(--eds-space-2);
      }

      .sort-icon {
        display: inline-flex;
        flex-direction: column;
        gap: 1px;
        color: var(--eds-color-text-muted);
        line-height: 0;
      }

      .sort-icon svg {
        width: 0.625rem;
        height: 0.625rem;
      }

      .sort-icon[data-active='true'] {
        color: var(--eds-color-primary);
      }

      .empty {
        padding: var(--eds-space-6);
        text-align: center;
        color: var(--eds-color-text-muted);
        font-size: var(--eds-font-size-sm);
      }
    `,
  ];

  @property({ type: Array })
  columns: EdsDataTableColumn[] = [];

  @property({ type: Array })
  rows: Record<string, string | number>[] = [];

  @property({ type: Boolean, reflect: true })
  sortable = false;

  @property({ type: Boolean, reflect: true })
  striped = false;

  @property({ type: Boolean, reflect: true })
  compact = false;

  @state()
  private sortKey = '';

  @state()
  private sortDirection: EdsSortDirection = 'asc';

  private isColumnSortable(column: EdsDataTableColumn) {
    return this.sortable && column.sortable !== false;
  }

  private handleSort(key: string) {
    const nextDirection: EdsSortDirection =
      this.sortKey === key && this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.sortKey = key;
    this.sortDirection = nextDirection;

    this.dispatchEvent(
      new CustomEvent('eds-sort', {
        detail: { key, direction: nextDirection },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private renderSortIcon(key: string) {
    const active = this.sortKey === key;
    const direction = active ? this.sortDirection : null;

    return html`
      <span class="sort-icon" data-active=${active ? 'true' : 'false'} aria-hidden="true">
        <svg viewBox="0 0 10 6" fill="currentColor" opacity=${direction === 'desc' || !active ? '1' : '0.35'}>
          <path d="M5 0 10 6H0z" />
        </svg>
        <svg viewBox="0 0 10 6" fill="currentColor" opacity=${direction === 'asc' || !active ? '1' : '0.35'}>
          <path d="M5 6 0 0h10z" />
        </svg>
      </span>
    `;
  }

  private renderHeaderCell(column: EdsDataTableColumn) {
    const sortable = this.isColumnSortable(column);

    if (!sortable) {
      return html`<span class="header-label">${column.label}</span>`;
    }

    const ariaSort =
      this.sortKey === column.key
        ? this.sortDirection === 'asc'
          ? 'ascending'
          : 'descending'
        : 'none';

    return html`
      <button
        type="button"
        class="header-button"
        aria-label=${`Sort by ${column.label}`}
        aria-sort=${ariaSort}
        @click=${() => this.handleSort(column.key)}
      >
        <span class="header-label">
          ${column.label}
          ${this.renderSortIcon(column.key)}
        </span>
      </button>
    `;
  }

  override render() {
    const hasRows = this.rows.length > 0;

    return html`
      <div class="wrapper">
        <table role="table">
          <thead>
            <tr>
              ${this.columns.map(
                (column) => html`
                  <th scope="col">${this.renderHeaderCell(column)}</th>
                `,
              )}
            </tr>
          </thead>
          <tbody>
            ${hasRows
              ? this.rows.map(
                  (row) => html`
                    <tr>
                      ${this.columns.map(
                        (column) => html`
                          <td>${row[column.key] ?? ''}</td>
                        `,
                      )}
                    </tr>
                  `,
                )
              : html`
                  <tr>
                    ${this.columns.length <= 1
                      ? html`<td class="empty">No data</td>`
                      : html`<td class="empty" colspan=${String(this.columns.length)}>No data</td>`}
                  </tr>
                `}
          </tbody>
        </table>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-data-table': EdsDataTable;
  }
}
