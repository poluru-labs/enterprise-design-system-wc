import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, shadowQuery, shadowQueryAll } from '../../test/helpers.js';
import './eds-skeleton.js';
import type { EdsSkeleton } from './eds-skeleton.js';

describe('eds-skeleton', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders a text skeleton by default', async () => {
    const el = await mount<EdsSkeleton>('eds-skeleton');

    expect(el.variant).toBe('text');
    expect(shadowQuery(el, '.skeleton.text')).toBeTruthy();
  });

  it('renders multiple text lines when lines is greater than one', async () => {
    const el = await mount<EdsSkeleton>('eds-skeleton', (node) => {
      node.lines = 3;
    });

    const lines = shadowQueryAll(el, '.skeleton.text');
    expect(lines).toHaveLength(3);
    expect(lines[2].getAttribute('style')).toContain('75%');
  });

  it('applies circular variant dimensions', async () => {
    const el = await mount<EdsSkeleton>('eds-skeleton', (node) => {
      node.variant = 'circular';
      node.width = '3rem';
      node.height = '3rem';
    });

    const skeleton = shadowQuery<HTMLElement>(el, '.skeleton.circular');
    expect(skeleton.style.width).toBe('3rem');
    expect(skeleton.style.height).toBe('3rem');
  });
});
