import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery, shadowQueryAll } from '../../test/helpers.js';
import './eds-tabs.js';
import type { EdsTabs, EdsTab } from './eds-tabs.js';

async function mountTabs(setup?: (el: EdsTabs) => void) {
  const el = await mount<EdsTabs>('eds-tabs', (tabs) => {
    tabs.innerHTML = `
      <eds-tab label="First">Panel one</eds-tab>
      <eds-tab label="Second">Panel two</eds-tab>
    `;
    setup?.(tabs);
  });
  const tabPanels = [...el.querySelectorAll('eds-tab')] as EdsTab[];
  await Promise.all(tabPanels.map((tab) => tab.updateComplete));
  await el.updateComplete;
  return { el, tabPanels };
}

describe('eds-tabs', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders tab buttons from slotted eds-tab children', async () => {
    const { el } = await mountTabs();

    const buttons = shadowQueryAll<HTMLButtonElement>(el, '[role="tab"]');
    expect(buttons).toHaveLength(2);
    expect(buttons[0].textContent?.trim()).toBe('First');
  });

  it('activates the first tab by default', async () => {
    const { el, tabPanels } = await mountTabs();

    expect(el.selectedIndex).toBe(0);
    expect(tabPanels[0].active).toBe(true);
    expect(shadowQuery<HTMLButtonElement>(el, '[role="tab"]').getAttribute('aria-selected')).toBe('true');
  });

  it('switches tabs when a tab button is clicked', async () => {
    const { el, tabPanels } = await mountTabs();
    const buttons = shadowQueryAll<HTMLButtonElement>(el, '[role="tab"]');

    buttons[1].click();
    await el.updateComplete;
    await tabPanels[1].updateComplete;

    expect(el.selectedIndex).toBe(1);
    expect(tabPanels[1].active).toBe(true);
  });

  it('emits eds-tab-change when selection changes', async () => {
    const { el } = await mountTabs();
    const change = nextEvent<{ index: number; label: string }>(el, 'eds-tab-change');
    const buttons = shadowQueryAll<HTMLButtonElement>(el, '[role="tab"]');

    buttons[1].click();
    const event = await change;

    expect(event.detail.index).toBe(1);
    expect(event.detail.label).toBe('Second');
  });

  it('navigates tabs with arrow, Home, and End keys', async () => {
    const { el } = await mountTabs();
    const list = shadowQuery<HTMLElement>(el, '[role="tablist"]');
    const buttons = shadowQueryAll<HTMLButtonElement>(el, '[role="tab"]');

    buttons[0].focus();
    list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await el.updateComplete;
    expect(el.selectedIndex).toBe(1);

    list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await el.updateComplete;
    expect(el.selectedIndex).toBe(0);

    list.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    await el.updateComplete;
    expect(el.selectedIndex).toBe(1);

    list.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    await el.updateComplete;
    expect(el.selectedIndex).toBe(0);
  });

  it('skips disabled tabs during keyboard navigation', async () => {
    const el = await mount<EdsTabs>('eds-tabs', (tabs) => {
      tabs.innerHTML = `
        <eds-tab label="First">One</eds-tab>
        <eds-tab label="Second" disabled>Two</eds-tab>
        <eds-tab label="Third">Three</eds-tab>
      `;
    });
    await Promise.all(
      [...el.querySelectorAll('eds-tab')].map((tab) => (tab as EdsTab).updateComplete),
    );
    await el.updateComplete;

    const list = shadowQuery<HTMLElement>(el, '[role="tablist"]');
    list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await el.updateComplete;

    expect(el.selectedIndex).toBe(2);
  });
});
