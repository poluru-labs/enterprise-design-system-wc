import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import {
  currentUser,
  exceptions,
  liquidityTrend,
  overviewStats,
  payments,
  screening,
  workspace,
} from '../data/index.js';
import { hydrateStats, pageHeader, sheet, paymentGrid, sparkline, statGrid, statusChip } from '../components/widgets.js';

export function renderOverview() {
  const stats = overviewStats();
  const hotFlags = exceptions.filter((item) => ['open', 'watch'].includes(item.status)).slice(0, 4);
  const screens = screening.filter((item) => ['open', 'watch'].includes(item.status)).slice(0, 4);
  return `
    ${pageHeader({
      eyebrow: workspace.period,
      title: 'Operations desk',
      lead: `Good afternoon, ${currentUser.name.split(' ')[0]}. Nikhil Poluru still holds the Folio Fedwire. Kavya Poluru will not re-originate Harborwell payroll until the NSF is cleared.`,
      actions: `
        <eds-button id="qa-pay" variant="primary" icon="plus">Release payment</eds-button>
        <eds-button id="qa-ex" variant="secondary" icon="alert-triangle">Exceptions</eds-button>
      `,
    })}
    <eds-alert id="folio-alert" variant="warning" dismissible title="Folio Fedwire is OFAC held" message="Possible name match. Nikhil Poluru holds ST-2401. Priya Poluru stays off the pad until screening clears."></eds-alert>
    ${statGrid(stats, 'stat')}
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${sheet({
          title: 'Available liquidity',
          action: '<eds-badge label="$2.4B book" variant="brand" pill></eds-badge>',
          body: `${sparkline(liquidityTrend, 'Year to date available liquidity in billions')}
            <p class="muted mb-0 mt-2">Dev Poluru holds the book. Folio treasury still takes the heavy hold.</p>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Fedwire cutoff',
          action: '<eds-status label="On window" variant="success" pulse></eds-status>',
          body: `
            <div style="display:grid;justify-items:center;text-align:center;gap:0.85rem">
              <eds-circular-progress id="sla-ring" value="68" max="100" size="148" stroke-width="8" show-value></eds-circular-progress>
              <eds-progress-bar value="68" max="100" label="68% of wires inside the 16:00 window" show-value></eds-progress-bar>
              <p class="muted mb-0">Priya Poluru clears same-day before noon.</p>
            </div>`,
        })}
      </div>
    </section>
    <section class="mt-3">
      <div class="section-title mb-2">
        <h2>In flight</h2>
        <eds-link href="#/payments" variant="subtle">Desk</eds-link>
      </div>
      ${paymentGrid(payments.slice(0, 6))}
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-6">
        ${sheet({
          title: 'Exceptions',
          action: '<eds-link href="#/exceptions" variant="subtle">Queue</eds-link>',
          body: hotFlags
            .map(
              (item) => `
            <div class="work-row">
              <div>
                <strong>${item.payment} · ${item.title}</strong>
                <p class="muted mb-0">${item.owner} · ${item.date}</p>
              </div>
              ${statusChip(item.status)}
            </div>`,
            )
            .join(''),
        })}
      </div>
      <div class="col-lg-6">
        ${sheet({
          title: 'AML screening',
          action: '<eds-link href="#/screening" variant="subtle">Flags</eds-link>',
          body: screens
            .map(
              (item) => `
            <div class="work-row">
              <div>
                <strong>${item.payment} · ${item.subject}</strong>
                <p class="muted mb-0">${item.owner} · ${item.title}</p>
              </div>
              ${statusChip(item.status)}
            </div>`,
            )
            .join(''),
        })}
      </div>
    </section>
  `;
}

export function hydrateOverview(root) {
  hydrateStats(root, overviewStats(), 'stat');
  root.querySelector('#qa-pay')?.addEventListener('eds-click', () => document.querySelector('#payment-modal')?.show());
  root.querySelector('#qa-ex')?.addEventListener('eds-click', () => {
    window.location.hash = '#/exceptions';
  });
  root.querySelector('#folio-alert')?.addEventListener('eds-dismiss', () => {
    showToast({ message: 'Folio stays on the OFAC board', variant: 'info' });
  });
}
