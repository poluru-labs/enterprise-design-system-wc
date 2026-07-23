import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery, shadowQueryAll } from '../../test/helpers.js';
import './eds-pin-input.js';
import type { EdsPinInput } from './eds-pin-input.js';

describe('eds-pin-input', () => {
  beforeEach(() => resetDom());

  it('renders the configured number of cells', async () => {
    const el = await mount<EdsPinInput>('eds-pin-input', (el) => {
      el.length = 4;
      el.label = 'Verification code';
    });

    expect(shadowQueryAll<HTMLInputElement>(el, 'input.cell').length).toBe(4);
  });

  it('updates value as digits are entered', async () => {
    const el = await mount<EdsPinInput>('eds-pin-input', (el) => {
      el.length = 4;
    });

    const [first, second] = shadowQueryAll<HTMLInputElement>(el, 'input.cell');

    first.value = '1';
    first.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    await el.updateComplete;

    second.value = '2';
    second.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    await el.updateComplete;

    expect(el.value).toBe('12');
  });

  it('emits eds-complete when all digits are filled', async () => {
    const el = await mount<EdsPinInput>('eds-pin-input', (el) => {
      el.length = 3;
    });

    const cells = shadowQueryAll<HTMLInputElement>(el, 'input.cell');
    const completePromise = nextEvent<{ value: string }>(el, 'eds-complete');

    cells.forEach((cell, index) => {
      cell.value = String(index + 1);
      cell.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    });

    const event = await completePromise;
    expect(event.detail.value).toBe('123');
    expect(el.value).toBe('123');
  });

  it('rejects non-numeric input when type is number', async () => {
    const el = await mount<EdsPinInput>('eds-pin-input', (el) => {
      el.length = 3;
      el.type = 'number';
    });

    const [first] = shadowQueryAll<HTMLInputElement>(el, 'input.cell');
    first.value = 'a';
    first.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    await el.updateComplete;

    expect(el.value).toBe('');
    expect(first.value).toBe('');
  });

  it('moves focus with arrows and backspace', async () => {
    const el = await mount<EdsPinInput>('eds-pin-input', (el) => {
      el.length = 4;
      el.value = '12';
    });
    await el.updateComplete;

    const cells = shadowQueryAll<HTMLInputElement>(el, 'input.cell');
    cells[1].focus();

    cells[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    expect(el.shadowRoot?.activeElement).toBe(cells[0]);

    cells[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(el.shadowRoot?.activeElement).toBe(cells[1]);

    cells[1].value = '';
    cells[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }));
    expect(el.shadowRoot?.activeElement).toBe(cells[0]);
  });

  it('pastes digits across cells and shows error messaging', async () => {
    const el = await mount<EdsPinInput>('eds-pin-input', (el) => {
      el.length = 4;
      el.type = 'number';
      el.invalid = true;
      el.errorMessage = 'Required';
    });

    const group = shadowQuery<HTMLElement>(el, '[role="group"]');
    const paste = new Event('paste', { bubbles: true, cancelable: true }) as ClipboardEvent;
    Object.defineProperty(paste, 'clipboardData', {
      value: { getData: () => '9876' },
    });
    group.dispatchEvent(paste);
    await el.updateComplete;

    expect(el.value).toBe('9876');
    expect(shadowQuery(el, '.error').textContent).toBe('Required');
  });
});
