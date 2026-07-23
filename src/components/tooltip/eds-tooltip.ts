import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBase } from '../../foundations/shared.js';

export type EdsTooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Accessible tooltip shown on hover and focus of the slotted trigger.
 *
 * @slot - Trigger element (button, link, etc.)
 *
 * @element eds-tooltip
 */
@customElement('eds-tooltip')
export class EdsTooltip extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        position: relative;
        display: inline-block;
      }

      .trigger {
        display: inline-flex;
      }

      .tooltip {
        position: absolute;
        z-index: 1100;
        max-width: 16rem;
        padding: var(--eds-space-2) var(--eds-space-3);
        border-radius: var(--eds-radius-sm);
        background: var(--eds-color-ink-900);
        color: var(--eds-color-text-inverse);
        font-size: var(--eds-font-size-sm);
        font-weight: var(--eds-font-weight-medium);
        line-height: var(--eds-line-height-normal);
        box-shadow: var(--eds-shadow-md);
        pointer-events: none;
        opacity: 0;
        visibility: hidden;
        transition:
          opacity var(--eds-duration-fast) var(--eds-easing-standard),
          visibility var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .tooltip[data-visible='true'] {
        opacity: 1;
        visibility: visible;
      }

      .tooltip.placement-top {
        bottom: calc(100% + var(--eds-space-2));
        left: 50%;
        transform: translateX(-50%);
      }

      .tooltip.placement-bottom {
        top: calc(100% + var(--eds-space-2));
        left: 50%;
        transform: translateX(-50%);
      }

      .tooltip.placement-left {
        right: calc(100% + var(--eds-space-2));
        top: 50%;
        transform: translateY(-50%);
      }

      .tooltip.placement-right {
        left: calc(100% + var(--eds-space-2));
        top: 50%;
        transform: translateY(-50%);
      }

      .tooltip::after {
        content: '';
        position: absolute;
        border: 5px solid transparent;
      }

      .tooltip.placement-top::after {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-top-color: var(--eds-color-ink-900);
      }

      .tooltip.placement-bottom::after {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-bottom-color: var(--eds-color-ink-900);
      }

      .tooltip.placement-left::after {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-left-color: var(--eds-color-ink-900);
      }

      .tooltip.placement-right::after {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-right-color: var(--eds-color-ink-900);
      }
    `,
  ];

  @property()
  content = '';

  @property({ reflect: true })
  placement: EdsTooltipPlacement = 'top';

  @property({ type: Number })
  delay = 200;

  @state()
  private visible = false;

  private tooltipId = `eds-tooltip-${Math.random().toString(36).slice(2, 9)}`;
  private showTimer: ReturnType<typeof setTimeout> | null = null;
  private hideTimer: ReturnType<typeof setTimeout> | null = null;

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.clearTimers();
  }

  private clearTimers() {
    if (this.showTimer) clearTimeout(this.showTimer);
    if (this.hideTimer) clearTimeout(this.hideTimer);
    this.showTimer = null;
    this.hideTimer = null;
  }

  private onTriggerEnter() {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
    if (this.delay <= 0) {
      this.visible = true;
      this.syncAria();
      return;
    }
    this.showTimer = setTimeout(() => {
      this.visible = true;
      this.syncAria();
    }, this.delay);
  }

  private onTriggerLeave() {
    if (this.showTimer) {
      clearTimeout(this.showTimer);
      this.showTimer = null;
    }
    this.hideTimer = setTimeout(() => {
      this.visible = false;
      this.syncAria();
    }, 50);
  }

  private syncAria() {
    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement | null;
    const assigned = slot?.assignedElements({ flatten: true }) ?? [];
    for (const el of assigned) {
      if (this.visible) {
        el.setAttribute('aria-describedby', this.tooltipId);
      } else {
        el.removeAttribute('aria-describedby');
      }
    }
  }

  override render() {
    if (!this.content) {
      return html`<div class="trigger"><slot></slot></div>`;
    }

    return html`
      <div
        class="trigger"
        @mouseenter=${this.onTriggerEnter}
        @mouseleave=${this.onTriggerLeave}
        @focusin=${this.onTriggerEnter}
        @focusout=${this.onTriggerLeave}
      >
        <slot @slotchange=${this.syncAria}></slot>
      </div>
      <div
        id=${this.tooltipId}
        class="tooltip placement-${this.placement}"
        role="tooltip"
        data-visible=${this.visible ? 'true' : 'false'}
        ?hidden=${!this.visible}
      >
        ${this.content}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-tooltip': EdsTooltip;
  }
}
