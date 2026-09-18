import { describe, expect, it } from 'vitest';
import { buildSearchIndex, matchesQuery, normalizeQuery, searchGroups, searchIndex, searchRecords } from './search.js';

const people = [
  { id: 'p-mira', name: 'Mira Poluru', title: 'Head of performance', department: 'Office of the CEO' },
  { id: 'p-kavya', name: 'Kavya Poluru', title: 'VP growth', department: 'Growth' },
  { id: 'p-rohan', name: 'Rohan Poluru', title: 'COO', department: 'Operations' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Mira Poluru  ')).toBe('mira poluru');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Mira Poluru performance lead', 'mira')).toBe(true);
    expect(matchesQuery('Mira Poluru performance lead', 'atlas')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(people, '  ')).toEqual(people);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(people, 'operations', ['name', 'title', 'department']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('p-rohan');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Overview', hint: 'Company pulse' },
            { label: 'Alerts', hint: 'Thresholds and SLA' },
          ],
        },
      ],
      'sla',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Alerts']);
  });

  it('searches a prebuilt index', () => {
    const index = buildSearchIndex([
      { label: 'Finance scorecard', description: 'Margin and cash', owner: 'Arjun Poluru', type: 'scorecard' },
      { label: 'Fulfillment SLA', description: 'Operations alert', owner: 'Rohan Poluru', type: 'alert' },
    ]);
    const hits = searchIndex(index, 'fulfillment');
    expect(hits).toHaveLength(1);
    expect(hits[0].type).toBe('alert');
  });
});
