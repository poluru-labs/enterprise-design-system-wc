import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, shadowQuery } from '../../test/helpers.js';
import './eds-badge.js';
import type { EdsBadge } from './eds-badge.js';

describe('eds-badge', () => {
  beforeEach(() => resetDom());

  it('renders with default variant', async () => {
    const el = await mount<EdsBadge>('eds-badge', (el) => {
      el.label = 'New';
    });

    expect(el.variant).toBe('neutral');
    expect(shadowQuery<HTMLSpanElement>(el, '.badge').textContent?.trim()).toBe('New');
  });

  it('reflects a custom variant', async () => {
    const el = await mount<EdsBadge>('eds-badge', (el) => {
      el.label = 'Beta';
      el.variant = 'info';
    });

    expect(el.variant).toBe('info');
    expect(shadowQuery<HTMLSpanElement>(el, '.badge').textContent?.trim()).toBe('Beta');
  });
});
