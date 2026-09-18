import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { contentCard } from '../components/content-card.js';
import { pageHeader } from '../components/widgets.js';
import {
  anomalyColumns,
  anomalyRows,
  askAnswers,
  askPrompts,
  auditColumns,
  auditRows,
  qualityColumns,
  qualityRows,
  subscriptionColumns,
  subscriptionRows,
  watchMetrics,
} from '../data/index.js';

export function renderWatchlist() {
  return `
    ${pageHeader(
      'Insights',
      'Watchlist',
      'Live certified metrics you follow across Finance, Growth, and Platform.',
      `<eds-button id="add-watch" variant="primary" icon="plus">Add metric</eds-button>`,
    )}
    <section class="row g-3 stretch-row" aria-label="Watched metrics">
      ${watchMetrics
        .map(
          (metric, index) => `
        <div class="col-sm-6 col-xl-3">
          ${contentCard(`
            <eds-stat id="watch-${index}"></eds-stat>
            <div class="inline-actions mt-2">
              <eds-button class="unmute-watch" variant="tertiary" size="sm" icon="bell" data-metric="${metric.label}">Mute</eds-button>
              <eds-link href="#/anomalies" variant="subtle">Anomalies</eds-link>
            </div>
          `)}
        </div>`,
        )
        .join('')}
    </section>
  `;
}

export function hydrateWatchlist(root) {
  watchMetrics.forEach((metric, index) => {
    Object.assign(root.querySelector(`#watch-${index}`) ?? {}, {
      label: metric.label,
      value: metric.value,
      hint: metric.delta,
      trend: metric.trend,
      trendValue: metric.delta,
    });
  });
  root.querySelector('#add-watch')?.addEventListener('eds-click', () => {
    document.querySelector('#share-modal')?.show();
  });
  root.querySelectorAll('.unmute-watch').forEach((button) => {
    button.addEventListener('eds-click', () => {
      showToast({ message: `${button.dataset.metric} muted for 24 hours`, variant: 'info' });
    });
  });
}

export function renderAnomalies() {
  return `
    ${pageHeader(
      'Insights',
      'Anomalies',
      'Statistical breaks on certified metrics, routed to owners.',
      `
        <eds-segmented-control id="anomaly-sev"></eds-segmented-control>
        <eds-button id="ack-anomalies" variant="secondary" icon="check">Ack visible</eds-button>
      `,
    )}
    <eds-alert
      variant="warning"
      title="Zendesk latency is degraded"
      message="Freshness test failed at 18m. Diya Shah is paged on Slack."
      dismissible
    ></eds-alert>
    <eds-card class="mt-3" elevated padded>
      <eds-data-table id="anomaly-table" sortable striped compact></eds-data-table>
    </eds-card>
  `;
}

export function hydrateAnomalies(root) {
  const table = root.querySelector('#anomaly-table');
  const paint = (severity = 'all') => {
    if (!table) return;
    table.columns = anomalyColumns;
    table.rows =
      severity === 'all' ? anomalyRows : anomalyRows.filter((row) => row.severity.toLowerCase() === severity);
  };
  paint();
  const sev = root.querySelector('#anomaly-sev');
  if (sev) {
    sev.options = [
      { label: 'All', value: 'all' },
      { label: 'High', value: 'high' },
      { label: 'Medium', value: 'medium' },
      { label: 'Low', value: 'low' },
    ];
    sev.value = 'all';
    sev.addEventListener('eds-change', (event) => paint((event.detail?.value ?? event.target.value).toLowerCase()));
  }
  root.querySelector('#ack-anomalies')?.addEventListener('eds-click', () => {
    showToast({ message: 'Visible anomalies acknowledged', variant: 'success' });
  });
}

export function renderQuality() {
  return `
    ${pageHeader(
      'Insights',
      'Quality',
      'dbt tests, freshness SLAs, and schema drift on certified models.',
      `<eds-button id="run-tests" variant="primary" icon="refresh">Run tests</eds-button>`,
    )}
    <div class="row g-3 mb-3 stretch-row">
      <div class="col-sm-6 col-xl-3">
        ${contentCard(`<eds-stat label="Passing tests" value="14/16" hint="87.5% this run" trend="down" trend-value="-1"></eds-stat>`)}
      </div>
      <div class="col-sm-6 col-xl-3">
        ${contentCard(`<eds-progress-bar value="87" max="100" label="Suite success" show-value></eds-progress-bar>`)}
      </div>
      <div class="col-sm-6 col-xl-3">
        ${contentCard(`
          <eds-status variant="warning" label="1 freshness fail · 1 schema warn" pulse></eds-status>
          <p class="muted mt-2 mb-0">Support tickets is over the 15m SLA.</p>
        `)}
      </div>
      <div class="col-sm-6 col-xl-3">
        ${contentCard(`
          <eds-stat label="Models certified" value="18" hint="2 need review" trend="flat" trend-value="Stable"></eds-stat>
          <p class="muted mt-2 mb-0">Last full suite run Aug 31, 2026 at 22:10.</p>
        `)}
      </div>
    </div>
    <eds-card elevated padded>
      <eds-data-table id="quality-table" sortable striped compact></eds-data-table>
    </eds-card>
  `;
}

