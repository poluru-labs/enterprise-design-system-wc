import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';
import './eds-autocomplete.js';
import type { EdsAutocomplete } from './eds-autocomplete.js';

describe('eds-autocomplete', () => {
  beforeEach(() => resetDom());

  it('renders an autocomplete input', async () => {
    const el = await mount<EdsAutocomplete>('eds-autocomplete', (el) => {
      el.label = 'City';
      el.placeholder = 'Search cities';
    });

    expect(shadowQuery<HTMLInputElement>(el, 'input.control').placeholder).toBe('Search cities');
  });

  it('shows filtered suggestions while typing', async () => {
    const el = await mount<EdsAutocomplete>('eds-autocomplete', (el) => {
      el.suggestions = ['Alpha', 'Beta', 'Gamma'];
    });

    const input = shadowQuery<HTMLInputElement>(el, 'input.control');
    input.value = 'Al';
    input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    await el.updateComplete;

    expect(el.shadowRoot?.querySelectorAll('.option').length).toBe(1);
    expect(shadowQuery<HTMLLIElement>(el, '.option').textContent?.trim()).toBe('Alpha');
  });

  it('emits eds-select when a suggestion is chosen', async () => {
    const el = await mount<EdsAutocomplete>('eds-autocomplete', (el) => {
      el.suggestions = ['Alpha', 'Beta'];
    });

    const input = shadowQuery<HTMLInputElement>(el, 'input.control');
    input.value = 'Al';
    input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    await el.updateComplete;

    const selectPromise = nextEvent<{ value: string }>(el, 'eds-select');
    shadowQuery<HTMLLIElement>(el, '.option').click();

    const event = await selectPromise;
    expect(event.detail.value).toBe('Alpha');
    expect(el.value).toBe('Alpha');
  });

  it('navigates suggestions with keyboard and closes on Escape', async () => {
    const el = await mount<EdsAutocomplete>('eds-autocomplete', (el) => {
      el.suggestions = ['Alpha', 'Alpine', 'Beta'];
    });

    const input = shadowQuery<HTMLInputElement>(el, 'input.control');
    input.value = 'Al';
    input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    await el.updateComplete;

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));

    const selectPromise = nextEvent<{ value: string }>(el, 'eds-select');
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect((await selectPromise).detail.value).toBe('Alpha');

    input.value = 'Al';
    input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    await el.updateComplete;
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.option')).toBeNull();
  });

  it('emits eds-change on native change and closes on blur', async () => {
    const el = await mount<EdsAutocomplete>('eds-autocomplete', (el) => {
      el.suggestions = ['Alpha'];
      el.value = 'Alpha';
    });

    const input = shadowQuery<HTMLInputElement>(el, 'input.control');
    const changePromise = nextEvent<{ value: string }>(el, 'eds-change');
    input.dispatchEvent(new Event('change', { bubbles: true }));
    expect((await changePromise).detail.value).toBe('Alpha');

    input.value = 'Al';
    input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    await el.updateComplete;
    input.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.option')).toBeNull();
  });
});
