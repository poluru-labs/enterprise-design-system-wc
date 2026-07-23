import { describe, it, expect, beforeEach } from 'vitest';
import './eds-pagination.js';
import type { EdsPagination } from './eds-pagination.js';
import { mount, resetDom, nextEvent, shadowQueryAll } from '../../test/helpers.js';

describe('eds-pagination', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders page buttons for the total page count', async () => {
    const el = await mount<EdsPagination>('eds-pagination', (node) => {
      node.total = 30;
      node.pageSize = 10;
    });

    const pageButtons = shadowQueryAll<HTMLButtonElement>(el, 'button.button').filter(
      (button) => button.getAttribute('aria-label')?.startsWith('Page'),
    );
    expect(pageButtons).toHaveLength(3);
  });

  it('disables previous on the first page', async () => {
    const el = await mount<EdsPagination>('eds-pagination', (node) => {
      node.total = 30;
      node.pageSize = 10;
      node.page = 1;
    });

    const prev = shadowQueryAll<HTMLButtonElement>(el, 'button.button').find(
      (button) => button.getAttribute('aria-label') === 'Previous page',
    );
    expect(prev?.disabled).toBe(true);
  });

  it('emits eds-change when a page button is clicked', async () => {
    const el = await mount<EdsPagination>('eds-pagination', (node) => {
      node.total = 30;
      node.pageSize = 10;
      node.page = 1;
    });

    const eventPromise = nextEvent<{ page: number }>(el, 'eds-change');
    const pageTwo = shadowQueryAll<HTMLButtonElement>(el, 'button.button').find(
      (button) => button.getAttribute('aria-label') === 'Page 2',
    );
    pageTwo?.click();

    const event = await eventPromise;
    expect(event.detail.page).toBe(2);
    expect(el.page).toBe(2);
  });

  it('renders ellipsis for large page counts', async () => {
    const el = await mount<EdsPagination>('eds-pagination', (node) => {
      node.total = 200;
      node.pageSize = 10;
      node.page = 10;
      node.siblingCount = 1;
    });

    expect(shadowQueryAll(el, '.ellipsis').length).toBeGreaterThan(0);

    el.page = 1;
    await el.updateComplete;
    expect(shadowQueryAll(el, '.ellipsis').length).toBeGreaterThan(0);

    el.page = 20;
    await el.updateComplete;
    expect(shadowQueryAll(el, '.ellipsis').length).toBeGreaterThan(0);
  });

  it('handles empty and single-page totals', async () => {
    const empty = await mount<EdsPagination>('eds-pagination', (node) => {
      node.total = 0;
      node.pageSize = 10;
    });
    expect(
      shadowQueryAll<HTMLButtonElement>(empty, 'button.button').filter((button) =>
        button.getAttribute('aria-label')?.startsWith('Page'),
      ),
    ).toHaveLength(0);

    const single = await mount<EdsPagination>('eds-pagination', (node) => {
      node.total = 5;
      node.pageSize = 10;
    });
    expect(
      shadowQueryAll<HTMLButtonElement>(single, 'button.button').filter((button) =>
        button.getAttribute('aria-label')?.startsWith('Page'),
      ),
    ).toHaveLength(1);
  });
});
