import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { contentCard } from '../components/content-card.js';
import { pageHeader, regionMixRows } from '../components/widgets.js';
import {
  bookmarks,
  collections,
  compareOptions,
  currentUser,
  forecastBars,
  forecastFacts,
  forecastScenarios,
  goalColumns,
  goalMeters,
  goalRows,
  jobColumns,
  jobRows,
  lineageLayers,
  regions,
  sourceColumns,
  sourceRows,
  teamMembers,
  usageBars,
  usageKpis,
} from '../data/index.js';

export function renderOverviewExtras() {
  return `
    <section class="row g-3 mt-1 stretch-row">
      <div class="col-sm-6 col-xl-3">
        ${contentCard(`
          <div class="section-title">
            <h2>Pinned bookmarks</h2>
            <eds-link href="#/reports" variant="subtle">Catalog</eds-link>
          </div>
          <eds-list id="bookmark-list" divided></eds-list>
        `)}
      </div>
      <div class="col-sm-6 col-xl-3">
        ${contentCard(`
          <div class="section-title">
            <h2>Goal snapshot</h2>
            <eds-link href="#/goals" variant="subtle">All goals</eds-link>
          </div>
          <div class="stack" id="goal-meters"></div>
        `)}
      </div>
      <div class="col-sm-6 col-xl-3">
        ${contentCard(`
          <div class="section-title">
            <h2>Revenue mix</h2>
            <eds-segmented-control id="compare-range"></eds-segmented-control>
          </div>
          <div id="region-mix" class="region-mix"></div>
          <p id="compare-note" class="muted mt-3 mb-0">Compared with the previous 30 days.</p>
        `)}
      </div>
      <div class="col-sm-6 col-xl-3">
        ${contentCard(`
          <div class="section-title">
            <h2>Certified sources</h2>
            <eds-link href="#/sources" variant="subtle">All sources</eds-link>
          </div>
          <eds-status variant="success" label="17 healthy" pulse></eds-status>
          <eds-status class="mt-2" variant="warning" label="1 degraded · Zendesk"></eds-status>
          <p class="muted mt-3 mb-0">Support tickets is 18m behind a 10m SLA test.</p>
        `)}
      </div>
    </section>
  `;
}

export function hydrateOverviewExtras(root) {
  const list = root.querySelector('#bookmark-list');
  if (list) list.items = bookmarks;
  const meters = root.querySelector('#goal-meters');
  if (meters) {
    meters.innerHTML = goalMeters
      .map(
        (item, index) => `
        <div>
          <eds-progress-bar id="goal-meter-${index}" value="${item.value}" max="100" label="${item.label}" show-value></eds-progress-bar>
          <p class="muted mb-0">${item.hint}</p>
        </div>`,
      )
      .join('');
  }
  const mix = root.querySelector('#region-mix');
  if (mix) mix.innerHTML = regionMixRows(regions);
  const compare = root.querySelector('#compare-range');
  if (compare) {
    compare.options = compareOptions;
    compare.value = '30d';
    compare.addEventListener('eds-change', (event) => {
      const value = event.detail?.value ?? event.target.value;
      const note = root.querySelector('#compare-note');
      const labels = { '7d': 'previous 7 days', '30d': 'previous 30 days', qoq: 'prior quarter' };
      if (note) note.textContent = `Compared with the ${labels[value] ?? value}.`;
      showToast({ message: `Comparison set to ${value}`, variant: 'info' });
    });
  }
}

export function renderGoals() {
  return `
    ${pageHeader(
      'Planning',
      'Goals',
      'Track certified OKRs against live warehouse actuals.',
      `<eds-button id="new-goal" variant="primary" icon="plus">New goal</eds-button>`,
    )}
    <div class="row g-3 mb-3 stretch-row">
      ${goalMeters
        .map(
          (item) => `
        <div class="col-sm-6 col-xl-3">
          ${contentCard(`
            <eds-circular-progress value="${item.value}" max="100" show-value size="84"></eds-circular-progress>
            <h3 class="mt-2 mb-1">${item.label}</h3>
            <p class="muted mb-0">${item.hint}</p>
          `)}
        </div>`,
        )
        .join('')}
    </div>
    <eds-card elevated padded>
      <eds-data-table id="goal-table" sortable striped compact></eds-data-table>
    </eds-card>
  `;
}

