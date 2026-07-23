import { LitElement, html, css } from 'lit';
import { customElement, property, query, queryAssignedElements, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { hostBase } from '../../foundations/shared.js';

/**
 * Individual tab panel. Place inside `eds-tabs`.
 *
 * @slot - Panel content
 *
 * @element eds-tab
 */
@customElement('eds-tab')
export class EdsTab extends LitElement {
  static override styles = css`
    :host {
      display: none;
    }

    :host([active]) {
      display: block;
    }

    .panel {
      padding-block: var(--eds-space-4);
      color: var(--eds-color-text);
      font-family: var(--eds-font-sans);
      font-size: var(--eds-font-size-md);
      line-height: var(--eds-line-height-relaxed);
    }
  `;

  @property({ reflect: true })
  label = '';

  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  override render() {
    return html`<div class="panel" role="tabpanel"><slot></slot></div>`;
  }
}

/**
 * Accessible tabs with keyboard support.
 *
 * @slot - One or more `eds-tab` children
 * @fires eds-tab-change - Fired when the selected tab changes
 *
 * @element eds-tabs
 */
@customElement('eds-tabs')
export class EdsTabs extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: block;
        width: 100%;
        max-width: 40rem;
      }

      .list {
        display: flex;
        gap: var(--eds-space-1);
        margin: 0;
        padding: 0;
        list-style: none;
        border-bottom: 1px solid var(--eds-color-border);
      }

      .tab {
        position: relative;
        appearance: none;
        margin: 0;
        padding: var(--eds-space-3) var(--eds-space-4);
        border: 0;
        background: transparent;
        color: var(--eds-color-text-muted);
        font: inherit;
        font-weight: var(--eds-font-weight-semibold);
        font-size: var(--eds-font-size-sm);
        cursor: pointer;
        border-radius: var(--eds-radius-md) var(--eds-radius-md) 0 0;
        transition:
          color var(--eds-duration-fast) var(--eds-easing-standard),
          background-color var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .tab:hover:not(:disabled) {
        color: var(--eds-color-text);
        background: var(--eds-color-ink-50);
      }

      .tab:focus-visible {
        outline: none;
        box-shadow: var(--eds-shadow-focus);
      }

      .tab[aria-selected='true'] {
        color: var(--eds-color-primary);
      }

      .tab[aria-selected='true']::after {
        content: '';
        position: absolute;
        left: var(--eds-space-3);
        right: var(--eds-space-3);
        bottom: -1px;
        height: 2px;
        background: var(--eds-color-primary);
        border-radius: var(--eds-radius-full);
      }

      .tab:disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }
    `,
  ];

  @property({ type: Number, attribute: 'selected-index' })
  selectedIndex = 0;

  @queryAssignedElements({ selector: 'eds-tab' })
  private tabs!: EdsTab[];

  @query('[role="tablist"]')
  private tabList!: HTMLElement;

  @state()
  private privateTabs: EdsTab[] = [];

  override firstUpdated() {
    this.syncFromSlot();
  }

  private syncFromSlot() {
    this.privateTabs = [...this.tabs];
    this.applySelection(this.selectedIndex, false);
  }

  private applySelection(index: number, emit: boolean) {
    if (!this.privateTabs.length) return;

    const enabled = this.privateTabs
      .map((tab, i) => ({ tab, i }))
      .filter(({ tab }) => !tab.disabled);

    const fallback = enabled[0]?.i ?? 0;
    const next = this.privateTabs[index]?.disabled ? fallback : index;

    this.privateTabs.forEach((tab, i) => {
      tab.active = i === next;
    });

    if (this.selectedIndex !== next) {
      this.selectedIndex = next;
    }

    if (emit) {
      this.dispatchEvent(
        new CustomEvent('eds-tab-change', {
          detail: { index: next, label: this.privateTabs[next]?.label },
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  private select(index: number) {
    this.applySelection(index, true);
  }

  private onKeyDown(event: KeyboardEvent) {
    const enabledIndexes = this.privateTabs
      .map((tab, i) => ({ tab, i }))
      .filter(({ tab }) => !tab.disabled)
      .map(({ i }) => i);

    if (!enabledIndexes.length) return;

    const currentPos = enabledIndexes.indexOf(this.selectedIndex);
    let nextPos = currentPos;

    switch (event.key) {
      case 'ArrowRight':
        nextPos = (currentPos + 1) % enabledIndexes.length;
        break;
      case 'ArrowLeft':
        nextPos = (currentPos - 1 + enabledIndexes.length) % enabledIndexes.length;
        break;
      case 'Home':
        nextPos = 0;
        break;
      case 'End':
        nextPos = enabledIndexes.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    this.select(enabledIndexes[nextPos]);
    const buttons = this.tabList?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[enabledIndexes[nextPos]]?.focus();
  }

  override render() {
    return html`
      <div
        class="list"
        role="tablist"
        @keydown=${this.onKeyDown}
      >
        ${this.privateTabs.map(
          (tab, index) => html`
            <button
              class=${classMap({ tab: true })}
              role="tab"
              type="button"
              id=${`eds-tab-${index}`}
              aria-selected=${tab.active ? 'true' : 'false'}
              aria-controls=${`eds-panel-${index}`}
              tabindex=${tab.active ? 0 : -1}
              ?disabled=${tab.disabled}
              @click=${() => this.select(index)}
            >
              ${tab.label || `Tab ${index + 1}`}
            </button>
          `,
        )}
      </div>
      <div @slotchange=${this.syncFromSlot}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-tabs': EdsTabs;
    'eds-tab': EdsTab;
  }
}
