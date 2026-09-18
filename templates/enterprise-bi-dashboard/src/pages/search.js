import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { pageHeader } from '../components/widgets.js';
import { commandItems, searchGroups } from '../data/index.js';
import { filterCommands, searchGroups as filterSearchGroups } from '../lib/search.js';
import { navigate } from '../lib/router.js';

export function renderSearch(query = '') {
  return `
    ${pageHeader(
      'Workspace',
      'Search',
      'Find certified reports, insights, people, and platform objects across Harborline Analytics.',
      `<eds-button id="search-clear" variant="tertiary" icon="x">Clear</eds-button>`,
    )}
    <eds-card elevated padded>
      <eds-search id="workspace-search" placeholder="Search reports, metrics, people, jobs" clearable value="${query}"></eds-search>
      <div id="search-results" class="mt-4"></div>
      <eds-empty-state
        id="search-empty"
        hidden
        heading="No matches"
        description="Try a report title, owner name, or insight keyword."
        icon="search"
      ></eds-empty-state>
    </eds-card>
  `;
}

function paintSearchResults(root, query) {
  const host = root.querySelector('#search-results');
  const empty = root.querySelector('#search-empty');
  if (!host) return;

  const groups = filterSearchGroups(searchGroups, query);
  if (!groups.length) {
    host.innerHTML = '';
    if (empty) empty.hidden = false;
    return;
  }

  if (empty) empty.hidden = true;
  host.innerHTML = groups
    .map(
      (group) => `
      <section class="search-group">
        <h2>${group.group}</h2>
        <eds-list class="search-list" divided data-group="${group.group}"></eds-list>
      </section>`,
    )
    .join('');

  root.querySelectorAll('.search-list').forEach((list, index) => {
    list.items = groups[index].items.map((item) => ({
      label: item.label,
      description: item.hint,
      icon: item.icon,
      href: item.href,
    }));
    list.addEventListener('eds-select', (event) => {
      const href = event.detail?.href ?? event.detail?.item?.href;
      if (href) navigate(href);
    });
  });
}

export function hydrateSearch(root, initialQuery = '') {
  const input = root.querySelector('#workspace-search');
  let query = initialQuery;

  const run = (value) => {
    query = value;
    paintSearchResults(root, query);
  };

  run(query);
  input?.addEventListener('eds-input', (event) => run(event.detail?.value ?? event.target.value ?? ''));
  input?.addEventListener('eds-clear', () => run(''));
  root.querySelector('#search-clear')?.addEventListener('eds-click', () => {
    if (input) input.value = '';
    run('');
  });

  root.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      input?.focus?.();
      showToast({ message: 'Jump-to palette opened from header', variant: 'info' });
      document.querySelector('#command-modal')?.show();
      const commandList = document.querySelector('#command-list');
      if (commandList) commandList.items = filterCommands(input?.value ?? '', commandItems);
    }
  });
}

export function searchQueryFromHash() {
  const [, query = ''] = window.location.hash.split('?q=');
  return decodeURIComponent(query.replace(/\+/g, ' '));
}