export function hydrateGoals(root) {
  const table = root.querySelector('#goal-table');
  if (table) {
    table.columns = goalColumns;
    table.rows = goalRows;
  }
  root.querySelector('#new-goal')?.addEventListener('eds-click', () => {
    document.querySelector('#share-modal')?.show();
    showToast({ message: 'Describe the goal in the dialog', variant: 'info' });
  });
}

export function renderForecasts() {
  return `
    ${pageHeader(
      'Planning',
      'Forecasts',
      'Six-month revenue scenarios with analyst overlay.',
      `<eds-split-button id="publish-forecast" label="Publish" variant="primary" icon="upload">
        <eds-menu-item label="Base only" value="base"></eds-menu-item>
        <eds-menu-item label="All scenarios" value="all"></eds-menu-item>
      </eds-split-button>`,
    )}
    <div class="row g-3">
      <div class="col-lg-8">
        <eds-card elevated padded>
          <div class="section-title">
            <h2>Net revenue</h2>
            <eds-segmented-control id="forecast-scenario"></eds-segmented-control>
          </div>
          <div id="forecast-bars" class="bars" aria-label="Forecast by month"></div>
          <div class="status-row mt-3">
            <eds-tag label="Jan" variant="neutral"></eds-tag>
            <eds-tag label="Feb" variant="neutral"></eds-tag>
            <eds-tag label="Mar" variant="neutral"></eds-tag>
            <eds-tag label="Apr" variant="neutral"></eds-tag>
            <eds-tag label="May" variant="neutral"></eds-tag>
            <eds-tag label="Jun" variant="brand"></eds-tag>
          </div>
          <eds-slider id="confidence" class="mt-3" label="Confidence overlay" min="50" max="95" step="1" value="82" show-value></eds-slider>
        </eds-card>
      </div>
      <div class="col-lg-4">
        <eds-card elevated padded>
          <div class="section-title"><h2>Model card</h2></div>
          <eds-description-list id="forecast-facts"></eds-description-list>
          <eds-button id="open-assumptions" class="mt-3" variant="secondary" icon="edit">Edit assumptions</eds-button>
        </eds-card>
      </div>
    </div>
  `;
}

function paintForecast(root, scenario) {
  const host = root.querySelector('#forecast-bars');
  if (!host) return;
  host.innerHTML = (forecastBars[scenario] ?? forecastBars.base)
    .map((value) => `<span style="--h:${value}%"></span>`)
    .join('');
}

export function hydrateForecasts(root) {
  const scenario = root.querySelector('#forecast-scenario');
  if (scenario) {
    scenario.options = forecastScenarios;
    scenario.value = 'base';
    scenario.addEventListener('eds-change', (event) => {
      paintForecast(root, event.detail?.value ?? event.target.value);
    });
  }
  paintForecast(root, 'base');
  const facts = root.querySelector('#forecast-facts');
  if (facts) {
    facts.items = forecastFacts;
    facts.columns = 1;
  }
  root.querySelector('#publish-forecast')?.addEventListener('eds-click', () => {
    showToast({ message: 'Forecast published to Finance', variant: 'success' });
  });
  root.querySelector('#publish-forecast')?.addEventListener('eds-select', (event) => {
    showToast({ message: `Published ${event.detail.value} scenario`, variant: 'success' });
  });
  root.querySelector('#open-assumptions')?.addEventListener('eds-click', () => {
    document.querySelector('#filter-drawer')?.show();
  });
  root.querySelector('#confidence')?.addEventListener('eds-change', (event) => {
    showToast({ message: `Confidence set to ${event.detail?.value ?? event.target.value}%`, variant: 'info' });
  });
}

