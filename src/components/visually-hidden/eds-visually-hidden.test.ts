import { describe, it, expect, beforeEach } from 'vitest';
import './eds-visually-hidden.js';
import type { EdsVisuallyHidden } from './eds-visually-hidden.js';
import { mount, resetDom, shadowQuery } from '../../test/helpers.js';

describe('eds-visually-hidden', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders a visually hidden wrapper with a default slot', async () => {
    const el = await mount<EdsVisuallyHidden>('eds-visually-hidden', (node) => {
      node.textContent = 'Screen reader only';
    });

    expect(shadowQuery(el, 'span.visually-hidden')).toBeTruthy();
    expect(shadowQuery(el, 'slot')).toBeTruthy();
  });

  it('keeps slotted text in the light DOM', async () => {
    const el = await mount<EdsVisuallyHidden>('eds-visually-hidden', (node) => {
      node.textContent = 'Hidden label';
    });

    expect(el.textContent?.trim()).toBe('Hidden label');
  });

  it('applies off-screen styles to the wrapper', async () => {
    const el = await mount<EdsVisuallyHidden>('eds-visually-hidden');
    const wrapper = shadowQuery(el, 'span.visually-hidden');

    expect(getComputedStyle(wrapper).position).toBe('absolute');
    expect(getComputedStyle(wrapper).width).toBe('1px');
  });
});
