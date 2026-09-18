import { payments } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, paymentGrid } from '../components/widgets.js';

export function renderPayments() {
  return `
    ${pageHeader({
      eyebrow: 'Rails',
      title: 'Payments',
      lead: `${payments.length} items on the Poluru National desk. Filter by city, channel, or status, then open a card.`,
      actions: '<eds-button id="py-add" variant="primary" icon="plus">Release payment</eds-button>',
    })}
    ${filterBar(`
      <eds-search id="py-search" placeholder="Filter payments" clearable></eds-search>
      <eds-select id="py-status" label="Status"></eds-select>
      <eds-select id="py-city" label="City"></eds-select>
    `)}
    <div id="py-grid"></div>
    <eds-empty-state id="py-empty" hidden heading="No matches" description="Try a payment, city, or owner." icon="search"></eds-empty-state>
  `;
}

export function hydratePayments(root) {
  const grid = root.querySelector('#py-grid');
  const empty = root.querySelector('#py-empty');
  const search = root.querySelector('#py-search');
  const status = root.querySelector('#py-status');
  const city = root.querySelector('#py-city');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Queued', value: 'queued' },
      { label: 'Posted', value: 'posted' },
      { label: 'OFAC', value: 'ofac' },
      { label: 'NSF', value: 'nsf' },
      { label: 'Settled', value: 'settled' },
    ];
    status.value = '';
  }
  if (city) {
    city.options = [
      { label: 'All cities', value: '' },
      ...[...new Set(payments.map((item) => item.city))].map((value) => ({ label: value, value })),
    ];
    city.value = '';
  }

  const paint = () => {
    let hits = searchRecords(payments, search?.value ?? '', ['code', 'title', 'city', 'owner', 'counterparty', 'channel']);
    const statusValue = status?.value;
    const cityValue = city?.value;
    if (statusValue && statusValue !== 'All statuses') hits = hits.filter((item) => item.status === statusValue);
    if (cityValue && cityValue !== 'All cities') hits = hits.filter((item) => item.city === cityValue);
    if (grid) grid.innerHTML = hits.length ? paymentGrid(hits) : '';
    if (empty) {
      empty.hidden = hits.length > 0;
      empty.style.display = hits.length > 0 ? 'none' : '';
    }
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
  city?.addEventListener('eds-change', paint);
  root.querySelector('#py-add')?.addEventListener('eds-click', () => document.querySelector('#payment-modal')?.show());
}
