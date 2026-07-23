import { describe, it, expect, beforeEach } from 'vitest';
import './eds-data-table.js';
import type { EdsDataTable } from './eds-data-table.js';
import { mount, resetDom, nextEvent, shadowQuery, shadowQueryAll } from '../../test/helpers.js';

describe('eds-data-table', () => {
  beforeEach(() => {
    resetDom();
  });

  it('renders column headers and row cells', async () => {
    const el = await mount<EdsDataTable>('eds-data-table', (node) => {
      node.columns = [
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
      ];
      node.rows = [{ name: 'Ada', role: 'Engineer' }];
    });

    expect(shadowQueryAll(el, '.header-label')).toHaveLength(2);
    expect(shadowQueryAll(el, '.header-label')[0].textContent).toContain('Name');
    expect(el.shadowRoot?.textContent).toContain('Ada');
    expect(el.shadowRoot?.textContent).toContain('Engineer');
  });

  it('shows empty state when there are no rows', async () => {
    const el = await mount<EdsDataTable>('eds-data-table', (node) => {
      node.columns = [{ key: 'name', label: 'Name' }];
      node.rows = [{ name: 'placeholder' }];
    });
    el.rows = [];
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain('No data');
  });

  it('emits eds-sort when a sortable header is clicked', async () => {
    const el = await mount<EdsDataTable>('eds-data-table', (node) => {
      node.sortable = true;
      node.columns = [{ key: 'name', label: 'Name', sortable: true }];
      node.rows = [{ name: 'Ada' }];
    });

    const eventPromise = nextEvent<{ key: string; direction: string }>(el, 'eds-sort');
    shadowQuery<HTMLButtonElement>(el, 'button.header-button').click();

    const event = await eventPromise;
    expect(event.detail.key).toBe('name');
    expect(event.detail.direction).toBe('asc');
  });
});
