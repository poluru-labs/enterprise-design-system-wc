import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query, queryAssignedElements, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { hostBase } from '../../foundations/shared.js';
import type { EdsIconName } from '../../icons/paths.js';
import '../icon/eds-icon.js';

export type EdsDropdownMenuPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Individual menu item for `eds-dropdown-menu`.
 *
 * @slot - Item label (overrides `label` prop when provided)
 *
 * @element eds-menu-item
 */
@customElement('eds-menu-item')
export class EdsMenuItem extends LitElement {
  static override styles = [
    hostBase,
    css`
      :host {
        display: block;
      }

      .item {
        display: flex;
        align-items: center;
        gap: var(--eds-space-2);
        width: 100%;
        margin: 0;
        padding: var(--eds-space-2) var(--eds-space-3);
        border: 0;
        border-radius: var(--eds-radius-sm);
        background: transparent;
        color: var(--eds-color-text);
        font: inherit;
        font-size: var(--eds-font-size-md);
        text-align: left;
        cursor: pointer;
        transition:
          background-color var(--eds-duration-fast) var(--eds-easing-standard),
          color var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .item-icon {
        display: inline-flex;
        line-height: 0;
        flex-shrink: 0;
        color: var(--eds-color-text-muted);
      }

      .item:hover:not(:disabled) .item-icon,
      .item[data-active='true']:not(:disabled) .item-icon {
        color: inherit;
      }

      .item:hover:not(:disabled),
      .item[data-active='true']:not(:disabled) {
        background: var(--eds-color-brand-50);
        color: var(--eds-color-primary);
      }

      .item:focus-visible {
        outline: none;
        box-shadow: var(--eds-shadow-focus);
      }

      .item:disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }

      .item.danger {
        color: var(--eds-color-danger-600);
      }

      .item.danger:hover:not(:disabled),
      .item.danger[data-active='true']:not(:disabled) {
        background: var(--eds-color-danger-100);
        color: var(--eds-color-danger-600);
      }
    `,
  ];

  @property()
  label = '';

  @property()
  value = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  danger = false;

  @property({ type: Boolean, reflect: true })
  active = false;

  /** Leading icon name. */
  @property()
  icon: EdsIconName | '' = '';

