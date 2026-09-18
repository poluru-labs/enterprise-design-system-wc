import { screening } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, statusChip } from '../components/widgets.js';
import { severityTone, statusLabel } from '../lib/status.js';

export function renderScreening() {
  return `
    ${pageHeader({
      eyebrow: 'AML',
      title: 'Screening',
      lead: `Nikhil Poluru’s book. OFAC hits, correspondent corridors, and unusual draws.`,
    })}
    ${filterBar(`
      <eds-search id="sc-search" placeholder="Filter flags" clearable></eds-search>
      <eds-select id="sc-status" label="Status"></eds-select>
    `)}
    <div id="sc-table"></div>
    <eds-empty-state id="sc-empty" hidden heading="No matches" description="Try a payment, subject, or owner." icon="search"></eds-empty-state>
  `;
}

export function hydrateScreening(root) {
  const table = root.querySelector('#sc-table');
  const empty = root.querySelector('#sc-empty');
  const search = root.querySelector('#sc-search');
  const status = root.querySelector('#sc-status');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Open', value: 'open' },
      { label: 'Watch', value: 'watch' },
      { label: 'Closed', value: 'closed' },
    ];
    status.value = '';
  }

  const paint = () => {
    let hits = searchRecords(screening, search?.value ?? '', ['payment', 'title', 'subject', 'owner']);
    const statusValue = status?.value;
    if (statusValue && statusValue !== 'All statuses') hits = hits.filter((item) => item.status === statusValue);
    if (empty) {
      empty.hidden = hits.length > 0;
      empty.style.display = hits.length > 0 ? 'none' : '';
    }
    if (!table) return;
    if (!hits.length) {
      table.innerHTML = '';
      return;
    }
    table.innerHTML = `
      <table class="scr-table">
        <thead>
          <tr><th>Ref</th><th>Flag</th><th>Subject</th><th>Owner</th><th>Date</th><th>Severity</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${hits
            .map(
              (item) => `
            <tr>
              <td>${item.payment}</td>
              <td>${item.title}</td>
              <td>${item.subject}</td>
              <td>${item.owner}</td>
              <td>${item.date}</td>
              <td><eds-badge label="${statusLabel(item.severity)}" variant="${severityTone(item.severity)}" pill></eds-badge></td>
              <td>${statusChip(item.status)}</td>
            </tr>`,
            )
            .join('')}
        </tbody>
      </table>
    `;
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
}
