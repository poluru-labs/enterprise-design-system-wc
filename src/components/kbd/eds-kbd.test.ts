import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, shadowQuery } from '../../test/helpers.js';
import './eds-kbd.js';
import type { EdsKbd } from './eds-kbd.js';

describe('eds-kbd', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders keys from the keys property', async () => {
    const el = await mount<EdsKbd>('eds-kbd', (node) => {
      node.keys = 'Ctrl + K';
    });

    expect(shadowQuery(el, 'kbd').textContent?.trim()).toBe('Ctrl + K');
  });

  it('renders slotted shortcut text when keys is empty', async () => {
    const el = await mount<EdsKbd>('eds-kbd', (node) => {
      node.textContent = 'Esc';
    });
    await el.updateComplete;

    const slot = shadowQuery<HTMLSlotElement>(el, 'slot');
    expect(slot.assignedNodes()[0]?.textContent?.trim()).toBe('Esc');
  });
});
