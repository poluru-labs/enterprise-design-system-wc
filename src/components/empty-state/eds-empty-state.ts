import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase } from '../../foundations/shared.js';
import type { EdsIconName } from '../../icons/paths.js';
import '../icon/eds-icon.js';

/**
 * Centered empty-state placeholder for no-data screens.
 *
 * @slot - Extra content below the description
 * @slot actions - Action buttons or links
 *
 * @element eds-empty-state
 */
@customElement('eds-empty-state')
export class EdsEmptyState extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--eds-space-4);
        padding: var(--eds-space-8) var(--eds-space-6);
        text-align: center;
      }

      .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 3.5rem;
        height: 3.5rem;
        border-radius: var(--eds-radius-lg);
        background: var(--eds-color-ink-50);
        color: var(--eds-color-text-muted);
        line-height: 0;
      }

      .text {
        display: flex;
        flex-direction: column;
        gap: var(--eds-space-2);
        max-width: 24rem;
      }

      .heading {
        margin: 0;
        font-size: var(--eds-font-size-lg);
        font-weight: var(--eds-font-weight-semibold);
        line-height: var(--eds-line-height-snug);
        color: var(--eds-color-text);
      }

      .description {
        margin: 0;
        font-size: var(--eds-font-size-sm);
        line-height: var(--eds-line-height-relaxed);
        color: var(--eds-color-text-muted);
      }

      .extra {
        font-size: var(--eds-font-size-sm);
        color: var(--eds-color-text-muted);
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: var(--eds-space-3);
      }

      .actions:empty {
        display: none;
      }
    `,
  ];

  @property()
  heading = '';

  @property()
  description = '';

  /** Leading icon name. Empty string hides the icon. */
  @property()
  icon: EdsIconName | '' = 'folder';

  override render() {
    return html`
      <div class="empty">
        ${this.icon
          ? html`<span class="icon"><eds-icon name=${this.icon} size="lg"></eds-icon></span>`
          : nothing}
        <div class="text">
          ${this.heading ? html`<h3 class="heading">${this.heading}</h3>` : nothing}
          ${this.description ? html`<p class="description">${this.description}</p>` : nothing}
        </div>
        <div class="extra"><slot></slot></div>
        <div class="actions"><slot name="actions"></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-empty-state': EdsEmptyState;
  }
}
