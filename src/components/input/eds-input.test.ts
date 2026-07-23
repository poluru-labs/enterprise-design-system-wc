import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';
import './eds-input.js';
import type { EdsInput } from './eds-input.js';

describe('eds-input', () => {
  beforeEach(() => resetDom());

  it('renders a text input in the shadow root', async () => {
    const el = await mount<EdsInput>('eds-input', (el) => {
      el.label = 'Email';
      el.placeholder = 'you@example.com';
    });

    expect(shadowQuery<HTMLInputElement>(el, 'input.control')).toBeTruthy();
    expect(shadowQuery<HTMLLabelElement>(el, 'label.label').textContent).toBe('Email');
  });

  it('reflects value and disabled props', async () => {
    const el = await mount<EdsInput>('eds-input', (el) => {
      el.value = 'hello';
      el.disabled = true;
    });

    const input = shadowQuery<HTMLInputElement>(el, 'input.control');
    expect(input.value).toBe('hello');
    expect(input.disabled).toBe(true);
  });

  it('emits eds-input when the user types', async () => {
    const el = await mount<EdsInput>('eds-input');
    const input = shadowQuery<HTMLInputElement>(el, 'input.control');
    const inputPromise = nextEvent<{ value: string }>(el, 'eds-input');

    input.value = 'abc';
    input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));

    const event = await inputPromise;
    expect(event.detail.value).toBe('abc');
    expect(el.value).toBe('abc');
  });

  it('emits eds-change and renders icons, hint, and error', async () => {
    const el = await mount<EdsInput>('eds-input', (node) => {
      node.icon = 'search';
      node.iconTrailing = 'x';
      node.size = 'sm';
      node.hint = 'Helpful hint';
    });

    expect(el.shadowRoot?.querySelectorAll('eds-icon').length).toBe(2);
    expect(shadowQuery(el, '.hint').textContent).toBe('Helpful hint');

    const changePromise = nextEvent(el, 'eds-change');
    shadowQuery<HTMLInputElement>(el, 'input.control').dispatchEvent(
      new Event('change', { bubbles: true }),
    );
    await changePromise;

    el.invalid = true;
    el.errorMessage = 'Invalid';
    await el.updateComplete;
    expect(shadowQuery(el, '.error').textContent).toBe('Invalid');
  });
});
