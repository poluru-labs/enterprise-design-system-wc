import { showToast, todayISO, formatCount, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import { pageHeader, metricStripCells, sparklineSvg } from '../components/widgets.js';
import {
  activity,
  alertItems,
  briefItems,
  datasetOptions,
  kpis,
  onboardingSteps,
  ownerOptions,
  productName,
  queryResultColumns,
  queryResultRows,
  querySteps,
  rangeOptions,
  recentWorkbooks,
  reportColumns,
  reportRows,
  reportSuggestions,
  sqlSample,
  timezoneOptions,
  treeItems,
  currentUser,
  workspace,
  workspaceFacts,
} from '../data/index.js';
import {
  hydrateCollections,
  hydrateForecasts,
  hydrateGoals,
  hydrateJobs,
  hydrateLineage,
  hydrateOverviewExtras,
  hydrateSources,
  hydrateTeam,
  hydrateUsage,
  renderCollections,
  renderForecasts,
  renderGoals,
  renderJobs,
  renderLineage,
  renderOverviewExtras,
  renderSources,
  renderTeam,
  renderUsage,
} from './features.js';
import {
  hydrateAnomalies,
  hydrateAsk,
  hydrateAudit,
  hydrateQuality,
  hydrateSubscriptions,
  hydrateWatchlist,
  renderAnomalies,
  renderAsk,
  renderAudit,
  renderQuality,
  renderSubscriptions,
  renderWatchlist,
} from './insights.js';
import { hydrateSearch, renderSearch, searchQueryFromHash } from './search.js';

const PAGE_SIZE = 5;

export const viewState = {
  reportPage: 1,
  reportQuery: '',
  range: '30d',
  selectedNode: 'finance-scorecard',
};

export function renderOverview() {
  return `
    ${pageHeader(
      workspace.name,
      'Overview',
      `Certified metrics, one quality watch, and the Friday board pack. Warehouse refreshed ${workspace.freshness}.`,
      `
        <eds-split-button id="overview-export" label="Export pack" variant="primary" icon="download">
          <eds-menu-item label="PDF board pack" value="pdf" icon="file"></eds-menu-item>
          <eds-menu-item label="CSV metrics" value="csv" icon="download"></eds-menu-item>
          <eds-menu-item label="Copy share link" value="link" icon="link"></eds-menu-item>
        </eds-split-button>
        <eds-tooltip content="Refresh certified marts">
          <eds-button id="overview-refresh" variant="secondary" icon="refresh">Refresh</eds-button>
        </eds-tooltip>
      `,
    )}
    <eds-alert
      variant="warning"
      title="Support freshness failed"
      message="Zendesk is 18 minutes behind a 10-minute test. The finance mart is current. Diya Shah owns the ticket source."
      dismissible
    ></eds-alert>
    <section class="metric-strip" aria-label="Key metrics">
      ${metricStripCells(kpis.length)}
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        <eds-card class="chart-card" padded>
          <div class="section-title">
            <h2>Net revenue run-rate</h2>
            <eds-badge label="Live" variant="brand" pill></eds-badge>
          </div>
          ${sparklineSvg('Revenue trend for the last twelve weeks')}
          <div class="status-row mt-3">
            <eds-status variant="success" label="Models healthy" pulse></eds-status>
            <eds-status variant="info" label="12 weeks loaded"></eds-status>
            <eds-tag label="Finance" variant="brand" icon="folder"></eds-tag>
            <eds-tag label="Certified" variant="success" icon="check"></eds-tag>
          </div>
        </eds-card>
      </div>
      <div class="col-lg-4">
        <eds-card elevated padded>
          <div class="section-title"><h2>Operational health</h2></div>
          <div class="stack">
            <eds-progress-bar value="96" max="100" label="Pipeline success" show-value></eds-progress-bar>
            <eds-circular-progress value="99.1" max="100" show-value size="88"></eds-circular-progress>
            <eds-meter value="68" min="0" max="100" low="40" high="80" optimum="55" label="Warehouse capacity" show-value></eds-meter>
          </div>
        </eds-card>
      </div>
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-7">
        <eds-card elevated padded>
          <div class="section-title"><h2>Recent pipeline activity</h2></div>
          <eds-timeline id="activity-timeline"></eds-timeline>
        </eds-card>
      </div>
      <div class="col-lg-5">
        <eds-card elevated padded>
          <div class="section-title"><h2>Workspace</h2></div>
          <eds-description-list id="workspace-facts"></eds-description-list>
          <eds-divider label="or" spacing="md"></eds-divider>
          <p class="muted mb-2">Open lineage, collections, or a saved report.</p>
          <div class="inline-actions">
            <eds-link href="#/lineage" variant="default">Lineage</eds-link>
            <eds-link href="#/collections" variant="subtle">Collections</eds-link>
            <eds-link href="#/jobs" variant="subtle">Jobs</eds-link>
          </div>
        </eds-card>
      </div>
    </section>
    <section class="row g-3 mt-1">
      <div class="col-12">
        <eds-card padded>
          <div class="section-title">
            <h2>Today’s brief</h2>
            <eds-link href="#/alerts" variant="subtle">Alerts</eds-link>
          </div>
          <eds-list id="brief-list" divided></eds-list>
        </eds-card>
      </div>
    </section>
    ${renderOverviewExtras()}
  `;
}

export function renderReports() {
  return `
    ${pageHeader(
      'Catalog',
      'Reports',
      'Search, filter, and page through certified scorecards.',
      `
        <eds-button id="open-filters" variant="secondary" icon="filter">Filters</eds-button>
        <eds-button id="subscribe-report" variant="secondary" icon="mail">Subscribe</eds-button>
        <eds-button id="refresh-reports" variant="tertiary" icon="refresh">Reload</eds-button>
      `,
    )}
    <eds-card elevated padded>
      <div class="filter-bar">
        <eds-search id="report-search" placeholder="Filter by name or owner" clearable></eds-search>
        <eds-autocomplete id="report-auto" label="Jump to report" placeholder="Start typing a title"></eds-autocomplete>
        <eds-combobox id="report-dataset" label="Dataset" placeholder="Choose a mart"></eds-combobox>
        <eds-select id="report-owner" label="Owner"></eds-select>
        <eds-date-range-picker id="report-range" label="Date range"></eds-date-range-picker>
        <eds-date-picker id="as-of" label="As of"></eds-date-picker>
        <eds-segmented-control id="range-seg"></eds-segmented-control>
      </div>
      <div class="tag-row mt-3">
        <eds-tag label="Certified only" variant="brand" dismissible icon="check"></eds-tag>
        <eds-tag label="Finance" variant="neutral" dismissible></eds-tag>
        <eds-tag label="Last 30 days" variant="info" dismissible icon="calendar"></eds-tag>
      </div>
      <div id="report-loading" class="stack mt-3" hidden>
        <eds-spinner size="md" label="Refreshing catalog" show-label></eds-spinner>
        <eds-skeleton variant="text" lines="4"></eds-skeleton>
      </div>
      <div id="report-table-wrap" class="mt-3">
        <eds-data-table id="report-table" sortable striped compact></eds-data-table>
        <div class="d-flex justify-content-between align-items-center mt-3">
          <span id="report-count" class="muted"></span>
          <eds-pagination id="report-pager" page-size="${PAGE_SIZE}" sibling-count="1"></eds-pagination>
        </div>
      </div>
      <eds-empty-state
        id="report-empty"
        hidden
        heading="No reports match"
        description="Clear filters or search a certified title."
        icon="search"
      >
        <eds-button id="clear-filters" slot="actions" variant="primary">Reset filters</eds-button>
      </eds-empty-state>
    </eds-card>
  `;
}

export function renderExplorer() {
  return `
    ${pageHeader('Lineage', 'Explorer', 'Navigate certified folders, preview SQL, and inspect schema.')}
    <div class="row g-3">
      <div class="col-lg-4">
        <eds-card elevated padded>
          <div class="section-title"><h2>Folders</h2></div>
          <eds-tree-view id="model-tree"></eds-tree-view>
        </eds-card>
        <eds-card class="mt-3" elevated padded>
          <div class="section-title"><h2>Recent workbooks</h2></div>
          <eds-list id="recent-books" divided></eds-list>
        </eds-card>
      </div>
      <div class="col-lg-8">
        <eds-card elevated padded>
          <eds-toolbar bordered>
            <span slot="start">Executive scorecard</span>
            <eds-button-group slot="end" size="sm">
              <eds-button variant="secondary" icon="copy" id="copy-sql">Copy SQL</eds-button>
              <eds-button variant="secondary" icon="star" id="pin-workbook">Pin</eds-button>
            </eds-button-group>
          </eds-toolbar>
          <eds-tabs id="explorer-tabs" class="mt-3">
            <eds-tab label="Preview" active>
              <div class="bars" aria-hidden="true">
                <span style="--h:42%"></span>
                <span style="--h:58%"></span>
                <span style="--h:51%"></span>
                <span style="--h:73%"></span>
                <span style="--h:66%"></span>
                <span style="--h:88%"></span>
                <span style="--h:79%"></span>
              </div>
              <p class="muted mt-3 mb-0">Weekly active accounts vs certified target.</p>
            </eds-tab>
            <eds-tab label="SQL">
              <eds-code-snippet id="sql-snippet" language="sql" label="Certified query"></eds-code-snippet>
            </eds-tab>
            <eds-tab label="Lineage">
              <eds-accordion single>
                <eds-accordion-item heading="Upstream sources" open>
                  <p class="mb-0">finance.subscription_facts · product.account_dim · billing.invoices</p>
                </eds-accordion-item>
                <eds-accordion-item heading="Tests">
                  <p class="mb-0">not_null account_id · accepted_values status · relationships to accounts</p>
                </eds-accordion-item>
                <eds-accordion-item heading="Owners">
                  <p class="mb-0">Analytics engineering · Finance business owner ${currentUser.name}</p>
                </eds-accordion-item>
              </eds-accordion>
            </eds-tab>
          </eds-tabs>
        </eds-card>
      </div>
    </div>
  `;
}

export function renderQuery() {
  return `
    ${pageHeader('Authoring', 'Query lab', 'Draft, validate, schedule, and publish a governed query.')}
    <eds-stepper id="query-steps" class="mb-3"></eds-stepper>
    <div class="row g-3">
      <div class="col-lg-8">
        <eds-card elevated padded>
          <eds-input id="query-name" label="Query name" value="Weekly NRR by cohort" icon="edit" required></eds-input>
          <eds-textarea
            id="query-sql"
            class="mt-3"
            label="SQL"
            rows="8"
            hint="Read-only warehouse role. Cost estimate runs on validate."
          ></eds-textarea>
          <div class="filter-bar mt-3">
            <eds-number-input id="row-limit" label="Row limit" value="500" min="50" max="5000" step="50"></eds-number-input>
            <eds-slider id="timeout" label="Timeout (seconds)" min="15" max="180" step="15" value="60" show-value></eds-slider>
            <eds-time-picker id="run-at" label="Schedule time" value="08:00" hint="Workspace timezone"></eds-time-picker>
          </div>
          <div class="filter-bar mt-3">
            <eds-checkbox id="dry-run" label="Dry run first" checked></eds-checkbox>
            <eds-switch id="cache-results" label="Cache results" checked></eds-switch>
          </div>
          <eds-radio-group id="materialize" class="mt-3" label="Materialization" name="materialize" value="view" orientation="horizontal">
            <eds-radio label="View" value="view"></eds-radio>
            <eds-radio label="Table" value="table"></eds-radio>
            <eds-radio label="Incremental" value="incremental"></eds-radio>
          </eds-radio-group>
          <eds-file-upload
            class="mt-3"
            id="query-files"
            label="Attach supporting CSV"
            accept=".csv,.json"
            multiple
            hint="Optional seed files. Max 8 MB each."
            icon="upload"
          ></eds-file-upload>
          <div class="inline-actions mt-3">
            <eds-button id="validate-query" variant="secondary" icon="check">Validate</eds-button>
            <eds-button id="run-query" variant="primary" icon="search">Run</eds-button>
            <span class="muted">Shortcuts <eds-kbd keys="⌘ Enter"></eds-kbd></span>
          </div>
        </eds-card>
      </div>
      <div class="col-lg-4">
        <eds-card elevated padded>
          <div class="section-title"><h2>Publish gate</h2></div>
          <p class="muted">Enter the 6-digit change-control PIN from your analytics lead.</p>
          <eds-pin-input id="publish-pin" length="6" type="number" label="Publish PIN"></eds-pin-input>
          <eds-button id="publish-query" class="mt-3" variant="primary" icon="save" full-width>Publish</eds-button>
        </eds-card>
      </div>
    </div>
    <eds-card id="query-results-card" class="mt-3" elevated padded hidden>
      <div class="section-title">
        <h2>Results</h2>
        <eds-badge label="5 rows" variant="brand" pill></eds-badge>
      </div>
      <eds-data-table id="query-results" sortable striped compact></eds-data-table>
    </eds-card>
  `;
}

export function renderAlerts() {
  return `
    ${pageHeader(
      'Monitoring',
      'Alerts',
      'Thresholds, subscriptions, and incident routing.',
      `
        <eds-popover heading="Severity guide">
          <eds-button slot="trigger" variant="tertiary" icon="info">Guide</eds-button>
          <p class="mb-0">Critical pages on-call. Warning notifies Slack. Info is email only.</p>
        </eds-popover>
        <eds-button id="open-alert-modal" variant="primary" icon="plus">New alert</eds-button>
      `,
    )}
    <div class="row g-3">
      <div class="col-lg-7">
        <eds-card elevated padded>
          <eds-list id="alert-list" divided></eds-list>
        </eds-card>
      </div>
      <div class="col-lg-5">
        <eds-card elevated padded>
          <div class="section-title"><h2>Score this playbook</h2></div>
          <eds-rating id="playbook-rating" value="4" max="5" allow-half></eds-rating>
          <p class="muted mt-2">Help the analytics platform team rank which monitors to keep.</p>
          <eds-button id="save-rating" variant="secondary" icon="save">Save feedback</eds-button>
        </eds-card>
      </div>
    </div>
  `;
}

export function renderSettings() {
  return `
    ${pageHeader('Administration', 'Settings', 'Workspace defaults, density, and account preferences.')}
    <eds-stepper id="onboard-steps" class="mb-3"></eds-stepper>
    <div class="row g-3">
      <div class="col-lg-6">
        <eds-card elevated padded>
          <div class="section-title"><h2>Profile</h2></div>
          <div class="inline-actions mb-3">
            <eds-avatar name="${currentUser.name}" size="lg"></eds-avatar>
            <div>
              <strong>${currentUser.name}</strong>
              <div class="muted">${currentUser.role}</div>
            </div>
          </div>
          <eds-input label="Display name" value="${currentUser.name}" icon="user"></eds-input>
          <eds-input class="mt-3" type="email" label="Notification email" value="${currentUser.email}" icon="mail"></eds-input>
          <eds-switch class="mt-3" id="live-refresh" label="Live refresh on Overview" checked></eds-switch>
          <eds-switch class="mt-3" id="compact-density" label="Compact density"></eds-switch>
        </eds-card>
      </div>
      <div class="col-lg-6">
        <eds-card elevated padded>
          <div class="section-title"><h2>Workspace</h2></div>
          <eds-select id="tz-select" label="Timezone"></eds-select>
          <eds-radio-group id="week-start" class="mt-3" label="Week starts on" name="week" value="monday" orientation="horizontal">
            <eds-radio label="Monday" value="monday"></eds-radio>
            <eds-radio label="Sunday" value="sunday"></eds-radio>
          </eds-radio-group>
          <eds-input class="mt-3" id="api-token" label="Personal access token" value="hx_live_7f3a9c2e" icon="lock" readonly></eds-input>
          <eds-button id="copy-token" class="mt-3" variant="secondary" icon="copy">Copy token</eds-button>
        </eds-card>
      </div>
      <div class="col-lg-6">
        <eds-card elevated padded>
          <div class="section-title"><h2>Icons & accessibility</h2></div>
          <div class="status-row mb-3">
            <eds-icon name="home" size="lg" label="Home"></eds-icon>
            <eds-icon name="bell" size="lg" label="Alerts"></eds-icon>
            <eds-icon name="settings" size="lg" label="Settings"></eds-icon>
            <eds-icon name="lock" size="lg" label="Security"></eds-icon>
          </div>
          <p>
            <eds-visually-hidden>Screen-reader only: ${productName} uses a light background and brand color DA0037.</eds-visually-hidden>
            Focus rings, skip links, and semantic status colors ship with the design system.
          </p>
          <eds-link href="#/legal" variant="subtle">Legal, copyright, and third-party notices</eds-link>
        </eds-card>
      </div>
    </div>
  `;
}

export function renderLegal() {
  return `
    ${pageHeader('Governance', 'Legal & copyright', 'License, attribution, and demo-data notices for this template.')}
    <eds-card elevated padded>
      <article class="legal-copy">
        <h2>Copyright</h2>
        <p>Copyright © 2026 Subrahmanyam Poluru / Poluru Labs. All rights reserved except where the MIT License grants otherwise.</p>
        <h2>Software license</h2>
        <p>This template is licensed under the MIT License. See <code>LICENSE</code>, <code>NOTICE</code>, and <code>AUTHORS</code> in the project root of <code>enterprise-bi-dashboard</code>.</p>
        <h3>Third-party software</h3>
        <ul>
          <li><strong>@poluru-labs/enterprise-design-system-wc</strong> — MIT © Subrahmanyam Poluru / Poluru Labs</li>
          <li><strong>Bootstrap</strong> — MIT © The Bootstrap Authors</li>
          <li><strong>Bootstrap Icons</strong> — MIT © The Bootstrap Authors</li>
          <li><strong>Vite</strong> — MIT © Evan You and Vite contributors</li>
          <li><strong>Lit</strong> (via the design system) — BSD-3-Clause © Google LLC</li>
          <li><strong>Source Sans 3, Source Serif 4, IBM Plex Mono</strong> — SIL Open Font License</li>
        </ul>
        <h3>Demo data</h3>
        <p>All metrics, people, and warehouse names in this template are fictional. Do not treat them as production analytics, financial advice, or personal data.</p>
        <h3>Trademarks</h3>
        <p>${productName} is the product name of this template. Third-party names remain the property of their owners.</p>
      </article>
    </eds-card>
  `;
}

const views = {
  overview: renderOverview,
  reports: renderReports,
  explorer: renderExplorer,
  query: renderQuery,
  goals: renderGoals,
  forecasts: renderForecasts,
  sources: renderSources,
  usage: renderUsage,
  team: renderTeam,
  alerts: renderAlerts,
  lineage: renderLineage,
  collections: renderCollections,
  jobs: renderJobs,
  watchlist: renderWatchlist,
  anomalies: renderAnomalies,
  quality: renderQuality,
  ask: renderAsk,
  subscriptions: renderSubscriptions,
  audit: renderAudit,
  search: renderSearch,
  settings: renderSettings,
  legal: renderLegal,
};

export function renderView(name) {
  return (views[name] ?? renderOverview)();
}

function filteredReports() {
  const query = viewState.reportQuery.trim().toLowerCase();
  if (!query) return reportRows;
  return reportRows.filter((row) =>
    `${row.name} ${row.owner} ${row.domain} ${row.status}`.toLowerCase().includes(query),
  );
}

function paintReports(root) {
  const rows = filteredReports();
  const table = root.querySelector('#report-table');
  const pager = root.querySelector('#report-pager');
  const empty = root.querySelector('#report-empty');
  const wrap = root.querySelector('#report-table-wrap');
  const count = root.querySelector('#report-count');
  const total = rows.length;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  viewState.reportPage = Math.min(viewState.reportPage, pages);
  const start = (viewState.reportPage - 1) * PAGE_SIZE;
  if (table) {
    table.columns = reportColumns;
    table.rows = rows.slice(start, start + PAGE_SIZE);
  }
  if (pager) {
    pager.page = viewState.reportPage;
    pager.total = total;
    pager.pageSize = PAGE_SIZE;
  }
  if (count) count.textContent = `${formatCount(total)} reports`;
  const noRows = total === 0;
  if (empty) empty.hidden = !noRows;
  if (wrap) wrap.hidden = noRows;
}

export function hydrateView(root, name) {
  if (name === 'overview') {
    kpis.forEach((kpi, index) => Object.assign(root.querySelector(`#kpi-${index}`) ?? {}, kpi));
    const timeline = root.querySelector('#activity-timeline');
    if (timeline) timeline.items = activity;
    const facts = root.querySelector('#workspace-facts');
    if (facts) {
      facts.items = workspaceFacts;
      facts.columns = 2;
    }
    const brief = root.querySelector('#brief-list');
    if (brief) brief.items = briefItems;
    brief?.addEventListener('eds-select', (event) => {
      const href = event.detail?.href ?? event.detail?.item?.href;
      if (href) window.location.hash = href;
    });
    root.querySelector('#overview-export')?.addEventListener('eds-click', () => {
      showToast({ message: 'Board pack exported', variant: 'success' });
    });
    root.querySelector('#overview-export')?.addEventListener('eds-select', (event) => {
      showToast({ message: `Exported as ${event.detail.value}`, variant: 'success' });
    });
    root.querySelector('#overview-refresh')?.addEventListener('eds-click', () => {
      showToast({ message: 'Certified marts refreshed', variant: 'info' });
    });
    hydrateOverviewExtras(root);
  }

  if (name === 'reports') {
    const auto = root.querySelector('#report-auto');
    if (auto) auto.suggestions = reportSuggestions;
    const combo = root.querySelector('#report-dataset');
    if (combo) combo.options = datasetOptions;
    const select = root.querySelector('#report-owner');
    if (select) select.options = ownerOptions;
    const seg = root.querySelector('#range-seg');
    if (seg) {
      seg.options = rangeOptions;
      seg.value = viewState.range;
    }
    const range = root.querySelector('#report-range');
    if (range) {
      range.endValue = todayISO();
      range.startValue = todayISO();
    }
    const asOf = root.querySelector('#as-of');
    if (asOf) asOf.value = todayISO();
    paintReports(root);
    root.querySelector('#report-search')?.addEventListener('eds-input', (event) => {
      viewState.reportQuery = event.detail?.value ?? event.target.value ?? '';
      viewState.reportPage = 1;
      paintReports(root);
    });
    root.querySelector('#report-search')?.addEventListener('eds-clear', () => {
      viewState.reportQuery = '';
      viewState.reportPage = 1;
      paintReports(root);
    });
    root.querySelector('#report-pager')?.addEventListener('eds-change', (event) => {
      viewState.reportPage = event.detail?.page ?? event.target.page;
      paintReports(root);
    });
    root.querySelector('#range-seg')?.addEventListener('eds-change', (event) => {
      viewState.range = event.detail?.value ?? event.target.value;
      showToast({ message: `Range set to ${viewState.range}`, variant: 'info' });
    });
    root.querySelector('#open-filters')?.addEventListener('eds-click', () => {
      document.querySelector('#filter-drawer')?.show();
    });
    root.querySelector('#clear-filters')?.addEventListener('eds-click', () => {
      viewState.reportQuery = '';
      viewState.reportPage = 1;
      const search = root.querySelector('#report-search');
      if (search) search.value = '';
      paintReports(root);
    });
    root.querySelector('#refresh-reports')?.addEventListener('eds-click', () => {
      const loading = root.querySelector('#report-loading');
      const wrap = root.querySelector('#report-table-wrap');
      if (loading) loading.hidden = false;
      if (wrap) wrap.hidden = true;
      window.setTimeout(() => {
        if (loading) loading.hidden = true;
        paintReports(root);
        showToast({ message: 'Catalog reloaded', variant: 'success' });
      }, 700);
    });
    root.querySelector('#subscribe-report')?.addEventListener('eds-click', () => {
      window.location.hash = '#/subscriptions';
      showToast({ message: 'Open a subscription for this catalog', variant: 'info' });
    });
  }

  if (name === 'explorer') {
    const tree = root.querySelector('#model-tree');
    if (tree) {
      tree.items = treeItems;
      tree.selectedId = viewState.selectedNode;
      tree.expandedIds = { finance: true, growth: true, platform: true };
    }
    const list = root.querySelector('#recent-books');
    if (list) list.items = recentWorkbooks;
    const snippet = root.querySelector('#sql-snippet');
    if (snippet) snippet.code = sqlSample;
    root.querySelector('#copy-sql')?.addEventListener('eds-click', () => {
      showToast({ message: 'SQL copied to clipboard', variant: 'success' });
    });
    root.querySelector('#pin-workbook')?.addEventListener('eds-click', () => {
      showToast({ message: 'Workbook pinned to Overview', variant: 'success' });
    });
    tree?.addEventListener('eds-select', (event) => {
      viewState.selectedNode = event.detail?.id ?? event.detail?.value ?? viewState.selectedNode;
    });
  }

  if (name === 'query') {
    const steps = root.querySelector('#query-steps');
    if (steps) {
      steps.steps = querySteps;
      steps.current = 1;
    }
    const sql = root.querySelector('#query-sql');
    if (sql) sql.value = sqlSample;
    root.querySelector('#validate-query')?.addEventListener('eds-click', () => {
      showToast({ message: 'Query cost is within budget', variant: 'success' });
    });
    root.querySelector('#run-query')?.addEventListener('eds-click', () => {
      const card = root.querySelector('#query-results-card');
      const table = root.querySelector('#query-results');
      if (table) {
        table.columns = queryResultColumns;
        table.rows = queryResultRows;
      }
      if (card) card.hidden = false;
      showToast({ message: 'Query returned 5 rows', variant: 'success' });
    });
    root.querySelector('#publish-pin')?.addEventListener('eds-complete', () => {
      showToast({ message: 'PIN accepted. Ready to publish.', variant: 'success' });
    });
    root.querySelector('#publish-query')?.addEventListener('eds-click', () => {
      showToast({ message: 'Query published to Explorer', variant: 'success' });
    });
    root.querySelector('#query-files')?.addEventListener('eds-change', (event) => {
      const files = event.detail?.files ?? [];
      showToast({ message: `${files.length} file(s) attached`, variant: 'info' });
    });
  }

  if (name === 'alerts') {
    const list = root.querySelector('#alert-list');
    if (list) list.items = alertItems;
    root.querySelector('#open-alert-modal')?.addEventListener('eds-click', () => {
      document.querySelector('#share-modal')?.show();
    });
    root.querySelector('#save-rating')?.addEventListener('eds-click', () => {
      const rating = root.querySelector('#playbook-rating')?.value ?? 0;
      showToast({ message: `Thanks — scored ${rating}/5`, variant: 'success' });
    });
  }

  if (name === 'settings') {
    const steps = root.querySelector('#onboard-steps');
    if (steps) {
      steps.steps = onboardingSteps;
      steps.current = 2;
    }
    root.querySelector('#compact-density')?.addEventListener('eds-change', (event) => {
      const checked = event.detail?.checked ?? event.target.checked;
      setDensity(checked ? 'compact' : 'comfortable');
      showToast({ message: checked ? 'Compact density on' : 'Comfortable density on', variant: 'info' });
    });
    root.querySelector('#live-refresh')?.addEventListener('eds-change', (event) => {
      const checked = event.detail?.checked ?? event.target.checked;
      showToast({ message: checked ? 'Live refresh enabled' : 'Live refresh paused', variant: 'info' });
    });
    const tz = root.querySelector('#tz-select');
    if (tz) {
      tz.options = timezoneOptions;
      tz.value = 'ny';
    }
    root.querySelector('#copy-token')?.addEventListener('eds-click', () => {
      showToast({ message: 'Token copied to clipboard', variant: 'success' });
    });
    root.querySelector('#week-start')?.addEventListener('eds-change', (event) => {
      showToast({ message: `Week starts on ${event.detail?.value ?? event.target.value}`, variant: 'info' });
    });
  }

  if (name === 'goals') hydrateGoals(root);
  if (name === 'forecasts') hydrateForecasts(root);
  if (name === 'sources') hydrateSources(root);
  if (name === 'usage') hydrateUsage(root);
  if (name === 'team') hydrateTeam(root);
  if (name === 'watchlist') hydrateWatchlist(root);
  if (name === 'anomalies') hydrateAnomalies(root);
  if (name === 'quality') hydrateQuality(root);
  if (name === 'ask') hydrateAsk(root);
  if (name === 'subscriptions') hydrateSubscriptions(root);
  if (name === 'audit') hydrateAudit(root);
  if (name === 'search') hydrateSearch(root, searchQueryFromHash());
  if (name === 'lineage') hydrateLineage(root);
  if (name === 'collections') hydrateCollections(root);
  if (name === 'jobs') hydrateJobs(root);
}
