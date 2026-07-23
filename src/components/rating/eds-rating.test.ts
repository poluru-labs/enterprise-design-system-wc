import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQueryAll } from '../../test/helpers.js';
import './eds-rating.js';
import type { EdsRating } from './eds-rating.js';

describe('eds-rating', () => {
  beforeEach(() => resetDom());

  it('renders the configured number of stars', async () => {
    const el = await mount<EdsRating>('eds-rating', (el) => {
      el.max = 5;
      el.value = 0;
    });

    expect(shadowQueryAll<HTMLButtonElement>(el, 'button.star').length).toBe(5);
  });

  it('reflects the current value', async () => {
    const el = await mount<EdsRating>('eds-rating', (el) => {
      el.value = 3;
    });

    const filled = shadowQueryAll<HTMLButtonElement>(el, 'button.star[data-filled="true"]');
    expect(filled.length).toBe(3);
  });

  it('emits eds-change when a star is clicked', async () => {
    const el = await mount<EdsRating>('eds-rating');
    const stars = shadowQueryAll<HTMLButtonElement>(el, 'button.star');
    const changePromise = nextEvent<{ value: number }>(el, 'eds-change');

    stars[2].click();

    const event = await changePromise;
    expect(event.detail.value).toBe(3);
    expect(el.value).toBe(3);
  });
});
