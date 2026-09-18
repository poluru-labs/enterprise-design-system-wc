export const productName = 'Helix Analytics';

export const currentUser = {
  name: 'Ananya Reddy',
  email: 'ananya.reddy@harborline.example',
  role: 'Workspace admin · Finance',
};

export const workspace = {
  name: 'Harborline Analytics',
  region: 'US-East',
  warehouse: 'HELIX_WH_XL',
  freshness: '2 minutes ago',
  lastRefresh: '2026-09-01T20:38:00.000Z',
  sources: 18,
};

export const anomalyCount = 4;

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'home' },
  { label: 'Reports', href: '#/reports', icon: 'file' },
  { label: 'Search', href: '#/search', icon: 'search' },
  {
    label: 'Explorer',
    href: '#/explorer',
    icon: 'folder',
    children: [
      { label: 'Workbooks', href: '#/explorer' },
      { label: 'Lineage', href: '#/lineage' },
    ],
  },
  { label: 'Query lab', href: '#/query', icon: 'search' },
  {
    label: 'Planning',
    icon: 'star',
    children: [
      { label: 'Goals', href: '#/goals' },
      { label: 'Forecasts', href: '#/forecasts' },
    ],
  },
  {
    label: 'Platform',
    icon: 'link',
    children: [
      { label: 'Sources', href: '#/sources' },
      { label: 'Jobs', href: '#/jobs' },
      { label: 'Usage', href: '#/usage' },
      { label: 'Team', href: '#/team' },
    ],
  },
  { label: 'Alerts', href: '#/alerts', icon: 'bell' },
  {
    label: 'Insights',
    icon: 'eye',
    children: [
      { label: 'Watchlist', href: '#/watchlist' },
      { label: 'Anomalies', href: '#/anomalies' },
      { label: 'Quality', href: '#/quality' },
      { label: 'Ask', href: '#/ask' },
    ],
  },
  {
    label: 'Deliver',
    icon: 'mail',
    children: [
      { label: 'Collections', href: '#/collections' },
      { label: 'Subscriptions', href: '#/subscriptions' },
      { label: 'Audit', href: '#/audit' },
    ],
  },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const routes = {
  overview: {
    title: 'Overview',
    crumbs: [
      { label: 'Workspace', href: '#/overview' },
      { label: 'Overview' },
    ],
  },
  reports: {
    title: 'Reports',
    crumbs: [
      { label: 'Workspace', href: '#/overview' },
      { label: 'Reports' },
    ],
  },
  search: {
    title: 'Search',
    crumbs: [
      { label: 'Workspace', href: '#/overview' },
      { label: 'Search' },
    ],
  },
  explorer: {
    title: 'Explorer',
    crumbs: [
      { label: 'Workspace', href: '#/overview' },
      { label: 'Explorer' },
    ],
  },
  lineage: {
    title: 'Lineage',
    crumbs: [
      { label: 'Workspace', href: '#/overview' },
      { label: 'Explorer', href: '#/explorer' },
      { label: 'Lineage' },
    ],
  },
  jobs: {
    title: 'Jobs',
    crumbs: [
      { label: 'Workspace', href: '#/overview' },
      { label: 'Platform', href: '#/sources' },
      { label: 'Jobs' },
    ],
  },
  collections: {
    title: 'Collections',
    crumbs: [
      { label: 'Workspace', href: '#/overview' },
      { label: 'Deliver', href: '#/subscriptions' },
      { label: 'Collections' },
    ],
  },
  query: {
    title: 'Query lab',
    crumbs: [
      { label: 'Workspace', href: '#/overview' },
      { label: 'Query lab' },
    ],
  },
  goals: {
    title: 'Goals',
    crumbs: [
      { label: 'Workspace', href: '#/overview' },
      { label: 'Planning', href: '#/goals' },
      { label: 'Goals' },
    ],
  },
  forecasts: {
    title: 'Forecasts',
    crumbs: [
      { label: 'Workspace', href: '#/overview' },
      { label: 'Planning', href: '#/forecasts' },
      { label: 'Forecasts' },
    ],
  },
  sources: {
    title: 'Sources',
    crumbs: [
      { label: 'Workspace', href: '#/overview' },
      { label: 'Platform', href: '#/sources' },
      { label: 'Sources' },
    ],
  },
  usage: {
    title: 'Usage',
    crumbs: [
      { label: 'Workspace', href: '#/overview' },
      { label: 'Platform', href: '#/usage' },
      { label: 'Usage' },
    ],
  },
  team: {
    title: 'Team',
    crumbs: [
      { label: 'Workspace', href: '#/overview' },
      { label: 'Platform', href: '#/team' },
      { label: 'Team' },
    ],
  },
  alerts: {
    title: 'Alerts',
    crumbs: [
      { label: 'Workspace', href: '#/overview' },
      { label: 'Alerts' },
    ],
  },
  watchlist: {
    title: 'Watchlist',
    crumbs: [
      { label: 'Workspace', href: '#/overview' },
      { label: 'Insights', href: '#/watchlist' },
      { label: 'Watchlist' },
    ],
  },
  anomalies: {
    title: 'Anomalies',
    crumbs: [
      { label: 'Workspace', href: '#/overview' },
      { label: 'Insights', href: '#/anomalies' },
      { label: 'Anomalies' },
    ],
  },
  quality: {
    title: 'Quality',
    crumbs: [
      { label: 'Workspace', href: '#/overview' },
      { label: 'Insights', href: '#/quality' },
      { label: 'Quality' },
    ],
  },
  ask: {
    title: 'Ask',
    crumbs: [
      { label: 'Workspace', href: '#/overview' },
      { label: 'Insights', href: '#/ask' },
      { label: 'Ask' },
    ],
  },
  subscriptions: {
    title: 'Subscriptions',
    crumbs: [
      { label: 'Workspace', href: '#/overview' },
      { label: 'Deliver', href: '#/subscriptions' },
      { label: 'Subscriptions' },
    ],
  },
  audit: {
    title: 'Audit',
    crumbs: [
      { label: 'Workspace', href: '#/overview' },
      { label: 'Deliver', href: '#/audit' },
      { label: 'Audit' },
    ],
  },
  settings: {
    title: 'Settings',
    crumbs: [
      { label: 'Workspace', href: '#/overview' },
      { label: 'Settings' },
    ],
  },
  legal: {
    title: 'Legal',
    crumbs: [
      { label: 'Workspace', href: '#/overview' },
      { label: 'Legal' },
    ],
  },
};

