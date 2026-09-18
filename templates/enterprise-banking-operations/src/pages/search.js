import { buildSearchCatalog } from '../data/index.js';
import { buildSearchIndex, searchIndex } from '../lib/search.js';
import { pageHeader } from '../components/widgets.js';

const catalog = buildSearchIndex(buildSearchCatalog());

export function renderSearch(route) {
  const query = route.id ? decodeURIComponent(route.id) : '';
  const safeQuery = query.replace(/"/g, '&quot;');
  return `
    ${pageHeader({
      eyebrow: 'Find',
      title: 'Search',
      lead: query
        ? `Results for “${query}” across payments, accounts, and flags.`
        : 'Search payments, accounts, exceptions, and AML flags.',
    })}
    <eds-card padded>
      <eds-search id="search-page-input" placeholder="Search payments, accounts, flags…" clearable value="${safeQuery}"></eds-search>
      <div id="search-results" class="mt-3"></div>
    </eds-card>
  `;
}

export function hydrateSearch(root, route) {
  const input = root.querySelector('#search-page-input');
  const results = root.querySelector('#search-results');
  const query = route.id ? decodeURIComponent(route.id) : '';

  const paint = (value) => {
    const needle = value ?? query;
    const hits = searchIndex(catalog, needle);
    if (!results) return;
    if (!String(needle).trim()) {
      results.innerHTML = '<p class="muted mb-0">Type to search the Poluru National desk.</p>';
      return;
    }
    if (!hits.length) {
      results.innerHTML =
        '<eds-empty-state heading="No matches" description="Try a payment code, account, or flag." icon="search"></eds-empty-state>';
      return;
    }
    results.innerHTML = hits
      .map(
        (item) => `
      <article class="search-hit">
        <a href="${item.href}">${item.label}</a>
        <span class="muted">${item.type} · ${item.description}</span>
      </article>`,
      )
      .join('');
  };

  paint(input?.value ?? '');
  input?.addEventListener('eds-input', (event) => {
    const value = event.detail?.value ?? '';
    window.location.hash = value.trim() ? `#/search/${encodeURIComponent(value.trim())}` : '#/search';
  });
  input?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = input.value?.trim();
      window.location.hash = value ? `#/search/${encodeURIComponent(value)}` : '#/search';
    }
  });
}
