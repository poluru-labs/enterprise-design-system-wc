import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';
import './eds-link.js';
import type { EdsLink } from './eds-link.js';

describe('eds-link', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders anchor with href and slotted text', async () => {
    const el = await mount<EdsLink>('eds-link', (node) => {
      node.href = '/docs';
      node.textContent = 'Documentation';
    });
    await el.updateComplete;

    const anchor = shadowQuery<HTMLAnchorElement>(el, 'a.link.default');
    const slot = shadowQuery<HTMLSlotElement>(el, 'slot');
    expect(anchor.getAttribute('href')).toBe('/docs');
    expect(slot.assignedNodes()[0]?.textContent?.trim()).toBe('Documentation');
  });

  it('sets external target and rel when external is true', async () => {
    const el = await mount<EdsLink>('eds-link', (node) => {
      node.href = 'https://example.com';
      node.external = true;
      node.textContent = 'Example';
    });

    const anchor = shadowQuery<HTMLAnchorElement>(el, 'a');
    expect(anchor.getAttribute('target')).toBe('_blank');
    expect(anchor.getAttribute('rel')).toBe('noopener noreferrer');
    expect(shadowQuery(el, 'eds-icon.external-icon')).toBeTruthy();
  });

  it('emits eds-click when activated', async () => {
    const el = await mount<EdsLink>('eds-link', (node) => {
      node.href = '/home';
      node.textContent = 'Home';
    });
    const click = nextEvent(el, 'eds-click');

    shadowQuery<HTMLAnchorElement>(el, 'a').click();
    await click;

    expect(true).toBe(true);
  });

  it('marks the anchor as disabled when disabled is true', async () => {
    const el = await mount<EdsLink>('eds-link', (node) => {
      node.disabled = true;
      node.textContent = 'Unavailable';
    });

    const anchor = shadowQuery<HTMLAnchorElement>(el, 'a');
    expect(anchor.getAttribute('aria-disabled')).toBe('true');
    expect(anchor.getAttribute('tabindex')).toBe('-1');
  });
});