export function renderSources() {
  return `
    ${pageHeader(
      'Platform',
      'Sources',
      'Connector health, latency, and ownership.',
      `
        <eds-button id="test-sources" variant="secondary" icon="refresh">Test all</eds-button>
        <eds-button id="add-source" variant="primary" icon="plus">Add source</eds-button>
      `,
    )}
    <eds-card elevated padded>
      <eds-search id="source-search" placeholder="Filter sources" clearable></eds-search>
      <div class="mt-3">
        <eds-data-table id="source-table" sortable striped compact></eds-data-table>
      </div>
    </eds-card>
  `;
}

export function hydrateSources(root) {
  const table = root.querySelector('#source-table');
  const paint = (query = '') => {
    if (!table) return;
    table.columns = sourceColumns;
    table.rows = sourceRows.filter((row) =>
      `${row.name} ${row.type} ${row.owner} ${row.status}`.toLowerCase().includes(query.toLowerCase()),
    );
  };
  paint();
  root.querySelector('#source-search')?.addEventListener('eds-input', (event) => {
    paint(event.detail?.value ?? event.target.value ?? '');
  });
  root.querySelector('#test-sources')?.addEventListener('eds-click', () => {
    showToast({ message: '7 healthy · 1 degraded · 1 paused', variant: 'warning' });
  });
  root.querySelector('#add-source')?.addEventListener('eds-click', () => {
    document.querySelector('#share-modal')?.show();
  });
}

export function renderUsage() {
  return `
    ${pageHeader('Platform', 'Usage', 'Warehouse spend, query minutes, and budget guardrails.')}
    <section class="row g-3 stretch-row" aria-label="Usage metrics">
      ${usageKpis
        .map(
          (_kpi, index) => `
        <div class="col-sm-6 col-xl-3">
          ${contentCard(`<eds-stat id="usage-kpi-${index}"></eds-stat>`)}
        </div>`,
        )
        .join('')}
    </section>
    <div class="row g-3 mt-1">
      <div class="col-lg-8">
        <eds-card elevated padded>
          <div class="section-title"><h2>Spend by warehouse</h2></div>
          <div class="region-mix">
            ${usageBars
              .map(
                (item) => `
              <div class="region-row">
                <div class="d-flex justify-content-between">
                  <strong>${item.name}</strong>
                  <span>${item.share}%</span>
                </div>
                <div class="region-track"><span style="width:${item.share}%"></span></div>
              </div>`,
              )
              .join('')}
          </div>
        </eds-card>
      </div>
      <div class="col-lg-4">
        <eds-card elevated padded>
          <div class="section-title"><h2>Budget cap</h2></div>
          <eds-slider id="budget-cap" label="Monthly cap ($k)" min="80" max="240" step="10" value="180" show-value></eds-slider>
          <eds-switch class="mt-3" id="spend-alert" label="Page when 90% spent" checked></eds-switch>
          <eds-button id="save-budget" class="mt-3" variant="primary" icon="save" full-width>Save guardrail</eds-button>
        </eds-card>
      </div>
    </div>
  `;
}

export function hydrateUsage(root) {
  usageKpis.forEach((kpi, index) => Object.assign(root.querySelector(`#usage-kpi-${index}`) ?? {}, kpi));
  root.querySelector('#save-budget')?.addEventListener('eds-click', () => {
    const cap = root.querySelector('#budget-cap')?.value ?? 180;
    showToast({ message: `Budget cap saved at $${cap}k`, variant: 'success' });
  });
}

export function renderTeam() {
  return `
    ${pageHeader(
      'Platform',
      'Team',
      'Analysts, owners, and workspace roles.',
      `<eds-button id="invite-member" variant="primary" icon="mail">Invite</eds-button>`,
    )}
    <div class="row g-3 stretch-row">
      ${teamMembers
        .map(
          (member) => `
        <div class="col-sm-6 col-xl-3">
          ${contentCard(`
            <div class="inline-actions mb-2">
              <eds-avatar name="${member.name}" size="lg"></eds-avatar>
              <div>
                <strong>${member.name}</strong>
                <div class="muted">${member.role}</div>
              </div>
            </div>
            <div class="status-row">
              <eds-badge label="${member.domain}" variant="brand" soft></eds-badge>
              <eds-status variant="${member.lastSeen === 'Online' ? 'success' : 'neutral'}" label="${member.lastSeen}" ${member.lastSeen === 'Online' ? 'pulse' : ''}></eds-status>
            </div>
          `)}
        </div>`,
        )
        .join('')}
    </div>
  `;
}

