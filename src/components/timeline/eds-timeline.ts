import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase } from '../../foundations/shared.js';

export type EdsTimelineItemStatus = 'complete' | 'current' | 'upcoming';

export type EdsTimelineItem = {
  title: string;
  description?: string;
  timestamp?: string;
  status?: EdsTimelineItemStatus;
};

/**
 * Vertical timeline for activity feeds and process history.
 *
 * @element eds-timeline
 * @example
 * ```html
 * <eds-timeline></eds-timeline>
 * ```
 */
@customElement('eds-timeline')
export class EdsTimeline extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .timeline {
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .item {
        display: flex;
        gap: var(--eds-space-3);
        min-width: 0;
      }

      .track {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
        width: 1.25rem;
      }

      .dot {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 0.625rem;
        height: 0.625rem;
        margin-top: 0.375rem;
        border-radius: 50%;
        border: 2px solid var(--eds-color-border-strong);
        background: var(--eds-color-surface);
        flex-shrink: 0;
        transition:
          border-color var(--eds-duration-fast) var(--eds-easing-standard),
          background-color var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .item[data-status='complete'] .dot {
        border-color: var(--eds-color-primary);
        background: var(--eds-color-primary);
      }

      .item[data-status='current'] .dot {
        border-color: var(--eds-color-primary);
        background: var(--eds-color-surface);
        box-shadow: 0 0 0 3px rgb(15 110 106 / 0.15);
      }

      .item[data-status='upcoming'] .dot {
        border-color: var(--eds-color-border);
        background: var(--eds-color-ink-100);
      }

      .connector {
        flex: 1;
        width: 2px;
        min-height: 1.5rem;
        margin: var(--eds-space-1) 0;
        background: var(--eds-color-border);
      }

      .item[data-status='complete'] .connector {
        background: var(--eds-color-primary);
      }

      .content {
        display: flex;
        flex-direction: column;
        gap: var(--eds-space-1);
        min-width: 0;
        padding-bottom: var(--eds-space-5);
      }

      .header {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: space-between;
        gap: var(--eds-space-2);
      }

      .title {
        font-size: var(--eds-font-size-sm);
        font-weight: var(--eds-font-weight-semibold);
        color: var(--eds-color-text);
        line-height: var(--eds-line-height-snug);
      }

      .item[data-status='upcoming'] .title {
        color: var(--eds-color-text-muted);
        font-weight: var(--eds-font-weight-medium);
      }

      .timestamp {
        font-size: var(--eds-font-size-xs);
        color: var(--eds-color-text-subtle);
        white-space: nowrap;
      }

      .description {
        font-size: var(--eds-font-size-sm);
        line-height: var(--eds-line-height-normal);
        color: var(--eds-color-text-muted);
      }
    `,
  ];

  @property({ type: Array })
  items: EdsTimelineItem[] = [];

  private itemStatus(item: EdsTimelineItem, index: number): EdsTimelineItemStatus {
    if (item.status) return item.status;
    if (index === 0) return 'current';
    return 'upcoming';
  }

  override render() {
    const lastIndex = this.items.length - 1;

    return html`
      <ol class="timeline" aria-label="Timeline">
        ${this.items.map((item, index) => {
          const status = this.itemStatus(item, index);
          const showConnector = index < lastIndex;

          return html`
            <li class="item" data-status=${status}>
              <span class="track" aria-hidden="true">
                <span class="dot"></span>
                ${showConnector ? html`<span class="connector"></span>` : nothing}
              </span>
              <div class="content">
                <div class="header">
                  <span class="title">${item.title}</span>
                  ${item.timestamp
                    ? html`<time class="timestamp">${item.timestamp}</time>`
                    : nothing}
                </div>
                ${item.description
                  ? html`<p class="description">${item.description}</p>`
                  : nothing}
              </div>
            </li>
          `;
        })}
      </ol>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-timeline': EdsTimeline;
  }
}
