import { describe, it, expect, beforeEach } from 'vitest';
import './eds-side-nav.js';
import type { EdsSideNav } from './eds-side-nav.js';
import { mount, resetDom, nextEvent, shadowQueryAll } from '../../test/helpers.js';

describe('eds-side-nav', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders a nav link for each top-level item', async () => {
    const el = await mount<EdsSideNav>('eds-side-nav', (node) => {
      node.items = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Reports', href: '/reports' },
      ];
    });

    const links = shadowQueryAll<HTMLAnchorElement>(el, 'a.item');
    expect(links).toHaveLength(2);
    expect(links[0].textContent).toContain('Dashboard');
  });

  it('emits eds-navigate when a leaf item is activated', async () => {
    const el = await mount<EdsSideNav>('eds-side-nav', (node) => {
      node.items = [{ label: 'Dashboard', href: '/dashboard' }];
    });

    const eventPromise = nextEvent<{ label: string; href?: string }>(el, 'eds-navigate');
    shadowQueryAll<HTMLAnchorElement>(el, 'a.item')[0].click();

    const event = await eventPromise;
    expect(event.detail.label).toBe('Dashboard');
    expect(event.detail.href).toBe('/dashboard');
  });

  it('expands nested sections without emitting eds-navigate', async () => {
    const el = await mount<EdsSideNav>('eds-side-nav', (node) => {
      node.items = [
        {
          label: 'Settings',
          children: [{ label: 'Profile', href: '/profile' }],
        },
      ];
    });

    let fired = false;
    el.addEventListener('eds-navigate', () => {
      fired = true;
    });

    shadowQueryAll<HTMLButtonElement>(el, 'button.item')[0].click();
    await el.updateComplete;

    expect(fired).toBe(false);
    expect(el.shadowRoot?.querySelector('.children')).toBeTruthy();
  });
});
