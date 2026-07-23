import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery, shadowQueryAll } from '../../test/helpers.js';
import './eds-date-picker.js';
import type { EdsDatePicker } from './eds-date-picker.js';

describe('eds-date-picker', () => {
  beforeEach(() => resetDom());

  it('renders a readonly date trigger input', async () => {
    const el = await mount<EdsDatePicker>('eds-date-picker', (el) => {
      el.label = 'Due date';
      el.placeholder = 'Pick a date';
    });

    const input = shadowQuery<HTMLInputElement>(el, 'input.input');
    expect(input.readOnly).toBe(true);
    expect(input.placeholder).toBe('Pick a date');
  });

  it('opens the calendar popover on click', async () => {
    const el = await mount<EdsDatePicker>('eds-date-picker');

    shadowQuery<HTMLInputElement>(el, 'input.input').click();
    await el.updateComplete;

    expect(shadowQuery<HTMLDivElement>(el, '.popover')).toBeTruthy();
    expect(shadowQueryAll<HTMLButtonElement>(el, 'button.day').length).toBeGreaterThan(0);
  });

  it('emits eds-change when a day is selected', async () => {
    const el = await mount<EdsDatePicker>('eds-date-picker');

    shadowQuery<HTMLInputElement>(el, 'input.input').click();
    await el.updateComplete;

    const enabledDay = shadowQueryAll<HTMLButtonElement>(el, 'button.day:not([disabled])')[10];
    const changePromise = nextEvent<{ value: string }>(el, 'eds-change');

    enabledDay.click();

    const event = await changePromise;
    expect(event.detail.value).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(el.value).toBe(event.detail.value);
  });

  it('opens via keyboard and calendar button, navigates months, and closes on Escape', async () => {
    const el = await mount<EdsDatePicker>('eds-date-picker', (node) => {
      node.value = '2024-06-15';
      node.hint = 'Pick carefully';
    });

    const input = shadowQuery<HTMLInputElement>(el, 'input.input');
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await el.updateComplete;
    expect(shadowQuery(el, '.popover')).toBeTruthy();
    expect(shadowQuery(el, '.hint').textContent).toBe('Pick carefully');

    shadowQueryAll<HTMLButtonElement>(el, 'button.nav-button')[1].click();
    await el.updateComplete;
    shadowQueryAll<HTMLButtonElement>(el, 'button.nav-button')[0].click();
    await el.updateComplete;

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('.popover')).toBeNull();

    shadowQuery<HTMLButtonElement>(el, 'button.icon-button').click();
    await el.updateComplete;
    expect(shadowQuery(el, '.popover')).toBeTruthy();
    shadowQuery<HTMLButtonElement>(el, 'button.icon-button').click();
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('.popover')).toBeNull();

    el.invalid = true;
    el.errorMessage = 'Required';
    await el.updateComplete;
    expect(shadowQuery(el, '.error').textContent).toBe('Required');
  });

  it('closes when clicking outside the open popover', async () => {
    const el = await mount<EdsDatePicker>('eds-date-picker');
    shadowQuery<HTMLInputElement>(el, 'input.input').click();
    await el.updateComplete;

    document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.popover')).toBeNull();
  });
});
