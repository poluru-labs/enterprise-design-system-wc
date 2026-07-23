import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { hostBase } from '../../foundations/shared.js';

/**
 * Surface container for grouped content with optional elevation.
 *
 * @slot header - Card header area
 * @slot media - Optional media block above the body
 * @slot - Card body content
 * @slot footer - Card footer actions or metadata
 *
 * @element eds-card
 */
@customElement('eds-card')
export class EdsCard extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .card {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid var(--eds-color-border);
        border-radius: var(--eds-radius-lg);
        background: var(--eds-color-surface);
        color: var(--eds-color-text);
      }

      .elevated {
        border-color: transparent;
        box-shadow: var(--eds-shadow-sm);
      }

      .media ::slotted(*) {
        display: block;
        width: 100%;
      }

      .header ::slotted(*) {
        display: block;
      }

      .body ::slotted(*) {
        display: block;
      }

      .footer ::slotted(*) {
        display: block;
      }

      .header,
      .body,
      .footer {
        padding: 0;
      }

      .padded .header {
        padding: var(--eds-space-5) var(--eds-space-5) var(--eds-space-3);
        border-bottom: 1px solid var(--eds-color-border);
      }

      .padded .body {
        padding: var(--eds-space-5);
      }

      .padded .footer {
        padding: var(--eds-space-3) var(--eds-space-5) var(--eds-space-5);
        border-top: 1px solid var(--eds-color-border);
      }

      .padded .media + .header,
      .padded .media + .body {
        padding-top: var(--eds-space-5);
      }

      .padded .media ::slotted(*) {
        border-bottom: 1px solid var(--eds-color-border);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  elevated = false;

  @property({ type: Boolean, reflect: true })
  padded = true;

  override render() {
    const cardClasses = {
      card: true,
      elevated: this.elevated,
      padded: this.padded,
    };

    return html`
      <article class=${classMap(cardClasses)}>
        <div class="media"><slot name="media"></slot></div>
        <div class="header"><slot name="header"></slot></div>
        <div class="body"><slot></slot></div>
        <div class="footer"><slot name="footer"></slot></div>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-card': EdsCard;
  }
}
