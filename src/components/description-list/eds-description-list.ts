import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase } from '../../foundations/shared.js';

export type EdsDescriptionListItem = {
  term: string;
  description: string;
};

export type EdsDescriptionListColumns = 1 | 2 | 3;

/**
 * Semantic description list for term / value pairs.
 *
 * @slot - Custom `dt` / `dd` pairs when `items` is empty
 *
 * @element eds-description-list
 */
@customElement('eds-description-list')
export class EdsDescriptionList extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: block;
        width: 100%;
      }

      dl {
        display: grid;
        grid-template-columns: repeat(var(--eds-dl-columns, 1), minmax(0, 1fr));
        gap: var(--eds-dl-gap, var(--eds-space-4));
        margin: 0;
      }

      :host([compact]) dl {
        --eds-dl-gap: var(--eds-space-2);
      }

      .pair {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: var(--eds-space-1);
        min-width: 0;
      }

      :host([compact]) .pair {
        gap: 0;
      }

      dt {
        margin: 0;
        font-size: var(--eds-font-size-sm);
        font-weight: var(--eds-font-weight-semibold);
        color: var(--eds-color-text-muted);
        line-height: var(--eds-line-height-snug);
      }

      :host([compact]) dt {
        font-size: var(--eds-font-size-xs);
      }

      dd {
        margin: 0;
        font-size: var(--eds-font-size-md);
        color: var(--eds-color-text);
        line-height: var(--eds-line-height-normal);
      }

      :host([compact]) dd {
        font-size: var(--eds-font-size-sm);
      }

      dl.slotted {
        grid-template-columns: minmax(6rem, 1fr) 2fr;
        gap: var(--eds-space-2) var(--eds-space-4);
        align-items: baseline;
      }

      dl.slotted ::slotted(dt) {
        margin: 0;
        font-size: var(--eds-font-size-sm);
        font-weight: var(--eds-font-weight-semibold);
        color: var(--eds-color-text-muted);
      }

      dl.slotted ::slotted(dd) {
        margin: 0;
        font-size: var(--eds-font-size-md);
        color: var(--eds-color-text);
      }
    `,
  ];

  @property({ type: Array })
  items: EdsDescriptionListItem[] = [];

  @property({ type: Number, reflect: true })
  columns: EdsDescriptionListColumns = 1;

  @property({ type: Boolean, reflect: true })
  compact = false;

  override updated(changed: Map<string, unknown>) {
    if (changed.has('columns')) {
      this.style.setProperty('--eds-dl-columns', String(this.columns));
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    this.style.setProperty('--eds-dl-columns', String(this.columns));
  }

  private renderFromItems() {
    return html`
      <dl>
        ${this.items.map(
          (item) => html`
            <div class="pair">
              <dt>${item.term}</dt>
              <dd>${item.description}</dd>
            </div>
          `,
        )}
      </dl>
    `;
  }

  override render() {
    if (this.items.length) {
      return this.renderFromItems();
    }

    return html`<dl class="slotted"><slot></slot></dl>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-description-list': EdsDescriptionList;
  }
}
