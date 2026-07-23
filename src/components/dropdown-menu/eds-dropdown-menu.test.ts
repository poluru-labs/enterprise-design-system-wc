import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';
import './eds-dropdown-menu.js';
import type { EdsDropdownMenu } from './eds-dropdown-menu.js';

async function mountMenu(setup?: (el: EdsDropdownMenu) => void) {
  const el = await mount<EdsDropdownMenu>('eds-dropdown-menu', (menu) => {
    menu.innerHTML = `
      <button slot="trigger" type="button">Actions</button>
      <eds-menu-item label="Edit" value="edit"></eds-menu-item>
      <eds-menu-item label="Delete" value="delete" danger></eds-menu-item>
    `;
    setup?.(menu);
  });
  await el.updateComplete;
  return el;
}

describe('eds-dropdown-menu', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders trigger and closed menu by default', async () => {
    const el = await mountMenu();

    expect(shadowQuery(el, '.trigger')).toBeTruthy();
    expect(el.open).toBe(false);
    expect(shadowQuery(el, '.menu').getAttribute('data-open')).toBe('false');
  });

  it('opens when the trigger area is clicked', async () => {
    const el = await mountMenu();

    shadowQuery<HTMLElement>(el, '.trigger').click();
    await el.updateComplete;

    expect(el.open).toBe(true);
    expect(shadowQuery(el, '.menu').getAttribute('data-open')).toBe('true');
  });

  it('emits eds-select when a menu item is chosen', async () => {
    const el = await mountMenu();
    const select = nextEvent<{ value: string; label: string }>(el, 'eds-select');
    el.open = true;
    await el.updateComplete;

    const item = el.querySelector('eds-menu-item[value="edit"]')!;
    shadowQuery<HTMLButtonElement>(item, 'button').click();
    const event = await select;

    expect(event.detail.value).toBe('edit');
    expect(event.detail.label).toBe('Edit');
    expect(el.open).toBe(false);
  });

  it('reflects placement on the menu panel', async () => {
    const el = await mountMenu((menu) => {
      menu.placement = 'top';
      menu.open = true;
    });

    expect(shadowQuery(el, '.menu').classList.contains('placement-top')).toBe(true);
  });

  it('supports show/close and Escape, arrow keys, and outside click', async () => {
    const el = await mountMenu();
    el.show();
    await el.updateComplete;
    expect(el.open).toBe(true);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;
    expect(el.open).toBe(false);

    el.show();
    await el.updateComplete;
    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    await el.updateComplete;
    expect(el.open).toBe(false);
  });

  it('activates the focused item with Enter and ignores disabled items', async () => {
    const el = await mount<EdsDropdownMenu>('eds-dropdown-menu', (menu) => {
      menu.innerHTML = `
        <button slot="trigger" type="button">Actions</button>
        <eds-menu-item label="Edit" value="edit"></eds-menu-item>
        <eds-menu-item label="Lock" value="lock" disabled></eds-menu-item>
        <eds-menu-item label="Delete" value="delete" icon="trash"></eds-menu-item>
      `;
    });
    await el.updateComplete;

    el.show();
    await el.updateComplete;

    const select = nextEvent<{ value: string }>(el, 'eds-select');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect((await select).detail.value).toBe('edit');

    const disabled = el.querySelector('eds-menu-item[value="lock"]')!;
    let fired = false;
    disabled.addEventListener('eds-menu-item-select', () => {
      fired = true;
    });
    shadowQuery<HTMLButtonElement>(disabled as never, 'button').click();
    expect(fired).toBe(false);
  });
});
