import { describe, it, expect, beforeEach } from 'vitest';
import './eds-stepper.js';
import type { EdsStepper } from './eds-stepper.js';
import { mount, resetDom, nextEvent, shadowQueryAll } from '../../test/helpers.js';

describe('eds-stepper', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders a step for each entry in steps', async () => {
    const el = await mount<EdsStepper>('eds-stepper', (node) => {
      node.steps = [
        { label: 'Account' },
        { label: 'Details' },
        { label: 'Review' },
      ];
    });

    expect(shadowQueryAll(el, 'li.step')).toHaveLength(3);
  });

  it('marks completed, current, and upcoming steps', async () => {
    const el = await mount<EdsStepper>('eds-stepper', (node) => {
      node.steps = [{ label: 'One' }, { label: 'Two' }, { label: 'Three' }];
      node.current = 1;
    });

    const steps = shadowQueryAll(el, 'li.step');
    expect(steps[0].getAttribute('data-state')).toBe('completed');
    expect(steps[1].getAttribute('data-state')).toBe('current');
    expect(steps[2].getAttribute('data-state')).toBe('upcoming');
  });

  it('emits eds-step-click for clickable steps', async () => {
    const el = await mount<EdsStepper>('eds-stepper', (node) => {
      node.steps = [{ label: 'One' }, { label: 'Two' }];
      node.current = 1;
    });

    const eventPromise = nextEvent<{ index: number }>(el, 'eds-step-click');
    shadowQueryAll<HTMLButtonElement>(el, 'button.step-button')[0].click();

    const event = await eventPromise;
    expect(event.detail.index).toBe(0);
  });

  it('does not emit eds-step-click for upcoming steps', async () => {
    const el = await mount<EdsStepper>('eds-stepper', (node) => {
      node.steps = [{ label: 'One' }, { label: 'Two' }];
      node.current = 0;
    });

    let fired = false;
    el.addEventListener('eds-step-click', () => {
      fired = true;
    });

    shadowQueryAll<HTMLButtonElement>(el, 'button.step-button')[1].click();
    expect(fired).toBe(false);
  });
});
