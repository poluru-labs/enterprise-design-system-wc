import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery, shadowQueryAll } from '../../test/helpers.js';
import './eds-date-range-picker.js';
import type { EdsDateRangePicker } from './eds-date-range-picker.js';

describe('eds-date-range-picker', () => {
  beforeEach(() => resetDom());

  it('renders a readonly range trigger input', async () => {
    const el = await mount<EdsDateRangePicker>('eds-date-range-picker', (el) => {
      el.label = 'Travel dates';
    });

    expect(shadowQuery<HTMLInputElement>(el, 'input.input').readOnly).toBe(true);
  });

  it('opens the calendar popover on click', async () => {
    const el = await mount<EdsDateRangePicker>('eds-date-range-picker');

    shadowQuery<HTMLInputElement>(el, 'input.input').click();
    await el.updateComplete;

    expect(shadowQuery<HTMLDivElement>(el, '.popover')).toBeTruthy();
  });

  it('emits eds-change after selecting start and end dates', async () => {
    const el = await mount<EdsDateRangePicker>('eds-date-range-picker');

    shadowQuery<HTMLInputElement>(el, 'input.input').click();
    await el.updateComplete;

    const days = shadowQueryAll<HTMLButtonElement>(el, 'button.day:not([disabled])');
    const changePromise = nextEvent<{ start: string; end: string }>(el, 'eds-change');

    days[5].click();
    await el.updateComplete;
    days[12].click();

    const event = await changePromise;
    expect(event.detail.start).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(event.detail.end).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(el.startValue).toBe(event.detail.start);
    expect(el.endValue).toBe(event.detail.end);
  });

  it('navigates months, previews hover range, and closes on Escape', async () => {
    const el = await mount<EdsDateRangePicker>('eds-date-range-picker', (node) => {
      node.startValue = '2024-06-01';
      node.endValue = '2024-06-10';
    });

    shadowQuery<HTMLInputElement>(el, 'input.input').click();
    await el.updateComplete;

    shadowQueryAll<HTMLButtonElement>(el, 'button.nav-button')[1].click();
    await el.updateComplete;
    shadowQueryAll<HTMLButtonElement>(el, 'button.nav-button')[0].click();
    await el.updateComplete;

    el.endValue = '';
    await el.updateComplete;
    shadowQuery<HTMLInputElement>(el, 'input.input').click();
    await el.updateComplete;

    const days = shadowQueryAll<HTMLButtonElement>(el, 'button.day:not([disabled])');
    days[8].dispatchEvent(new PointerEvent('pointerenter', { bubbles: true }));
    await el.updateComplete;

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('.popover')).toBeNull();
  });

  it('closes when clicking outside the open popover', async () => {
    const el = await mount<EdsDateRangePicker>('eds-date-range-picker');
    shadowQuery<HTMLInputElement>(el, 'input.input').click();
    await el.updateComplete;

    document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.popover')).toBeNull();
  });
});
