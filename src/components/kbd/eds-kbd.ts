import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase } from '../../foundations/shared.js';

/**
 * Styled keyboard shortcut display.
 *
 * @slot - Shortcut keys when `keys` is not set
 *
 * @element eds-kbd
 */
@customElement('eds-kbd')
export class EdsKbd extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        vertical-align: middle;
      }

      kbd {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 1.5rem;
        padding: 0.125rem var(--eds-space-2);
        border: 1px solid var(--eds-color-border-strong);
        border-bottom-width: 2px;
        border-radius: var(--eds-radius-sm);
        background: var(--eds-color-surface);
        color: var(--eds-color-text);
        font-family: var(--eds-font-mono);
        font-size: var(--eds-font-size-xs);
        font-weight: var(--eds-font-weight-medium);
        line-height: 1.4;
        white-space: nowrap;
        box-shadow: var(--eds-shadow-xs);
      }
    `,
  ];

  @property()
  keys = '';

  override render() {
    return html`
      <kbd part="kbd">
        ${this.keys ? this.keys : html`<slot></slot>`}
      </kbd>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-kbd': EdsKbd;
  }
}
