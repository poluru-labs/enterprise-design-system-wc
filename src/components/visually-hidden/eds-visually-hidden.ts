import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { hostBase } from '../../foundations/shared.js';

/**
 * Visually hides content while keeping it available to assistive technology.
 *
 * @slot - Content to hide visually
 *
 * @element eds-visually-hidden
 */
@customElement('eds-visually-hidden')
export class EdsVisuallyHidden extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: contents;
      }

      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `,
  ];

  override render() {
    return html`<span class="visually-hidden"><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-visually-hidden': EdsVisuallyHidden;
  }
}