  private handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.dispatchEvent(
      new CustomEvent('eds-menu-item-select', {
        detail: {
          value: this.value,
          label: this.label || this.textContent?.trim() || '',
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <button
        class=${classMap({ item: true, danger: this.danger })}
        type="button"
        role="menuitem"
        ?disabled=${this.disabled}
        data-active=${this.active ? 'true' : 'false'}
        tabindex=${this.active ? '0' : '-1'}
        @click=${this.handleClick}
      >
        ${this.icon
          ? html`<span class="item-icon"><eds-icon name=${this.icon} size="sm"></eds-icon></span>`
          : nothing}
        <slot>${this.label}</slot>
      </button>
    `;
  }
}

/**
 * Accessible dropdown menu with keyboard navigation.
 *
 * @slot trigger - Element that toggles the menu
 * @slot - `eds-menu-item` children
 * @fires eds-select - Fired when a menu item is selected (`detail.value`, `detail.label`)
 *
 * @element eds-dropdown-menu
 */
@customElement('eds-dropdown-menu')
export class EdsDropdownMenu extends LitElement {
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

      .menu {
        position: absolute;
        z-index: 1050;
        min-width: 11rem;
        margin: 0;
        padding: var(--eds-space-1);
        list-style: none;
        border: 1px solid var(--eds-color-border-strong);
        border-radius: var(--eds-radius-md);
        background: var(--eds-color-surface);
        box-shadow: var(--eds-shadow-md);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translateY(4px);
        transition:
          opacity var(--eds-duration-fast) var(--eds-easing-standard),
          visibility var(--eds-duration-fast) var(--eds-easing-standard),
          transform var(--eds-duration-fast) var(--eds-easing-emphasized);
      }

      .menu[data-open='true'] {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateY(0);
      }

      .menu.placement-bottom {
        top: calc(100% + var(--eds-space-1));
        left: 0;
      }

      .menu.placement-top {
        bottom: calc(100% + var(--eds-space-1));
        left: 0;
        transform: translateY(-4px);
      }

      .menu.placement-top[data-open='true'] {
        transform: translateY(0);
      }

      .menu.placement-left {
        right: calc(100% + var(--eds-space-1));
        top: 0;
        transform: translateX(-4px);
      }

      .menu.placement-left[data-open='true'] {
        transform: translateX(0);
      }

      .menu.placement-right {
        left: calc(100% + var(--eds-space-1));
        top: 0;
        transform: translateX(4px);
      }

      .menu.placement-right[data-open='true'] {
        transform: translateX(0);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ reflect: true })
  placement: EdsDropdownMenuPlacement = 'bottom';

  @query('slot[name="trigger"]')
  private triggerSlot!: HTMLSlotElement;

  @queryAssignedElements()
  private menuItems!: Array<EdsMenuItem>;

  @state()
  private activeIndex = -1;

  private menuId = `eds-dropdown-menu-${Math.random().toString(36).slice(2, 9)}`;
  private triggerId = `eds-dropdown-trigger-${Math.random().toString(36).slice(2, 9)}`;
  private boundDocumentClick = (event: MouseEvent) => this.onDocumentClick(event);
  private boundDocumentKeyDown = (event: KeyboardEvent) => this.onDocumentKeyDown(event);

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('mousedown', this.boundDocumentClick);
    document.addEventListener('keydown', this.boundDocumentKeyDown);
    this.addEventListener('eds-menu-item-select', this.onMenuItemSelect as EventListener);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('mousedown', this.boundDocumentClick);
    document.removeEventListener('keydown', this.boundDocumentKeyDown);
    this.removeEventListener('eds-menu-item-select', this.onMenuItemSelect as EventListener);
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('open')) {
      this.syncTriggerAria();
      if (this.open) {
        this.setActiveIndex(this.getEnabledItems()[0] ? 0 : -1);
        queueMicrotask(() => this.focusActiveItem());
      } else {
        this.setActiveIndex(-1);
      }
    }
  }

  private getEnabledItems(): EdsMenuItem[] {
    return this.menuItems.filter((item) => !item.disabled);
  }

  private setActiveIndex(index: number) {
    const enabled = this.getEnabledItems();
    this.activeIndex = index;
    for (const item of this.menuItems) {
      item.active = enabled[index] === item;
    }
  }

  private focusActiveItem() {
    const enabled = this.getEnabledItems();
    enabled[this.activeIndex]?.shadowRoot?.querySelector('button')?.focus();
  }

  private syncTriggerAria() {
    const triggers = this.triggerSlot?.assignedElements({ flatten: true }) ?? [];
    for (const el of triggers) {
      el.setAttribute('aria-haspopup', 'menu');
      el.setAttribute('aria-expanded', this.open ? 'true' : 'false');
      el.setAttribute('aria-controls', this.menuId);
      if (!el.id) el.id = this.triggerId;
    }
  }

  private onTriggerClick(event: Event) {
    event.stopPropagation();
    this.toggle();
  }

  private toggle() {
    this.open = !this.open;
  }

  /** Opens the menu. */
  show() {
    this.open = true;
  }

  /** Closes the menu. */
  close() {
    this.open = false;
  }

  private onDocumentClick(event: MouseEvent) {
    if (!this.open) return;
    const path = event.composedPath();
    if (path.includes(this)) return;
    this.close();
  }

  private onDocumentKeyDown(event: KeyboardEvent) {
    if (!this.open) return;

    const enabled = this.getEnabledItems();
    if (!enabled.length) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = this.activeIndex < enabled.length - 1 ? this.activeIndex + 1 : 0;
      this.setActiveIndex(next);
      this.focusActiveItem();
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prev = this.activeIndex > 0 ? this.activeIndex - 1 : enabled.length - 1;
      this.setActiveIndex(prev);
      this.focusActiveItem();
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      const active = enabled[this.activeIndex];
      if (active) {
        event.preventDefault();
        active.shadowRoot?.querySelector('button')?.click();
      }
    }
  }

  private onMenuItemSelect = (event: CustomEvent<{ value: string; label: string }>) => {
    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('eds-select', {
        detail: event.detail,
        bubbles: true,
        composed: true,
      }),
    );
    this.close();
  };

  override render() {
    return html`
      <div class="trigger" @click=${this.onTriggerClick}>
        <slot name="trigger" @slotchange=${() => this.syncTriggerAria()}></slot>
      </div>
      <div
        id=${this.menuId}
        class="menu placement-${this.placement}"
        role="menu"
        data-open=${this.open ? 'true' : 'false'}
        ?hidden=${!this.open}
      >
        <slot @slotchange=${() => this.requestUpdate()}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eds-dropdown-menu': EdsDropdownMenu;
    'eds-menu-item': EdsMenuItem;
  }
}
