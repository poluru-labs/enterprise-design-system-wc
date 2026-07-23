import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase } from '../../foundations/shared.js';
import type { EdsButtonSize } from '../button/eds-button.js';

export type EdsButtonGroupOrientation = 'horizontal' | 'vertical';
export type EdsButtonGroupSize = EdsButtonSize;

/**
 * Attached button group for related actions.
 *
 * @slot - `eds-button` children
 *
 * @element eds-button-group
 */
@customElement('eds-button-group')
export class EdsButtonGroup extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: inline-flex;
      }

      .group {
        display: inline-flex;
        align-items: stretch;
      }

      :host([orientation='vertical']) .group {
        flex-direction: column;
      }

      ::slotted(eds-button) {
        position: relative;
      }

      ::slotted(eds-button:not(:first-child)) {
        margin-inline-start: -1px;
      }

      :host([orientation='vertical']) ::slotted(eds-button:not(:first-child)) {
        margin-inline-start: 0;
        margin-block-start: -1px;
      }

      ::slotted(eds-button:first-child) {
        --eds-button-radius: var(--eds-radius-md) 0 0 var(--eds-radius-md);
      }

      ::slotted(eds-button:last-child) {
        --eds-button-radius: 0 var(--eds-radius-md) var(--eds-radius-md) 0;
      }

      ::slotted(eds-button:only-child) {
        --eds-button-radius: var(--eds-radius-md);
      }

      :host([orientation='vertical']) ::slotted(eds-button:first-child) {
        --eds-button-radius: var(--eds-radius-md) var(--eds-radius-md) 0 0;
      }

      :host([orientation='vertical']) ::slotted(eds-button:last-child) {
        --eds-button-radius: 0 0 var(--eds-radius-md) var(--eds-radius-md);
      }

      :host([orientation='vertical']) ::slotted(eds-button:only-child) {
        --eds-button-radius: var(--eds-radius-md);
      }

      ::slotted(eds-button:hover),
      ::slotted(eds-button:focus-within) {
        z-index: 1;
      }
    `,
  ];

  @property({ reflect: true })
  orientation: EdsButtonGroupOrientation = 'horizontal';

  @property({ reflect: true })
  size: EdsButtonGroupSize = 'md';

  override updated(changed: Map<string, unknown>) {
    if (changed.has('size')) {
      this.syncButtonSizes();
    }
  }

  private syncButtonSizes() {
    this.querySelectorAll('eds-button').forEach((button) => {
      button.size = this.size;
    });
  }

  override render() {
    return html`<div class="group" role="group"><slot @slotchange=${this.syncButtonSizes}></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-button-group': EdsButtonGroup;
  }
}
