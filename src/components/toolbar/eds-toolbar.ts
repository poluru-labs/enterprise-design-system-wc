import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase } from '../../foundations/shared.js';

/**
 * Horizontal application toolbar with start, center, and end regions.
 *
 * @slot start - Leading toolbar content
 * @slot center - Centered toolbar content
 * @slot end - Trailing toolbar content
 * @slot - Default content (rendered in the center region)
 *
 * @element eds-toolbar
 */
@customElement('eds-toolbar')
export class EdsToolbar extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .toolbar {
        display: flex;
        align-items: center;
        gap: var(--eds-space-3);
        min-height: 3rem;
        padding: var(--eds-space-2) var(--eds-space-4);
        background: var(--eds-color-surface);
      }

      :host([bordered]) .toolbar {
        border-bottom: 1px solid var(--eds-color-border-strong);
      }

      :host([sticky]) .toolbar {
        position: sticky;
        top: 0;
        z-index: 100;
      }

      .section {
        display: flex;
        align-items: center;
        gap: var(--eds-space-2);
        min-width: 0;
      }

      .start {
        flex: 0 1 auto;
        justify-content: flex-start;
      }

      .center {
        flex: 1 1 auto;
        justify-content: center;
      }

      .end {
        flex: 0 1 auto;
        justify-content: flex-end;
        margin-inline-start: auto;
      }

      .section:empty {
        display: none;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  bordered = false;

  @property({ type: Boolean, reflect: true })
  sticky = false;

  override render() {
    return html`
      <div class="toolbar" role="toolbar">
        <div class="section start"><slot name="start"></slot></div>
        <div class="section center">
          <slot name="center"></slot>
          <slot></slot>
        </div>
        <div class="section end"><slot name="end"></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-toolbar': EdsToolbar;
  }
}
