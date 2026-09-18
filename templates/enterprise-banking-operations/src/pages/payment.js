import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { accounts, exceptions, payments } from '../data/index.js';
import { formatCurrency } from '../lib/format.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';
import { statusLabel } from '../lib/status.js';

export function renderPayment(route) {
  const item = payments.find((entry) => entry.id === route.id) || payments[0];
  return `
    ${pageHeader({
      eyebrow: item.code,
      title: item.title,
      lead: `${item.city} · ${statusLabel(item.channel)}. ${item.owner} on the file. Value date ${item.valueDate}.`,
      actions: `
        <eds-button id="py-release" variant="primary" icon="check">Release</eds-button>
        <eds-button id="py-account" variant="secondary" icon="user">Account</eds-button>
      `,
    })}
    <div class="row g-3">
      <div class="col-lg-7">
        ${sheet({
          title: 'Instruction',
          action: statusChip(item.status),
          body: `
            <dl class="detail-grid">
              <div><dt>Code</dt><dd>${item.code}</dd></div>
              <div><dt>Stage</dt><dd>${statusLabel(item.stage)}</dd></div>
              <div><dt>Owner</dt><dd>${item.owner}</dd></div>
              <div><dt>Counterparty</dt><dd>${item.counterparty}</dd></div>
              <div><dt>Account</dt><dd>${item.account}</dd></div>
              <div><dt>Amount</dt><dd>${formatCurrency(item.amount)}</dd></div>
              <div><dt>Channel</dt><dd>${statusLabel(item.channel)}</dd></div>
              <div><dt>Value date</dt><dd>${item.valueDate}</dd></div>
            </dl>
            <p class="muted mt-3 mb-0">Subbu Poluru’s desk holds the packet. Priya Poluru owns Fedwire. Nikhil Poluru owns OFAC.</p>`,
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'On this payment',
          body: '<eds-timeline id="py-timeline"></eds-timeline>',
        })}
      </div>
    </div>
  `;
}

export function hydratePayment(root, route) {
  const item = payments.find((entry) => entry.id === route.id) || payments[0];
  const account = accounts.find((entry) => entry.number === item.account);
  const flags = exceptions.filter((entry) => entry.payment === item.code).slice(0, 2);
  const timeline = root.querySelector('#py-timeline');
  if (timeline) {
    timeline.items = [
      { label: `${statusLabel(item.stage)} · ${item.owner}`, description: item.city, timestamp: 'Today', icon: 'check' },
      {
        label: account ? `${account.number} ${statusLabel(account.status)}` : item.account,
        description: account?.owner || 'Deposits',
        timestamp: 'Account',
        icon: 'user',
      },
      ...flags.map((entry) => ({
        label: entry.title,
        description: entry.owner,
        timestamp: entry.date,
        icon: 'alert-triangle',
      })),
    ];
  }
  root.querySelector('#py-release')?.addEventListener('eds-click', () => {
    showToast({ message: `${item.code} stays with ${item.owner}`, variant: 'info' });
    window.location.hash = '#/clearing';
  });
  root.querySelector('#py-account')?.addEventListener('eds-click', () => {
    window.location.hash = '#/accounts';
  });
}