export function hydrateTeam(root) {
  root.querySelector('#invite-member')?.addEventListener('eds-click', () => {
    document.querySelector('#share-modal')?.show();
    showToast({ message: `Invite from ${currentUser.name}`, variant: 'info' });
  });
}

export function renderLineage() {
  return `
    ${pageHeader(
      'Explorer',
      'Lineage',
      'How the executive scorecard is built — sources, staging, marts, and the published workbook.',
      `<eds-button id="open-explorer" variant="secondary" icon="folder">Open workbook</eds-button>`,
    )}
    <eds-card padded>
      <div class="lineage-board" role="img" aria-label="Lineage from sources to the executive scorecard">
        ${lineageLayers
          .map(
            (layer) => `
          <section class="lineage-col">
            <h2>${layer.title}</h2>
            ${layer.nodes
              .map(
                (node) => `
              <article class="lineage-node">
                <strong>${node.label}</strong>
                <span>${node.meta}</span>
              </article>`,
              )
              .join('')}
          </section>`,
          )
          .join('')}
      </div>
    </eds-card>
    <section class="row g-3 mt-1">
      <div class="col-lg-6">
        <eds-card padded>
          <div class="section-title"><h2>Impact</h2></div>
          <p class="muted mb-0">A fail on <strong>support_tickets</strong> does not block this scorecard. A fail on <strong>subscription_facts</strong> would.</p>
        </eds-card>
      </div>
      <div class="col-lg-6">
        <eds-card padded>
          <div class="section-title"><h2>Owners</h2></div>
          <p class="muted mb-0">Vikram Iyer owns the mart. Ananya Reddy owns the published pack. Tests run with the 15-minute finance job.</p>
        </eds-card>
      </div>
    </section>
  `;
}

export function hydrateLineage(root) {
  root.querySelector('#open-explorer')?.addEventListener('eds-click', () => {
    window.location.hash = '#/explorer';
  });
}

export function renderCollections() {
  return `
    ${pageHeader(
      'Deliver',
      'Collections',
      'Saved sets of certified reports. Share a collection instead of a folder of links.',
      `<eds-button id="new-collection" variant="primary" icon="plus">New collection</eds-button>`,
    )}
    <div class="row g-3 stretch-row">
      ${collections
        .map(
          (item) => `
        <div class="col-sm-6 col-xl-4">
          ${contentCard(`
            <span class="eyebrow">${item.status}</span>
            <h2 class="mt-2">${item.name}</h2>
            <p class="muted">${item.reports} reports · ${item.owner}</p>
            <p class="muted mb-3">${item.updated}</p>
            <eds-link href="#/reports" variant="default">Open catalog</eds-link>
          `, { elevated: false })}
        </div>`,
        )
        .join('')}
    </div>
  `;
}

export function hydrateCollections(root) {
  root.querySelector('#new-collection')?.addEventListener('eds-click', () => {
    showToast({ message: 'Collection draft saved to Deliver', variant: 'success' });
  });
}

export function renderJobs() {
  return `
    ${pageHeader(
      'Platform',
      'Jobs',
      'Scheduled refreshes behind the certified marts. Support freshness is the only fail.',
      `<eds-button id="run-job" variant="primary" icon="refresh">Run selected</eds-button>`,
    )}
    <eds-card padded>
      <eds-data-table id="job-table" sortable striped></eds-data-table>
    </eds-card>
  `;
}

export function hydrateJobs(root) {
  const table = root.querySelector('#job-table');
  if (table) {
    table.columns = jobColumns;
    table.rows = jobRows;
  }
  root.querySelector('#run-job')?.addEventListener('eds-click', () => {
    showToast({ message: 'harborline_finance queued', variant: 'success' });
  });
}

