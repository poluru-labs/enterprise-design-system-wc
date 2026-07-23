import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';
import './eds-combobox.js';
import type { EdsCombobox } from './eds-combobox.js';

describe('eds-combobox', () => {
  beforeEach(() => resetDom());

  it('renders a combobox input', async () => {
    const el = await mount<EdsCombobox>('eds-combobox', (el) => {
      el.label = 'Fruit';
      el.placeholder = 'Choose fruit';
    });

    const input = shadowQuery<HTMLInputElement>(el, 'input.control');
    expect(input.getAttribute('role')).toBe('combobox');
    expect(input.placeholder).toBe('Choose fruit');
  });

  it('opens the listbox on focus', async () => {
    const el = await mount<EdsCombobox>('eds-combobox', (el) => {
      el.options = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
      ];
    });

    shadowQuery<HTMLInputElement>(el, 'input.control').focus();
    await el.updateComplete;

    expect(shadowQuery<HTMLUListElement>(el, 'ul.listbox')).toBeTruthy();
    expect(el.shadowRoot?.querySelectorAll('.option').length).toBe(2);
  });

  it('emits eds-change when an option is selected', async () => {
    const el = await mount<EdsCombobox>('eds-combobox', (el) => {
      el.options = [{ label: 'Apple', value: 'apple' }];
    });

    shadowQuery<HTMLInputElement>(el, 'input.control').focus();
    await el.updateComplete;

    const changePromise = nextEvent<{ value: string }>(el, 'eds-change');
    shadowQuery<HTMLLIElement>(el, '.option').click();

    const event = await changePromise;
    expect(event.detail.value).toBe('apple');
    expect(el.value).toBe('apple');
  });

  it('filters options, navigates with keyboard, and closes on Escape', async () => {
    const el = await mount<EdsCombobox>('eds-combobox', (el) => {
      el.options = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Apricot', value: 'apricot' },
      ];
      el.invalid = true;
      el.errorMessage = 'Required';
    });

    const input = shadowQuery<HTMLInputElement>(el, 'input.control');
    input.value = 'Ap';
    input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    await el.updateComplete;

    expect(el.shadowRoot?.querySelectorAll('.option').length).toBe(2);
    expect(shadowQuery(el, '.error').textContent).toBe('Required');

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await el.updateComplete;

    expect(el.value).toBe('apricot');

    input.focus();
    await el.updateComplete;
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('ul.listbox')).toBeNull();
  });

  it('shows empty state and restores filter on blur', async () => {
    const el = await mount<EdsCombobox>('eds-combobox', (el) => {
      el.options = [{ label: 'Apple', value: 'apple' }];
      el.value = 'apple';
    });

    const input = shadowQuery<HTMLInputElement>(el, 'input.control');
    input.focus();
    input.value = 'zzzz';
    input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    await el.updateComplete;

    expect(shadowQuery(el, '.empty').textContent).toContain('No matches');

    input.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('ul.listbox')).toBeNull();
  });
});