export const kpis = [
  { label: 'Reports viewed', value: '4,862', hint: 'Across 48 analysts', trend: 'up', trendValue: '+21.4%' },
  { label: 'Data quality', value: '99.1%', hint: '18 connected sources', trend: 'up', trendValue: '+0.4 pts' },
  { label: 'Insights shared', value: '326', hint: 'Slack, email, embeds', trend: 'up', trendValue: '+14.8%' },
  { label: 'Pipeline SLA', value: '99.6%', hint: 'Last 30 days', trend: 'flat', trendValue: 'On target' },
];

export const reportColumns = [
  { key: 'name', label: 'Report', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'domain', label: 'Domain', sortable: true },
  { key: 'freshness', label: 'Freshness', sortable: true },
  { key: 'views', label: 'Views', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
];

export const reportRows = [
  { name: 'Executive scorecard', owner: 'Ananya Reddy', domain: 'Finance', freshness: '2m', views: 1842, status: 'Live' },
  { name: 'Pipeline health', owner: 'Vikram Iyer', domain: 'Platform', freshness: '4m', views: 966, status: 'Live' },
  { name: 'Customer retention', owner: 'Meera Nair', domain: 'Growth', freshness: '11m', views: 721, status: 'Live' },
  { name: 'Product adoption', owner: 'Rohan Kapoor', domain: 'Product', freshness: '18m', views: 640, status: 'Scheduled' },
  { name: 'Support backlog', owner: 'Diya Shah', domain: 'CX', freshness: '1h', views: 412, status: 'Live' },
  { name: 'Marketing mix', owner: 'Kiran Bose', domain: 'Growth', freshness: '3h', views: 388, status: 'Draft' },
  { name: 'Inventory turns', owner: 'Sahana Rao', domain: 'Ops', freshness: '6h', views: 274, status: 'Live' },
  { name: 'Workforce pulse', owner: 'Nikhil Menon', domain: 'People', freshness: '1d', views: 198, status: 'Scheduled' },
  { name: 'Security posture', owner: 'Tara Joshi', domain: 'Risk', freshness: '2d', views: 156, status: 'Live' },
  { name: 'Board pack Q3', owner: 'Arjun Deshmukh', domain: 'Finance', freshness: '5d', views: 91, status: 'Archived' },
  { name: 'Churn cohort drilldown', owner: 'Meera Nair', domain: 'Growth', freshness: '22m', views: 512, status: 'Live' },
  { name: 'Warehouse efficiency', owner: 'Sahana Rao', domain: 'Ops', freshness: '35m', views: 334, status: 'Live' },
];

export const reportSuggestions = [
  'Executive scorecard',
  'Pipeline health',
  'Customer retention',
  'Product adoption',
  'Support backlog',
  'Board pack Q3',
];

export const datasetOptions = [
  { label: 'Finance warehouse', value: 'finance' },
  { label: 'Product events', value: 'product' },
  { label: 'Support tickets', value: 'support' },
  { label: 'People analytics', value: 'people' },
];

export const ownerOptions = [
  { label: 'Any owner', value: '' },
  { label: 'Ananya Reddy', value: 'reddy' },
  { label: 'Vikram Iyer', value: 'iyer' },
  { label: 'Meera Nair', value: 'nair' },
];

export const rangeOptions = [
  { label: '7D', value: '7d' },
  { label: '30D', value: '30d' },
  { label: '90D', value: '90d' },
  { label: 'YTD', value: 'ytd' },
];

export const workspaceFacts = [
  { term: 'Workspace', description: workspace.name },
  { term: 'Region', description: workspace.region },
  { term: 'Warehouse', description: workspace.warehouse },
  { term: 'Sources', description: `${workspace.sources} certified` },
  { term: 'Last refresh', description: workspace.freshness },
  { term: 'Compliance', description: 'SOC 2 · GDPR template' },
];

export const activity = [
  { title: 'Finance mart rebuilt', description: 'dbt job harborline_finance completed', timestamp: '2 minutes ago', status: 'complete' },
  { title: 'Quality checks passing', description: '18 of 18 tests green on product_events', timestamp: '9 minutes ago', status: 'complete' },
  { title: 'Board pack generating', description: 'Scheduled export to PDF for Friday 08:00', timestamp: 'In progress', status: 'current' },
  { title: 'Retention model', description: 'Weekly cohort refresh queued', timestamp: 'Tonight 02:00', status: 'upcoming' },
];

export const treeItems = [
  {
    id: 'finance',
    label: 'Finance',
    children: [
      { id: 'finance-scorecard', label: 'Executive scorecard' },
      { id: 'finance-cash', label: 'Cash runway' },
    ],
  },
  {
    id: 'growth',
    label: 'Growth',
    children: [
      { id: 'growth-retention', label: 'Customer retention' },
      { id: 'growth-mix', label: 'Marketing mix' },
    ],
  },
  {
    id: 'platform',
    label: 'Platform',
    children: [
      { id: 'platform-health', label: 'Pipeline health' },
      { id: 'platform-lineage', label: 'Lineage map' },
    ],
  },
];

export const recentWorkbooks = [
  { label: 'Q3 board pack', description: 'Edited 12 minutes ago', icon: 'file' },
  { label: 'NRR deep dive', description: 'Shared with Finance', icon: 'star' },
  { label: 'SLA burn-down', description: 'Pinned by ops', icon: 'bell' },
];

export const sqlSample = `SELECT
  date_trunc('week', occurred_at) AS week,
  cohort,
  count(distinct account_id) AS active_accounts,
  sum(net_revenue) AS nrr
FROM analytics.finance.subscription_facts
WHERE occurred_at >= dateadd('day', -90, current_date)
GROUP BY 1, 2
ORDER BY 1 DESC;`;

export const querySteps = [
  { label: 'Draft', description: 'Author SQL' },
  { label: 'Validate', description: 'Cost + tests' },
  { label: 'Schedule', description: 'Refresh window' },
  { label: 'Publish', description: 'Share + pin' },
];

export const alertItems = [
  { label: 'Pipeline SLA below 99%', description: 'Pager + Slack · Critical', icon: 'alert-triangle' },
  { label: 'NRR drop > 3% WoW', description: 'Email · Finance', icon: 'bell' },
  { label: 'Warehouse spend > $8k/day', description: 'Slack · Platform', icon: 'warning' },
];

export const onboardingSteps = [
  { label: 'Connect sources', description: 'Warehouse + SaaS' },
  { label: 'Certify models', description: 'Owners + tests' },
  { label: 'Publish workspace', description: 'Roles + embeds' },
];

export const bookmarks = [
  { label: 'Executive scorecard', description: 'Pinned by Ananya Reddy', icon: 'star' },
  { label: 'Pipeline health', description: 'Pinned by Vikram Iyer', icon: 'bell' },
  { label: 'Q3 board pack', description: 'Pinned for Friday review', icon: 'file' },
];

export const regions = [
  { name: 'Americas', share: 46, value: '$4.2M' },
  { name: 'EMEA', share: 31, value: '$2.8M' },
  { name: 'APAC', share: 23, value: '$2.1M' },
];

export const compareOptions = [
  { label: 'vs 7D', value: '7d' },
  { label: 'vs 30D', value: '30d' },
  { label: 'vs QOQ', value: 'qoq' },
];

export const goalColumns = [
  { key: 'name', label: 'Goal', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'domain', label: 'Domain', sortable: true },
  { key: 'target', label: 'Target', sortable: true },
  { key: 'actual', label: 'Actual', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
];

export const goalRows = [
  { name: 'Net revenue retention', owner: 'Ananya Reddy', domain: 'Finance', target: '118%', actual: '112%', status: 'Watch' },
  { name: 'Pipeline SLA', owner: 'Vikram Iyer', domain: 'Platform', target: '99.5%', actual: '99.6%', status: 'On track' },
  { name: 'Activation rate', owner: 'Meera Nair', domain: 'Growth', target: '42%', actual: '38%', status: 'Behind' },
  { name: 'Support CSAT', owner: 'Diya Shah', domain: 'CX', target: '4.6', actual: '4.7', status: 'On track' },
  { name: 'Warehouse budget', owner: 'Sahana Rao', domain: 'Ops', target: '$180k', actual: '$142k', status: 'On track' },
  { name: 'Weekly active accounts', owner: 'Rohan Kapoor', domain: 'Product', target: '18.4k', actual: '17.1k', status: 'Watch' },
];

export const goalMeters = [
  { label: 'NRR', value: 95, hint: '112% of 118% target' },
  { label: 'Activation', value: 90, hint: '38% of 42% target' },
  { label: 'Budget', value: 79, hint: '$142k of $180k' },
  { label: 'CSAT', value: 88, hint: '4.7 of 4.6 target' },
];

export const forecastScenarios = [
  { label: 'Base', value: 'base' },
  { label: 'Upside', value: 'upside' },
  { label: 'Downside', value: 'downside' },
];

export const forecastBars = {
  base: [42, 48, 51, 58, 61, 66],
  upside: [44, 52, 58, 67, 74, 82],
  downside: [40, 43, 45, 47, 49, 50],
};

export const forecastFacts = [
  { term: 'Horizon', description: '6 months' },
  { term: 'Method', description: 'Holt-Winters + analyst overlay' },
  { term: 'Owner', description: 'Meera Nair' },
  { term: 'Last published', description: 'Yesterday 16:40' },
  { term: 'Confidence', description: '82%' },
  { term: 'Next review', description: 'Monday 09:00' },
];

export const sourceColumns = [
  { key: 'name', label: 'Source', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'latency', label: 'Latency', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
];

export const sourceRows = [
  { name: 'Harborline warehouse', type: 'Snowflake', owner: 'Vikram Iyer', latency: '2m', status: 'Healthy' },
  { name: 'Billing ledger', type: 'Stripe', owner: 'Ananya Reddy', latency: '6m', status: 'Healthy' },
  { name: 'CRM accounts', type: 'Salesforce', owner: 'Meera Nair', latency: '11m', status: 'Healthy' },
  { name: 'Support tickets', type: 'Zendesk', owner: 'Diya Shah', latency: '18m', status: 'Degraded' },
  { name: 'Product events', type: 'Segment', owner: 'Rohan Kapoor', latency: '4m', status: 'Healthy' },
  { name: 'People roster', type: 'Workday', owner: 'Nikhil Menon', latency: '1h', status: 'Paused' },
  { name: 'Marketing spend', type: 'HubSpot', owner: 'Kiran Bose', latency: '22m', status: 'Healthy' },
  { name: 'Object store', type: 'S3', owner: 'Sahana Rao', latency: '9m', status: 'Healthy' },
];

export const teamMembers = [
  { name: 'Ananya Reddy', role: 'Workspace admin', domain: 'Finance', lastSeen: 'Online' },
  { name: 'Vikram Iyer', role: 'Analytics engineer', domain: 'Platform', lastSeen: '12m ago' },
  { name: 'Meera Nair', role: 'Growth analyst', domain: 'Growth', lastSeen: '28m ago' },
  { name: 'Rohan Kapoor', role: 'Product analyst', domain: 'Product', lastSeen: '1h ago' },
  { name: 'Diya Shah', role: 'CX analyst', domain: 'CX', lastSeen: '2h ago' },
  { name: 'Kiran Bose', role: 'Marketing analyst', domain: 'Growth', lastSeen: 'Yesterday' },
  { name: 'Sahana Rao', role: 'Ops analyst', domain: 'Ops', lastSeen: 'Yesterday' },
  { name: 'Nikhil Menon', role: 'People analyst', domain: 'People', lastSeen: '2d ago' },
];

export const usageKpis = [
  { label: 'Month-to-date spend', value: '$142k', hint: 'Of $180k budget', trend: 'up', trendValue: '+8.2%' },
  { label: 'Query minutes', value: '18,440', hint: 'Across 4 warehouses', trend: 'down', trendValue: '-3.1%' },
  { label: 'Idle credits', value: '6.4%', hint: 'Auto-suspend healthy', trend: 'flat', trendValue: 'Stable' },
  { label: 'Cost per query', value: '$0.41', hint: 'Median last 7 days', trend: 'down', trendValue: '-$0.04' },
];

export const usageBars = [
  { name: 'HELIX_WH_XL', share: 54 },
  { name: 'HELIX_WH_M', share: 28 },
  { name: 'HELIX_WH_DEV', share: 12 },
  { name: 'HELIX_WH_ADHOC', share: 6 },
];

export const notifications = [
  { label: 'Support tickets source degraded', description: 'Zendesk latency 18m · 8 minutes ago', icon: 'alert-triangle' },
  { label: 'Q3 forecast published', description: 'Meera Nair shared base + upside · 1 hour ago', icon: 'star' },
  { label: 'Pipeline SLA recovered', description: '99.6% after the 14:10 rebuild · 3 hours ago', icon: 'check-circle' },
  { label: 'Board pack reminder', description: 'Friday 08:00 export is scheduled', icon: 'bell' },
];

export const searchGroups = [
  {
    group: 'Reports',
    items: [
      { label: 'Executive scorecard', hint: 'Finance · Live', href: '#/reports', icon: 'file' },
      { label: 'Pipeline health', hint: 'Platform · Live', href: '#/reports', icon: 'file' },
      { label: 'Churn cohort drilldown', hint: 'Growth · Live', href: '#/reports', icon: 'file' },
      { label: 'Warehouse efficiency', hint: 'Ops · Live', href: '#/reports', icon: 'file' },
    ],
  },
  {
    group: 'Insights',
    items: [
      { label: 'Watchlist', hint: '8 live metrics', href: '#/watchlist', icon: 'eye' },
      { label: 'Anomalies', hint: '4 open breaks', href: '#/anomalies', icon: 'alert-triangle' },
      { label: 'Ask Helix', hint: 'Natural language', href: '#/ask', icon: 'search' },
    ],
  },
  {
    group: 'People',
    items: [
      { label: 'Ananya Reddy', hint: 'Workspace admin · Finance', href: '#/team', icon: 'user' },
      { label: 'Vikram Iyer', hint: 'Analytics engineer · Platform', href: '#/team', icon: 'user' },
      { label: 'Meera Nair', hint: 'Growth analyst', href: '#/team', icon: 'user' },
    ],
  },
  {
    group: 'Platform',
    items: [
      { label: 'Sources', hint: 'Connector health', href: '#/sources', icon: 'link' },
      { label: 'Jobs', hint: 'Scheduled refreshes', href: '#/jobs', icon: 'clock' },
      { label: 'Usage', hint: 'Warehouse spend', href: '#/usage', icon: 'clock' },
    ],
  },
];

export const commandItems = [
  { label: 'Search workspace', description: 'Reports, metrics, people', href: '#/search', icon: 'search' },
  { label: 'Overview', description: 'Workspace pulse', href: '#/overview', icon: 'home' },
  { label: 'Reports catalog', description: 'Search certified scorecards', href: '#/reports', icon: 'file' },
  { label: 'Lineage', description: 'Upstream and downstream', href: '#/lineage', icon: 'link' },
  { label: 'Collections', description: 'Saved report sets', href: '#/collections', icon: 'folder' },
  { label: 'Jobs', description: 'Scheduled refreshes', href: '#/jobs', icon: 'clock' },
  { label: 'Goals', description: 'OKR progress', href: '#/goals', icon: 'star' },
  { label: 'Forecasts', description: 'Six-month scenarios', href: '#/forecasts', icon: 'calendar' },
  { label: 'Sources', description: 'Connector health', href: '#/sources', icon: 'link' },
  { label: 'Usage', description: 'Warehouse spend', href: '#/usage', icon: 'clock' },
  { label: 'Team', description: 'Analysts and roles', href: '#/team', icon: 'user' },
  { label: 'Watchlist', description: 'Live metrics', href: '#/watchlist', icon: 'eye' },
  { label: 'Anomalies', description: 'Detection feed', href: '#/anomalies', icon: 'alert-triangle' },
  { label: 'Quality', description: 'Tests and freshness', href: '#/quality', icon: 'check' },
  { label: 'Ask', description: 'Natural-language questions', href: '#/ask', icon: 'search' },
  { label: 'Subscriptions', description: 'Scheduled deliveries', href: '#/subscriptions', icon: 'mail' },
  { label: 'Audit', description: 'Access log', href: '#/audit', icon: 'lock' },
  { label: 'Ananya Reddy', description: 'Workspace admin', href: '#/team', icon: 'user' },
];

export const watchMetrics = [
  { label: 'NRR', value: '112%', delta: '+1.4 pts', trend: 'up' },
  { label: 'Activation', value: '38%', delta: '-0.8 pts', trend: 'down' },
  { label: 'Pipeline SLA', value: '99.6%', delta: 'On target', trend: 'flat' },
  { label: 'CSAT', value: '4.7', delta: '+0.1', trend: 'up' },
  { label: 'Warehouse $', value: '$142k', delta: '79% of cap', trend: 'up' },
  { label: 'Active accounts', value: '17.1k', delta: '-1.3k vs goal', trend: 'down' },
  { label: 'Trial conversion', value: '31%', delta: '-2.1 pts APAC', trend: 'down' },
  { label: 'Query latency', value: '1.8s', delta: 'P95 last hour', trend: 'flat' },
];

export const anomalyRows = [
  { metric: 'Zendesk latency', owner: 'Diya Shah', severity: 'High', change: '+210%', window: '8m ago' },
  { metric: 'Activation rate', owner: 'Meera Nair', severity: 'Medium', change: '-4.2 pts', window: '2h ago' },
  { metric: 'Adhoc warehouse spend', owner: 'Sahana Rao', severity: 'Medium', change: '+38%', window: '5h ago' },
  { metric: 'Invoice null rate', owner: 'Ananya Reddy', severity: 'Low', change: '+0.4 pts', window: '1d ago' },
];

export const anomalyColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'severity', label: 'Severity', sortable: true },
  { key: 'change', label: 'Change', sortable: true },
  { key: 'window', label: 'Detected', sortable: true },
];

export const qualityRows = [
  { test: 'not_null account_id', model: 'subscription_facts', owner: 'Vikram Iyer', result: 'Pass', runtime: '12s' },
  { test: 'accepted_values status', model: 'subscription_facts', owner: 'Vikram Iyer', result: 'Pass', runtime: '9s' },
  { test: 'relationships accounts', model: 'crm_accounts', owner: 'Meera Nair', result: 'Pass', runtime: '21s' },
  { test: 'freshness < 15m', model: 'support_tickets', owner: 'Diya Shah', result: 'Fail', runtime: '4s' },
  { test: 'unique invoice_id', model: 'billing_ledger', owner: 'Ananya Reddy', result: 'Pass', runtime: '18s' },
  { test: 'schema drift', model: 'product_events', owner: 'Rohan Kapoor', result: 'Warn', runtime: '7s' },
];

export const qualityColumns = [
  { key: 'test', label: 'Test', sortable: true },
  { key: 'model', label: 'Model', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'result', label: 'Result', sortable: true },
  { key: 'runtime', label: 'Runtime', sortable: true },
];

export const askPrompts = [
  'Why did activation drop this week?',
  'Which region missed NRR target?',
  'What is warehouse spend vs cap?',
  'Show Zendesk latency vs SLA',
];

export const askAnswers = {
  'Why did activation drop this week?':
    'Activation fell 0.8 pts to 38%. The largest gap is APAC trial-to-paid (31% vs 42% target). Meera Nair flagged a billing experiment that paused dunning for 4 days.',
  'Which region missed NRR target?':
    'EMEA NRR is 109% against an 118% goal. Contraction is concentrated in 14 mid-market accounts that downgraded seats after the April price change.',
  'What is warehouse spend vs cap?':
    'Month-to-date spend is $142k of $180k (79%). HELIX_WH_XL is 54% of credits. Auto-suspend is healthy; adhoc warehouse is the fastest-growing line.',
  'Show Zendesk latency vs SLA':
    'Support tickets source is degraded at 18m latency versus a 10m freshness test. Diya Shah is the owner. An anomaly fired 8 minutes ago.',
};

export const subscriptionRows = [
  { name: 'Friday board pack', channel: 'Email', cadence: 'Weekly 08:00', owner: 'Ananya Reddy', status: 'Active' },
  { name: 'Pipeline health digest', channel: 'Slack', cadence: 'Weekdays 09:30', owner: 'Vikram Iyer', status: 'Active' },
  { name: 'NRR watch', channel: 'Email', cadence: 'Daily 07:00', owner: 'Meera Nair', status: 'Paused' },
  { name: 'CX backlog', channel: 'Slack', cadence: 'Hourly', owner: 'Diya Shah', status: 'Active' },
];

export const subscriptionColumns = [
  { key: 'name', label: 'Subscription', sortable: true },
  { key: 'channel', label: 'Channel', sortable: true },
  { key: 'cadence', label: 'Cadence', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
];

export const auditRows = [
  { actor: 'Ananya Reddy', action: 'Exported board pack PDF', target: 'Overview', when: '12 minutes ago' },
  { actor: 'Vikram Iyer', action: 'Published SQL', target: 'Query lab', when: '41 minutes ago' },
  { actor: 'Meera Nair', action: 'Shared forecast', target: 'Forecasts', when: '1 hour ago' },
  { actor: 'Diya Shah', action: 'Acknowledged anomaly', target: 'Zendesk latency', when: '2 hours ago' },
  { actor: 'Rohan Kapoor', action: 'Pinned workbook', target: 'Product adoption', when: 'Yesterday' },
  { actor: 'Sahana Rao', action: 'Raised budget cap', target: 'Usage', when: 'Yesterday' },
];

export const auditColumns = [
  { key: 'actor', label: 'Actor', sortable: true },
  { key: 'action', label: 'Action', sortable: true },
  { key: 'target', label: 'Target', sortable: true },
  { key: 'when', label: 'When', sortable: true },
];

export const queryResultColumns = [
  { key: 'week', label: 'Week', sortable: true },
  { key: 'cohort', label: 'Cohort', sortable: true },
  { key: 'accounts', label: 'Active accounts', sortable: true },
  { key: 'nrr', label: 'NRR', sortable: true },
];

export const queryResultRows = [
  { week: '2026-08-17', cohort: '2025-Q4', accounts: 1840, nrr: '114%' },
  { week: '2026-08-17', cohort: '2026-Q1', accounts: 2214, nrr: '109%' },
  { week: '2026-08-10', cohort: '2025-Q4', accounts: 1792, nrr: '113%' },
  { week: '2026-08-10', cohort: '2026-Q1', accounts: 2166, nrr: '108%' },
  { week: '2026-08-03', cohort: '2025-Q4', accounts: 1760, nrr: '112%' },
];

export const briefItems = [
  { label: 'Board pack is ready', description: 'Friday 08:00 export · Ananya Reddy', icon: 'file', href: '#/reports' },
  { label: 'Support freshness failed', description: 'Zendesk 18m vs 10m test', icon: 'alert-triangle', href: '#/quality' },
  { label: 'EMEA NRR still short', description: '109% vs 118% goal', icon: 'star', href: '#/goals' },
];

export const collections = [
  { name: 'Friday board', owner: 'Ananya Reddy', reports: 6, updated: '12 minutes ago', status: 'Shared' },
  { name: 'Growth weekly', owner: 'Meera Nair', reports: 4, updated: '2 hours ago', status: 'Private' },
  { name: 'Platform health', owner: 'Vikram Iyer', reports: 5, updated: 'Yesterday', status: 'Shared' },
  { name: 'CX standup', owner: 'Diya Shah', reports: 3, updated: 'Yesterday', status: 'Shared' },
  { name: 'Finance close', owner: 'Arjun Deshmukh', reports: 8, updated: 'Aug 28, 2026', status: 'Shared' },
  { name: 'Exec insights', owner: 'Ananya Reddy', reports: 6, updated: 'Aug 30, 2026', status: 'Shared' },
];

export const jobColumns = [
  { key: 'name', label: 'Job', sortable: true },
  { key: 'model', label: 'Model', sortable: true },
  { key: 'cadence', label: 'Cadence', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'last', label: 'Last run', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
];

export const jobRows = [
  { name: 'harborline_finance', model: 'subscription_facts', cadence: 'Every 15m', owner: 'Vikram Iyer', last: '2m ago', status: 'Succeeded' },
  { name: 'product_events_hourly', model: 'product.account_dim', cadence: 'Hourly', owner: 'Rohan Kapoor', last: '18m ago', status: 'Succeeded' },
  { name: 'support_freshness', model: 'support_tickets', cadence: 'Every 10m', owner: 'Diya Shah', last: '8m ago', status: 'Failed' },
  { name: 'board_pack_pdf', model: 'executive_scorecard', cadence: 'Fri 08:00', owner: 'Ananya Reddy', last: 'Last Friday', status: 'Scheduled' },
  { name: 'nrr_cohorts', model: 'subscription_facts', cadence: 'Nightly 02:00', owner: 'Meera Nair', last: 'Tonight', status: 'Queued' },
  { name: 'people_roster', model: 'workday_roster', cadence: 'Daily 06:00', owner: 'Nikhil Menon', last: 'Paused', status: 'Paused' },
];

export const lineageLayers = [
  {
    title: 'Sources',
    nodes: [
      { id: 'stripe', label: 'Stripe', meta: 'Billing' },
      { id: 'sfdc', label: 'Salesforce', meta: 'CRM' },
      { id: 'segment', label: 'Segment', meta: 'Events' },
    ],
  },
  {
    title: 'Staging',
    nodes: [
      { id: 'invoices', label: 'billing.invoices', meta: '6m' },
      { id: 'accounts', label: 'crm.accounts', meta: '11m' },
      { id: 'events', label: 'product.events', meta: '4m' },
    ],
  },
  {
    title: 'Marts',
    nodes: [
      { id: 'facts', label: 'subscription_facts', meta: 'Certified' },
      { id: 'dim', label: 'account_dim', meta: 'Certified' },
    ],
  },
  {
    title: 'Published',
    nodes: [{ id: 'scorecard', label: 'Executive scorecard', meta: 'Live' }],
  },
];

export const timezoneOptions = [
  { label: 'America/New_York', value: 'ny' },
  { label: 'America/Chicago', value: 'chi' },
  { label: 'Europe/London', value: 'lon' },
  { label: 'Asia/Kolkata', value: 'ist' },
];
