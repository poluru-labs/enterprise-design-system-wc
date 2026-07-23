import { describe, it, expect, beforeEach } from 'vitest';
import './eds-card.js';
import type { EdsCard } from './eds-card.js';
import { mount, resetDom, shadowQuery } from '../../test/helpers.js';

describe('eds-card', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders an article with default padded layout', async () => {
    const el = await mount<EdsCard>('eds-card');

    expect(shadowQuery(el, 'article.card')).toBeTruthy();
    expect(el.padded).toBe(true);
    expect(el.elevated).toBe(false);
  });

  it('reflects elevated styling class when elevated', async () => {
    const el = await mount<EdsCard>('eds-card', (node) => {
      node.elevated = true;
    });

    expect(el.hasAttribute('elevated')).toBe(true);
    expect(shadowQuery(el, 'article.elevated')).toBeTruthy();
  });

  it('projects slotted body content', async () => {
    const el = await mount<EdsCard>('eds-card', (node) => {
      node.textContent = 'Card body';
    });

    expect(el.textContent?.trim()).toBe('Card body');
    expect(shadowQuery(el, '.body slot')).toBeTruthy();
  });
});
