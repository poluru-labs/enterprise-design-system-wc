import { accounts } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, accountGrid } from '../components/widgets.js';

export function renderAccounts() {
  return `
    ${pageHeader({
      eyebrow: 'Deposits',
      title: 'Accounts',
      lead: `${accounts.length} books on the Poluru National ledger. Balances, product type, and restriction.`,
    })}
    ${filterBar(`
      <eds-search id="ac-search" placeholder="Filter accounts" clearable></eds-search>
      <eds-select id="ac-status" label="Status"></eds-select>
    `)}
    <div id="ac-grid"></div>
    <eds-empty-state id="ac-empty" hidden heading="No matches" description="Try a number, name, or city." icon="search"></eds-empty-state>
  `;
}

export function hydrateAccounts(root) {
  const grid = root.querySelector('#ac-grid');
  const empty = root.querySelector('#ac-empty');
  const search = root.querySelector('#ac-search');
  const status = root.querySelector('#ac-status');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Active', value: 'active' },
      { label: 'Watch', value: 'watch' },
      { label: 'Restricted', value: 'restricted' },
    ];
    status.value = '';
  }

  const paint = () => {
    let hits = searchRecords(accounts, search?.value ?? '', ['number', 'name', 'city', 'owner', 'type']);
    const statusValue = status?.value;
    if (statusValue && statusValue !== 'All statuses') hits = hits.filter((item) => item.status === statusValue);
    if (grid) grid.innerHTML = hits.length ? accountGrid(hits) : '';
    if (empty) {
      empty.hidden = hits.length > 0;
      empty.style.display = hits.length > 0 ? 'none' : '';
    }
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
}
