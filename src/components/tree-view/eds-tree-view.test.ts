import { describe, it, expect, beforeEach } from 'vitest';
import './eds-tree-view.js';
import type { EdsTreeView } from './eds-tree-view.js';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';

describe('eds-tree-view', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders empty state when items are missing', async () => {
    const el = await mount<EdsTreeView>('eds-tree-view');

    expect(shadowQuery(el, '.empty').textContent?.trim()).toBe('No items');
  });

  it('renders tree items from the items prop', async () => {
    const el = await mount<EdsTreeView>('eds-tree-view', (node) => {
      node.items = [
        { id: 'a', label: 'Alpha' },
        { id: 'b', label: 'Beta' },
      ];
    });

    expect(shadowQuery(el, '[role="tree"]')).toBeTruthy();
    expect(el.shadowRoot?.querySelectorAll('eds-tree-item')).toHaveLength(2);
  });

  it('emits eds-select when a node is activated', async () => {
    const el = await mount<EdsTreeView>('eds-tree-view', (node) => {
      node.items = [{ id: 'a', label: 'Alpha' }];
    });

    const eventPromise = nextEvent<{ id: string }>(el, 'eds-select');
    const item = el.shadowRoot?.querySelector('eds-tree-item');
    item?.shadowRoot?.querySelector<HTMLElement>('.row')?.click();

    const event = await eventPromise;
    expect(event.detail.id).toBe('a');
    expect(el.selectedId).toBe('a');
  });

  it('emits eds-toggle when expanding a parent node', async () => {
    const el = await mount<EdsTreeView>('eds-tree-view', (node) => {
      node.items = [
        {
          id: 'parent',
          label: 'Parent',
          children: [{ id: 'child', label: 'Child' }],
        },
      ];
    });

    const eventPromise = nextEvent<{ id: string; expanded: boolean }>(el, 'eds-toggle');
    const parent = el.shadowRoot?.querySelector('eds-tree-item');
    parent?.shadowRoot?.querySelector<HTMLButtonElement>('button.toggle')?.click();

    const event = await eventPromise;
    expect(event.detail.id).toBe('parent');
    expect(event.detail.expanded).toBe(true);
  });

  it('supports keyboard select and expand/collapse', async () => {
    const el = await mount<EdsTreeView>('eds-tree-view', (node) => {
      node.items = [
        {
          id: 'parent',
          label: 'Parent',
          children: [{ id: 'child', label: 'Child' }],
        },
      ];
    });

    const parent = el.shadowRoot?.querySelector('eds-tree-item');
    const row = parent?.shadowRoot?.querySelector<HTMLElement>('.row');
    expect(row).toBeTruthy();

    const selectPromise = nextEvent<{ id: string }>(el, 'eds-select');
    row!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect((await selectPromise).detail.id).toBe('parent');

    const expandPromise = nextEvent<{ id: string; expanded: boolean }>(el, 'eds-toggle');
    row!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect((await expandPromise).detail.expanded).toBe(true);

    await el.updateComplete;
    const collapsePromise = nextEvent<{ id: string; expanded: boolean }>(el, 'eds-toggle');
    row!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    expect((await collapsePromise).detail.expanded).toBe(false);
  });
});
