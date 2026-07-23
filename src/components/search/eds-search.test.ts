import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';
import './eds-search.js';
import type { EdsSearch } from './eds-search.js';

describe('eds-search', () => {
  beforeEach(() => resetDom());

  it('renders a search input with default placeholder', async () => {
    const el = await mount<EdsSearch>('eds-search');

    const input = shadowQuery<HTMLInputElement>(el, 'input.control');
    expect(input.type).toBe('search');
    expect(input.placeholder).toBe('Search…');
  });

  it('emits eds-input when typing', async () => {
    const el = await mount<EdsSearch>('eds-search');
    const input = shadowQuery<HTMLInputElement>(el, 'input.control');
    const inputPromise = nextEvent<{ value: string }>(el, 'eds-input');

    input.value = 'query';
    input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));

    const event = await inputPromise;
    expect(event.detail.value).toBe('query');
    expect(el.value).toBe('query');
  });

  it('emits eds-clear when the clear button is clicked', async () => {
    const el = await mount<EdsSearch>('eds-search', (el) => {
      el.value = 'query';
    });

    await el.updateComplete;
    const clearPromise = nextEvent(el, 'eds-clear');
    shadowQuery<HTMLButtonElement>(el, 'button.clear').click();

    const event = await clearPromise;
    expect(event.type).toBe('eds-clear');
    expect(el.value).toBe('');
  });
});
