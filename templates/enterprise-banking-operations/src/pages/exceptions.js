import { exceptions } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, statusChip } from '../components/widgets.js';
import { severityTone, statusLabel } from '../lib/status.js';

export function renderExceptions() {
  return `
    ${pageHeader({
      eyebrow: 'Repair',
      title: 'Exceptions',
      lead: `Kavya Poluru’s book. OFAC holds, NSF returns, BIC mismatches, and cutoff risk.`,
    })}
    ${filterBar(`
      <eds-search id="ex-search" placeholder="Filter exceptions" clearable></eds-search>
      <eds-select id="ex-status" label="Status"></eds-select>
    `)}
    <div id="ex-table"></div>
    <eds-empty-state id="ex-empty" hidden heading="No matches" description="Try a payment, title, or owner." icon="search"></eds-empty-state>
  `;
}

export function hydrateExceptions(root) {
  const table = root.querySelector('#ex-table');
  const empty = root.querySelector('#ex-empty');
  const search = root.querySelector('#ex-search');
  const status = root.querySelector('#ex-status');

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
    let hits = searchRecords(exceptions, search?.value ?? '', ['payment', 'title', 'property', 'owner']);
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
      <table class="ex-table">
        <thead>
          <tr><th>Payment</th><th>Exception</th><th>File</th><th>Owner</th><th>Date</th><th>Severity</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${hits
            .map(
              (item) => `
            <tr>
              <td>${item.payment}</td>
              <td>${item.title}</td>
              <td>${item.property}</td>
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
