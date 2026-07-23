import { describe, it, expect, beforeEach } from 'vitest';
import './eds-breadcrumb.js';
import type { EdsBreadcrumb } from './eds-breadcrumb.js';
import { mount, resetDom, shadowQuery, shadowQueryAll } from '../../test/helpers.js';

describe('eds-breadcrumb', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders items with links for non-current segments', async () => {
    const el = await mount<EdsBreadcrumb>('eds-breadcrumb', (node) => {
      node.items = [
        { label: 'Home', href: '/' },
        { label: 'Settings', href: '/settings' },
        { label: 'Profile' },
      ];
    });

    const links = shadowQueryAll<HTMLAnchorElement>(el, 'a');
    expect(links).toHaveLength(2);
    expect(links[0].href).toContain('/');
    expect(links[0].textContent).toBe('Home');
  });

  it('marks the last item as the current page', async () => {
    const el = await mount<EdsBreadcrumb>('eds-breadcrumb', (node) => {
      node.items = [
        { label: 'Home', href: '/' },
        { label: 'Profile' },
      ];
    });

    const current = shadowQuery(el, '[aria-current="page"]');
    expect(current.textContent).toBe('Profile');
  });

  it('falls back to the default slot when items are empty', async () => {
    const el = await mount<EdsBreadcrumb>('eds-breadcrumb', (node) => {
      const item = document.createElement('eds-breadcrumb-item');
      item.label = 'Custom';
      node.appendChild(item);
    });

    expect(shadowQuery(el, 'nav slot')).toBeTruthy();
    expect(el.querySelector('eds-breadcrumb-item')?.label).toBe('Custom');
  });
});
