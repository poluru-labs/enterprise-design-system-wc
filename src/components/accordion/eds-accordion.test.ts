import { describe, it, expect, beforeEach } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';
import './eds-accordion.js';
import type { EdsAccordion, EdsAccordionItem } from './eds-accordion.js';

async function mountAccordion(setup?: (el: EdsAccordion) => void) {
  const el = await mount<EdsAccordion>('eds-accordion', (acc) => {
    acc.innerHTML = `
      <eds-accordion-item heading="Section one">Content one</eds-accordion-item>
      <eds-accordion-item heading="Section two">Content two</eds-accordion-item>
    `;
    setup?.(acc);
  });
  const items = [...el.querySelectorAll('eds-accordion-item')] as EdsAccordionItem[];
  await Promise.all(items.map((item) => item.updateComplete));
  await el.updateComplete;
  return { el, items };
}

/** happy-dom does not retarget slotted composed events into shadow listeners. */
function fireToggle(el: EdsAccordion, item: EdsAccordionItem, open: boolean) {
  const event = new CustomEvent('eds-accordion-toggle', {
    detail: { open },
    bubbles: true,
    composed: true,
  });
  Object.defineProperty(event, 'target', { value: item });
  (el as unknown as { onToggle: (event: Event) => void }).onToggle(event);
}

describe('eds-accordion', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders accordion items with headings', async () => {
    const { items } = await mountAccordion();

    expect(items).toHaveLength(2);
    expect(shadowQuery<HTMLButtonElement>(items[0], '.trigger').textContent).toContain('Section one');
  });

  it('dispatches eds-accordion-toggle when an item trigger is clicked', async () => {
    const { items } = await mountAccordion();
    const toggle = nextEvent<{ open: boolean }>(items[0], 'eds-accordion-toggle');

    shadowQuery<HTMLButtonElement>(items[0], '.trigger').click();
    const event = await toggle;

    expect(event.detail.open).toBe(true);
  });

  it('reflects open state on the item panel', async () => {
    const { items } = await mountAccordion();

    items[0].open = true;
    await items[0].updateComplete;

    expect(shadowQuery(items[0], '.panel').getAttribute('data-open')).toBe('true');
    expect(shadowQuery<HTMLButtonElement>(items[0], '.trigger').getAttribute('aria-expanded')).toBe(
      'true',
    );
  });

  it('reflects single expansion mode on the host', async () => {
    const { el } = await mountAccordion((acc) => {
      acc.single = true;
    });

    expect(el.single).toBe(true);
    expect(el.hasAttribute('single')).toBe(true);
  });

  it('emits eds-accordion-change and opens the clicked item', async () => {
    const { el, items } = await mountAccordion();
    const change = nextEvent<{ openHeadings: string[] }>(el, 'eds-accordion-change');

    fireToggle(el, items[0], true);
    const event = await change;

    expect(items[0].open).toBe(true);
    expect(event.detail.openHeadings).toContain('Section one');
  });

  it('keeps only one item open in single mode', async () => {
    const { el, items } = await mountAccordion((acc) => {
      acc.single = true;
    });

    fireToggle(el, items[0], true);
    await el.updateComplete;
    await items[0].updateComplete;

    fireToggle(el, items[1], true);
    await el.updateComplete;
    await Promise.all(items.map((item) => item.updateComplete));

    expect(items[0].open).toBe(false);
    expect(items[1].open).toBe(true);
  });
});
