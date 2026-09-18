import { describe, expect, it } from 'vitest';
import { filterCommands, matchesQuery, normalizeQuery, searchGroups, searchRecords } from './search.js';

const people = [
  { id: 'p-ananya', name: 'Ananya Reddy', title: 'Workspace admin', department: 'Finance' },
  { id: 'p-vikram', name: 'Vikram Iyer', title: 'Analytics engineer', department: 'Platform' },
  { id: 'p-meera', name: 'Meera Nair', title: 'Growth analyst', department: 'Growth' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Ananya Reddy  ')).toBe('ananya reddy');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Ananya Reddy finance admin', 'ananya')).toBe(true);
    expect(matchesQuery('Ananya Reddy finance admin', 'atlas')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(people, '  ')).toEqual(people);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(people, 'platform', ['name', 'title', 'department']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('p-vikram');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Overview', hint: 'Workspace pulse' },
            { label: 'Watchlist', hint: 'Live metrics' },
          ],
        },
      ],
      'watchlist',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Watchlist']);
  });

  it('filters jump-to commands', () => {
    const commands = [
      { label: 'Reports catalog', description: 'Search certified scorecards', href: '#/reports' },
      { label: 'Ask', description: 'Natural-language questions', href: '#/ask' },
    ];
    expect(filterCommands('ask', commands)).toHaveLength(1);
    expect(filterCommands('', commands)).toHaveLength(2);
  });
});
