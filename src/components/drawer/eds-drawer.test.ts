import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';
import './eds-drawer.js';
import type { EdsDrawer } from './eds-drawer.js';

describe('eds-drawer', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders the panel when open', async () => {
    const el = await mount<EdsDrawer>('eds-drawer', (node) => {
      node.open = true;
      node.heading = 'Settings';
      node.side = 'left';
      node.size = 'lg';
    });

    const panel = shadowQuery<HTMLElement>(el, '.panel');
    expect(panel.classList.contains('side-left')).toBe(true);
    expect(panel.classList.contains('lg')).toBe(true);
    expect(shadowQuery(el, '.title').textContent).toBe('Settings');
  });

  it('reflects side and size props on the panel', async () => {
    const el = await mount<EdsDrawer>('eds-drawer', (node) => {
      node.open = true;
      node.side = 'right';
      node.size = 'sm';
    });

    const panel = shadowQuery<HTMLElement>(el, '.panel');
    expect(panel.classList.contains('side-right')).toBe(true);
    expect(panel.classList.contains('sm')).toBe(true);
  });

  it('emits eds-open and eds-close when toggled', async () => {
    const el = await mount<EdsDrawer>('eds-drawer');
    const openEvent = nextEvent(el, 'eds-open');
    const closeEvent = nextEvent(el, 'eds-close');

    el.show();
    await openEvent;
    el.close();
    await closeEvent;

    expect(el.open).toBe(false);
  });

  it('closes when the close button is clicked', async () => {
    const el = await mount<EdsDrawer>('eds-drawer', (node) => {
      node.open = true;
    });

    shadowQuery<HTMLButtonElement>(el, '.close').click();
    await el.updateComplete;

    expect(el.open).toBe(false);
  });

  it('closes on Escape and when the backdrop is clicked', async () => {
    const el = await mount<EdsDrawer>('eds-drawer', (node) => {
      node.open = true;
    });
    await el.updateComplete;

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;
    expect(el.open).toBe(false);

    el.show();
    await el.updateComplete;
    const backdrop = shadowQuery<HTMLElement>(el, '.backdrop');
    backdrop.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await el.updateComplete;
    expect(el.open).toBe(false);
  });
});