export function hydrateQuality(root) {
  const table = root.querySelector('#quality-table');
  if (table) {
    table.columns = qualityColumns;
    table.rows = qualityRows;
  }
  root.querySelector('#run-tests')?.addEventListener('eds-click', () => {
    showToast({ message: 'Quality suite queued on HELIX_WH_M', variant: 'info' });
  });
}

export function renderAsk() {
  return `
    ${pageHeader('Insights', 'Ask', 'Ask a question in plain language against certified metrics.')}
    <div class="row g-3">
      <div class="col-lg-7">
        <eds-card elevated padded>
          <eds-input id="ask-input" label="Question" placeholder="Why did activation drop this week?" icon="search"></eds-input>
          <div class="tag-row mt-3" id="ask-prompts"></div>
          <eds-button id="ask-run" class="mt-3" variant="primary" icon="search">Ask</eds-button>
          <eds-divider class="mt-3" label="answer" spacing="md"></eds-divider>
          <div id="ask-answer" class="ask-answer muted">Pick a prompt or type a question. Answers stay on certified marts only.</div>
        </eds-card>
      </div>
      <div class="col-lg-5">
        <eds-card elevated padded>
          <div class="section-title"><h2>Grounding</h2></div>
          <eds-list id="ask-grounding" divided></eds-list>
        </eds-card>
      </div>
    </div>
  `;
}

export function hydrateAsk(root) {
  const prompts = root.querySelector('#ask-prompts');
  if (prompts) {
    prompts.innerHTML = askPrompts
      .map((prompt) => `<eds-tag class="ask-prompt" label="${prompt}" variant="neutral" data-prompt="${prompt}"></eds-tag>`)
      .join('');
  }
  const grounding = root.querySelector('#ask-grounding');
  if (grounding) {
    grounding.items = [
      { label: 'subscription_facts', description: 'Certified · Finance', icon: 'check' },
      { label: 'product_events', description: 'Certified · Product', icon: 'check' },
      { label: 'support_tickets', description: 'Degraded freshness', icon: 'warning' },
    ];
  }
  const answer = (question) => {
    const input = root.querySelector('#ask-input');
    if (input) input.value = question;
    const node = root.querySelector('#ask-answer');
    if (node) {
      node.classList.remove('muted');
      node.textContent = askAnswers[question] ?? 'No certified metric matched that question. Try a prompt from the list.';
    }
    showToast({ message: 'Answer grounded on certified marts', variant: 'success' });
  };
  root.querySelector('#ask-run')?.addEventListener('eds-click', () => {
    const question = root.querySelector('#ask-input')?.value || askPrompts[0];
    answer(question);
  });
  root.querySelectorAll('.ask-prompt').forEach((tag) => {
    tag.addEventListener('click', () => answer(tag.dataset.prompt));
  });
}

export function renderSubscriptions() {
  return `
    ${pageHeader(
      'Deliver',
      'Subscriptions',
      'Email and Slack deliveries of certified packs.',
      `<eds-button id="new-sub" variant="primary" icon="plus">New subscription</eds-button>`,
    )}
    <eds-card elevated padded>
      <eds-data-table id="sub-table" sortable striped compact></eds-data-table>
    </eds-card>
  `;
}

export function hydrateSubscriptions(root) {
  const table = root.querySelector('#sub-table');
  if (table) {
    table.columns = subscriptionColumns;
    table.rows = subscriptionRows;
  }
  root.querySelector('#new-sub')?.addEventListener('eds-click', () => {
    document.querySelector('#share-modal')?.show();
    showToast({ message: 'Set channel and cadence in the dialog', variant: 'info' });
  });
}

export function renderAudit() {
  return `
    ${pageHeader(
      'Deliver',
      'Audit',
      'Who exported, published, or acknowledged work in this workspace.',
      `<eds-button id="export-audit" variant="secondary" icon="download">Export CSV</eds-button>`,
    )}
    <eds-card elevated padded>
      <eds-search id="audit-search" placeholder="Filter by actor or action" clearable></eds-search>
      <div class="mt-3">
        <eds-data-table id="audit-table" sortable striped compact></eds-data-table>
      </div>
    </eds-card>
  `;
}

export function hydrateAudit(root) {
  const table = root.querySelector('#audit-table');
  const paint = (query = '') => {
    if (!table) return;
    table.columns = auditColumns;
    table.rows = auditRows.filter((row) =>
      `${row.actor} ${row.action} ${row.target}`.toLowerCase().includes(query.toLowerCase()),
    );
  };
  paint();
  root.querySelector('#audit-search')?.addEventListener('eds-input', (event) => {
    paint(event.detail?.value ?? event.target.value ?? '');
  });
  root.querySelector('#export-audit')?.addEventListener('eds-click', () => {
    showToast({ message: 'Audit CSV exported', variant: 'success' });
  });
}
