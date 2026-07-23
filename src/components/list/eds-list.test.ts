import { describe, it, expect, beforeEach } from 'vitest';
import './eds-list.js';
import type { EdsList } from './eds-list.js';
import { mount, resetDom, nextEvent, shadowQuery, shadowQueryAll } from '../../test/helpers.js';

describe('eds-list', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders list items from the items prop', async () => {
    const el = await mount<EdsList>('eds-list', (node) => {
      node.items = [
        { label: 'Inbox', description: '12 unread' },
        { label: 'Drafts' },
      ];
    });

    expect(shadowQuery(el, '[role="list"]')).toBeTruthy();
    expect(el.shadowRoot?.querySelectorAll('eds-list-item')).toHaveLength(2);
  });

  it('emits eds-select and updates selectedIndex when an item is chosen', async () => {
    const el = await mount<EdsList>('eds-list', (node) => {
      node.items = [{ label: 'Inbox' }, { label: 'Drafts' }];
    });

    const eventPromise = nextEvent<{ label: string; index?: number }>(el, 'eds-select');
    const secondItem = el.shadowRoot?.querySelectorAll('eds-list-item')[1];
    secondItem?.shadowRoot?.querySelector<HTMLButtonElement>('button.item')?.click();

    const event = await eventPromise;
    expect(event.detail.label).toBe('Drafts');
    expect(event.detail.index).toBe(1);
    expect(el.selectedIndex).toBe(1);
  });

  it('reflects divided styling when divided is set', async () => {
    const el = await mount<EdsList>('eds-list', (node) => {
      node.divided = true;
      node.items = [{ label: 'One' }, { label: 'Two' }];
    });

    expect(el.hasAttribute('divided')).toBe(true);
    expect(shadowQueryAll(el, '.item-row')).toHaveLength(2);
  });

  it('renders link items, icons, and slotted children', async () => {
    const linked = await mount<EdsList>('eds-list', (node) => {
      node.items = [
        { label: 'Docs', href: 'https://example.com', icon: 'external-link' as never },
      ];
    });
    const linkItem = linked.shadowRoot?.querySelector('eds-list-item');
    expect(linkItem?.shadowRoot?.querySelector('a.item')).toBeTruthy();

    const slotted = await mount<EdsList>('eds-list', (node) => {
      node.innerHTML = `<eds-list-item label="Slotted"></eds-list-item>`;
    });
    expect(shadowQuery(slotted, '[role="list"]')).toBeTruthy();
    expect(slotted.querySelector('eds-list-item')).toBeTruthy();

    const disabled = document.createElement('eds-list-item') as HTMLElement & {
      label: string;
      disabled: boolean;
      updateComplete: Promise<boolean>;
    };
    disabled.label = 'Locked';
    disabled.disabled = true;
    document.body.appendChild(disabled);
    await disabled.updateComplete;
    let fired = false;
    disabled.addEventListener('eds-select', () => {
      fired = true;
    });
    disabled.shadowRoot?.querySelector<HTMLButtonElement>('button.item')?.click();
    expect(fired).toBe(false);
  });
});
