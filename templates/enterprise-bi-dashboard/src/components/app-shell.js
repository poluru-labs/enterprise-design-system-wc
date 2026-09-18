import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { renderAppHeader, hydrateAppHeader } from './app-header.js';
import { hydrateAppSidebar, renderAppSidebar } from './app-sidebar.js';
import './content-card.js';
import { anomalyCount, commandItems, currentUser, notifications, productName, workspace } from '../data/index.js';
import { filterCommands } from '../lib/search.js';

export function renderAppShell() {
  return `
    <div class="hx-app-shell">
      ${renderAppSidebar()}
      <div class="hx-app-main">
        ${renderAppHeader({ productName, workspace, anomalyCount, currentUser, notifications })}
        <div class="hx-app-page">
          <eds-breadcrumb id="crumbs"></eds-breadcrumb>
          <main id="view" tabindex="-1"></main>
        </div>
      </div>
    </div>
    <eds-drawer id="inbox-drawer" heading="Inbox" side="right" size="md">
      <eds-list id="inbox-list" divided></eds-list>
      <div slot="footer" class="inline-actions">
        <eds-button id="mark-read" variant="primary">Mark all read</eds-button>
        <eds-button id="goto-alerts" variant="tertiary">Open alerts</eds-button>
      </div>
    </eds-drawer>
    <eds-modal id="command-modal" heading="Jump to" close-on-backdrop close-on-escape>
      <eds-search id="command-search" placeholder="Search workspace" clearable></eds-search>
      <eds-list id="command-list" divided class="mt-3"></eds-list>
      <div slot="footer" class="inline-actions">
        <eds-button id="close-command" variant="tertiary">Close</eds-button>
      </div>
    </eds-modal>
    <eds-drawer id="filter-drawer" heading="Advanced filters" side="right" size="md">
      <div class="stack">
        <eds-select id="drawer-domain" label="Domain"></eds-select>
        <eds-checkbox label="Certified models only" checked></eds-checkbox>
        <eds-checkbox label="Include archived"></eds-checkbox>
        <eds-switch label="Only reports I own"></eds-switch>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="apply-filters" variant="primary">Apply</eds-button>
        <eds-button id="close-filters" variant="tertiary">Cancel</eds-button>
      </div>
    </eds-drawer>
    <eds-modal id="share-modal" heading="Create alert" close-on-backdrop close-on-escape>
      <div class="stack">
        <eds-input label="Alert name" placeholder="NRR drop > 3% WoW" icon="bell"></eds-input>
        <eds-select id="alert-channel" label="Channel"></eds-select>
        <eds-textarea label="Runbook" rows="3" placeholder="Who to page and what to check first."></eds-textarea>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="save-alert" variant="primary">Save alert</eds-button>
        <eds-button id="close-alert" variant="tertiary">Cancel</eds-button>
      </div>
    </eds-modal>
  `;
}

export function hydrateAppShell(handlers = {}) {
  const domain = document.querySelector('#drawer-domain');
  if (domain) {
    domain.options = [
      { label: 'All domains', value: '' },
      { label: 'Finance', value: 'finance' },
      { label: 'Growth', value: 'growth' },
      { label: 'Platform', value: 'platform' },
    ];
  }

  const channel = document.querySelector('#alert-channel');
  if (channel) {
    channel.options = [
      { label: 'Slack', value: 'slack' },
      { label: 'Email', value: 'email' },
      { label: 'Pager', value: 'pager' },
    ];
    channel.value = 'slack';
  }

  const headerRoot = document.querySelector('.hx-header');
  const openCommandPalette = () => {
    const search = document.querySelector('#command-search');
    const commandList = document.querySelector('#command-list');
    if (commandList) commandList.items = filterCommands(search?.value ?? '', commandItems);
    document.querySelector('#command-modal')?.show();
    search?.focus?.();
  };

  hydrateAppSidebar(document, {
    onNavigate: (href) => {
      if (href) window.location.hash = href.replace(/^#/, '#');
    },
  });

  document.querySelector('#nav-toggle')?.addEventListener('eds-click', () => {
    document.body.classList.toggle('sidebar-open');
    const nav = document.querySelector('#side-nav');
    if (nav && window.matchMedia('(min-width: 961px)').matches) {
      nav.collapsed = !nav.collapsed;
      document.body.classList.toggle('sidebar-collapsed', nav.collapsed);
    }
  });

  hydrateAppHeader(headerRoot, {
    workspace,
    onAsk: (question) => {
      const q = question.trim();
      window.location.hash = q ? `#/ask?q=${encodeURIComponent(q)}` : '#/ask';
      showToast({ message: 'Opening Ask Helix', variant: 'info' });
    },
    onUserSelect: (value) => {
      if (value === 'settings' || value === 'legal') window.location.hash = `#/${value}`;
      if (value === 'signout') showToast({ message: 'Signed out of the demo workspace', variant: 'warning' });
    },
    onCommandPalette: openCommandPalette,
  });

  const commandList = document.querySelector('#command-list');
  document.querySelector('#command-search')?.addEventListener('eds-input', (event) => {
    const value = event.detail?.value ?? event.target.value ?? '';
    if (commandList) commandList.items = filterCommands(value, commandItems);
  });
  commandList?.addEventListener('eds-select', (event) => {
    const href = event.detail?.href ?? commandItems.find((item) => item.label === event.detail?.label)?.href;
    document.querySelector('#command-modal')?.close();
    if (href) window.location.hash = href;
  });
  document.querySelector('#close-command')?.addEventListener('eds-click', () => {
    document.querySelector('#command-modal')?.close();
  });

  const inbox = document.querySelector('#inbox-list');
  if (inbox) inbox.items = notifications;
  document.querySelector('#notify-btn')?.addEventListener('eds-click', () => {
    document.querySelector('#inbox-drawer')?.show();
  });
  document.querySelector('#mark-read')?.addEventListener('eds-click', () => {
    const badge = document.querySelector('#inbox-count');
    if (badge) badge.label = '0';
    document.querySelector('#inbox-drawer')?.close();
    showToast({ message: 'Inbox marked read', variant: 'success' });
  });
  document.querySelector('#goto-alerts')?.addEventListener('eds-click', () => {
    document.querySelector('#inbox-drawer')?.close();
    window.location.hash = '#/alerts';
  });

  document.querySelector('#apply-filters')?.addEventListener('eds-click', () => {
    document.querySelector('#filter-drawer')?.close();
    showToast({ message: 'Filters applied', variant: 'success' });
  });
  document.querySelector('#close-filters')?.addEventListener('eds-click', () => {
    document.querySelector('#filter-drawer')?.close();
  });
  document.querySelector('#save-alert')?.addEventListener('eds-click', () => {
    document.querySelector('#share-modal')?.close();
    showToast({ message: 'Alert created', variant: 'success' });
  });
  document.querySelector('#close-alert')?.addEventListener('eds-click', () => {
    document.querySelector('#share-modal')?.close();
  });

  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openCommandPalette();
    }
  });

  handlers.onReady?.();
}
