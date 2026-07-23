import { describe, it, expect, beforeEach } from 'vitest';
import './eds-segmented-control.js';
import type { EdsSegmentedControl } from './eds-segmented-control.js';
import { mount, resetDom, nextEvent, shadowQueryAll } from '../../test/helpers.js';

describe('eds-segmented-control', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders a button for each option', async () => {
    const el = await mount<EdsSegmentedControl>('eds-segmented-control', (node) => {
      node.options = [
        { label: 'Day', value: 'day' },
        { label: 'Week', value: 'week' },
      ];
      node.value = 'day';
    });

    const segments = shadowQueryAll<HTMLButtonElement>(el, 'button.segment');
    expect(segments).toHaveLength(2);
    expect(segments[0].getAttribute('data-selected')).toBe('true');
  });

  it('emits eds-change when selecting a different value', async () => {
    const el = await mount<EdsSegmentedControl>('eds-segmented-control', (node) => {
      node.options = [
        { label: 'Day', value: 'day' },
        { label: 'Week', value: 'week' },
      ];
      node.value = 'day';
    });

    const eventPromise = nextEvent<{ value: string }>(el, 'eds-change');
    shadowQueryAll<HTMLButtonElement>(el, 'button.segment')[1].click();

    const event = await eventPromise;
    expect(event.detail.value).toBe('week');
    expect(el.value).toBe('week');
  });

  it('ignores clicks on disabled options', async () => {
    const el = await mount<EdsSegmentedControl>('eds-segmented-control', (node) => {
      node.options = [
        { label: 'Day', value: 'day' },
        { label: 'Week', value: 'week', disabled: true },
      ];
      node.value = 'day';
    });

    let fired = false;
    el.addEventListener('eds-change', () => {
      fired = true;
    });

    shadowQueryAll<HTMLButtonElement>(el, 'button.segment')[1].click();
    expect(fired).toBe(false);
    expect(el.value).toBe('day');
  });
});
