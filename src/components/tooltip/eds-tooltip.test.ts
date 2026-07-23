import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, shadowQuery } from '../../test/helpers.js';
import './eds-tooltip.js';
import type { EdsTooltip } from './eds-tooltip.js';

describe('eds-tooltip', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders a trigger slot without tooltip content when content is empty', async () => {
    const el = await mount<EdsTooltip>('eds-tooltip', (node) => {
      node.innerHTML = '<button type="button">Hover me</button>';
    });

    expect(el.content).toBe('');
    expect(shadowQuery(el, '.trigger')).toBeTruthy();
    expect(el.shadowRoot?.querySelector('.tooltip')).toBeNull();
  });

  it('shows tooltip on trigger focus when delay is zero', async () => {
    const el = await mount<EdsTooltip>('eds-tooltip', (node) => {
      node.content = 'Helpful tip';
      node.placement = 'bottom';
      node.delay = 0;
      node.innerHTML = '<button type="button">Focus me</button>';
    });
    const trigger = shadowQuery<HTMLElement>(el, '.trigger');

    trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    await el.updateComplete;

    const tooltip = shadowQuery(el, '.tooltip');
    expect(tooltip.getAttribute('data-visible')).toBe('true');
    expect(tooltip.textContent?.trim()).toBe('Helpful tip');
    expect(tooltip.classList.contains('placement-bottom')).toBe(true);
  });

  it('hides tooltip when the trigger loses focus', async () => {
    const el = await mount<EdsTooltip>('eds-tooltip', (node) => {
      node.content = 'Tip';
      node.delay = 0;
      node.innerHTML = '<button type="button">Focus me</button>';
    });
    const trigger = shadowQuery<HTMLElement>(el, '.trigger');

    trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    await el.updateComplete;
    trigger.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 60));
    await el.updateComplete;

    expect(shadowQuery(el, '.tooltip').getAttribute('data-visible')).toBe('false');
  });
});
