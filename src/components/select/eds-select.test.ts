import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';
import './eds-select.js';
import type { EdsSelect } from './eds-select.js';

describe('eds-select', () => {
  beforeEach(() => resetDom());

  it('renders options from the options prop', async () => {
    const el = await mount<EdsSelect>('eds-select', (el) => {
      el.label = 'Country';
      el.options = [
        { label: 'United States', value: 'us' },
        { label: 'Canada', value: 'ca' },
      ];
    });

    const select = shadowQuery<HTMLSelectElement>(el, 'select.control');
    expect(select.options.length).toBe(2);
    expect(select.options[0].textContent?.trim()).toBe('United States');
  });

  it('reflects the selected value', async () => {
    const el = await mount<EdsSelect>('eds-select', (el) => {
      el.options = [{ label: 'One', value: '1' }];
      el.value = '1';
    });

    expect(shadowQuery<HTMLSelectElement>(el, 'select.control').value).toBe('1');
  });

  it('emits eds-change when selection changes', async () => {
    const el = await mount<EdsSelect>('eds-select', (el) => {
      el.options = [
        { label: 'Small', value: 'sm' },
        { label: 'Large', value: 'lg', disabled: true },
      ];
    });

    const select = shadowQuery<HTMLSelectElement>(el, 'select.control');
    const changePromise = nextEvent<{ value: string }>(el, 'eds-change');

    select.value = 'lg';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    const event = await changePromise;
    expect(event.detail.value).toBe('lg');
    expect(el.value).toBe('lg');
  });

  it('renders placeholder, hint, and error messaging', async () => {
    const el = await mount<EdsSelect>('eds-select', (node) => {
      node.placeholder = 'Choose one';
      node.hint = 'Required field';
      node.options = [{ label: 'One', value: '1' }];
    });

    expect(shadowQuery<HTMLSelectElement>(el, 'select.control').options[0].textContent).toContain(
      'Choose one',
    );
    expect(shadowQuery(el, '.hint').textContent).toBe('Required field');

    el.invalid = true;
    el.errorMessage = 'Pick a value';
    await el.updateComplete;
    expect(shadowQuery(el, '.error').textContent).toBe('Pick a value');
  });
});
