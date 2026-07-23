import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';
import './eds-popover.js';
import type { EdsPopover } from './eds-popover.js';

describe('eds-popover', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders trigger and panel with heading', async () => {
    const el = await mount<EdsPopover>('eds-popover', (node) => {
      node.heading = 'Details';
      node.innerHTML = `
        <button slot="trigger" type="button">Open</button>
        <p>Popover body</p>
      `;
    });

    expect(shadowQuery(el, '.trigger')).toBeTruthy();
    expect(shadowQuery(el, '.panel .heading').textContent).toBe('Details');
  });

  it('toggles open state when the trigger is clicked', async () => {
    const el = await mount<EdsPopover>('eds-popover', (node) => {
      node.innerHTML = '<button slot="trigger" type="button">Toggle</button><span>Body</span>';
    });

    shadowQuery<HTMLElement>(el, '.trigger').click();
    await el.updateComplete;
    expect(el.open).toBe(true);
    expect(shadowQuery(el, '.panel').getAttribute('data-open')).toBe('true');

    shadowQuery<HTMLElement>(el, '.trigger').click();
    await el.updateComplete;
    expect(el.open).toBe(false);
  });

  it('emits eds-open when opened via show()', async () => {
    const el = await mount<EdsPopover>('eds-popover', (node) => {
      node.innerHTML = '<button slot="trigger" type="button">Toggle</button>';
    });
    const openEvent = nextEvent(el, 'eds-open');

    el.show();
    await openEvent;

    expect(el.open).toBe(true);
  });

  it('reflects placement on the panel', async () => {
    const el = await mount<EdsPopover>('eds-popover', (node) => {
      node.placement = 'top';
      node.open = true;
      node.innerHTML = '<button slot="trigger" type="button">Toggle</button>';
    });

    expect(shadowQuery(el, '.panel').classList.contains('placement-top')).toBe(true);
  });

  it('closes via close(), Escape, and outside click', async () => {
    const el = await mount<EdsPopover>('eds-popover', (node) => {
      node.innerHTML = '<button slot="trigger" type="button">Toggle</button><span>Body</span>';
    });

    el.show();
    await el.updateComplete;
    el.close();
    await el.updateComplete;
    expect(el.open).toBe(false);

    el.show();
    await el.updateComplete;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;
    expect(el.open).toBe(false);

    el.show();
    await el.updateComplete;
    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    await el.updateComplete;
    expect(el.open).toBe(false);
  });
});
