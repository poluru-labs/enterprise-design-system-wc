import { describe, expect, it } from 'vitest';
import { activeHref, parseRoute, searchHref, titles } from './router.js';

describe('router helpers', () => {
  it('parses hash routes with optional ids', () => {
    expect(parseRoute('#/overview')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#/payment/st-folio')).toEqual({ name: 'payment', id: 'st-folio' });
    expect(parseRoute('#/search/ofac')).toEqual({ name: 'search', id: 'ofac' });
    expect(parseRoute('')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#overview')).toEqual({ name: 'overview', id: undefined });
  });

  it('resolves active sidebar hrefs', () => {
    expect(activeHref({ name: 'overview' })).toBe('#/overview');
    expect(activeHref({ name: 'payment', id: 'st-folio' })).toBe('#/payments');
    expect(activeHref({ name: 'exceptions' })).toBe('#/exceptions');
  });

  it('builds search hrefs from queries', () => {
    expect(searchHref('')).toBe('#/search');
    expect(searchHref('  folio  ')).toBe('#/search/folio');
    expect(searchHref('harborwell nsf')).toBe('#/search/harborwell%20nsf');
  });

  it('registers all product views', () => {
    expect(Object.keys(titles)).toEqual(
      expect.arrayContaining(['overview', 'payments', 'accounts', 'exceptions', 'screening', 'clearing', 'search', 'settings']),
    );
  });
});
