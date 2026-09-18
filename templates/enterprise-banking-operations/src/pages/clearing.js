import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { clearing } from '../data/index.js';
import { formatCurrency } from '../lib/format.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderClearing() {
  const booked = clearing.reduce((sum, item) => sum + item.amount, 0);
  return `
    ${pageHeader({
      eyebrow: 'Windows',
      title: 'Clearing',
      lead: `Arjun Poluru’s book. ${formatCurrency(booked)} sitting across Fedwire, ACH, RTP, and SWIFT.`,
      actions: '<eds-button id="clr-export" variant="secondary" icon="download">Export</eds-button>',
    })}
    ${sheet({
      title: 'Settlement windows',
      body: `
        <table class="clr-table">
          <thead>
            <tr><th>Payment</th><th>Counterparty</th><th>Amount</th><th>Window</th><th>Owner</th><th>Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            ${clearing
              .map(
                (item) => `
              <tr>
                <td>${item.payment}</td>
                <td>${item.counterparty}</td>
                <td>${formatCurrency(item.amount)}</td>
                <td>${item.window}</td>
                <td>${item.owner}</td>
                <td>${item.date}</td>
                <td>${statusChip(item.status)}</td>
              </tr>`,
              )
              .join('')}
          </tbody>
        </table>`,
    })}
  `;
}

export function hydrateClearing(root) {
  root.querySelector('#clr-export')?.addEventListener('eds-click', () => {
    showToast({ message: 'Clearing export is a demo in this template', variant: 'info' });
  });
}
