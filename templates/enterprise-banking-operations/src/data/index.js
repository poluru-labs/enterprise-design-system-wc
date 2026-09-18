export const productName = 'Aurevia';
export const productLine = 'Banking';
export const workspaceName = 'Poluru National';

export const currentUser = {
  name: 'Subbu Poluru',
  email: 'subbu.poluru@polurunational.example',
  role: 'Head of operations',
};

export const workspace = {
  name: workspaceName,
  period: 'Value date · 13 Sep 2026',
  timezone: 'America / Chicago',
  markets: 'Austin · Dallas · Houston',
  cutoff: 'Fedwire 16:00 CT',
};

export const people = [
  { name: 'Subbu Poluru', role: 'Head of operations', squad: 'Ops' },
  { name: 'Priya Poluru', role: 'Wire desk lead', squad: 'Payments' },
  { name: 'Kavya Poluru', role: 'Exceptions lead', squad: 'Exceptions' },
  { name: 'Nikhil Poluru', role: 'AML officer', squad: 'Screening' },
  { name: 'Arjun Poluru', role: 'Clearing controller', squad: 'Clearing' },
  { name: 'Leela Poluru', role: 'Deposit ops', squad: 'Accounts' },
  { name: 'Rohan Poluru', role: 'ACH specialist', squad: 'Payments' },
  { name: 'Maya Poluru', role: 'OFAC analyst', squad: 'Screening' },
  { name: 'Dev Poluru', role: 'Liquidity desk', squad: 'Treasury' },
  { name: 'Asha Poluru', role: 'Returns clerk', squad: 'Exceptions' },
  { name: 'Ishaan Poluru', role: 'Correspondent ops', squad: 'Clearing' },
  { name: 'Hana Poluru', role: 'Book-transfer lead', squad: 'Payments' },
];

export let payments = [
  { id: 'st-folio', code: 'ST-2401', title: 'Folio Mechanical Fedwire', city: 'Houston', channel: 'fedwire', stage: 'held', status: 'ofac', owner: 'Nikhil Poluru', counterparty: 'Folio Mechanical', account: 'DDA-4182', amount: 2400000, valueDate: '2026-09-13' },
  { id: 'st-harbor', code: 'ST-1840', title: 'Harborwell payroll ACH', city: 'Austin', channel: 'ach', stage: 'held', status: 'nsf', owner: 'Kavya Poluru', counterparty: 'Harborwell LLC', account: 'DDA-1048', amount: 186400, valueDate: '2026-09-12' },
  { id: 'st-alder', code: 'ST-2218', title: 'Alder Hall rent ACH', city: 'Dallas', channel: 'ach', stage: 'posted', status: 'posted', owner: 'Rohan Poluru', counterparty: 'Alder Hall', account: 'DDA-2218', amount: 42000, valueDate: '2026-09-13' },
  { id: 'st-quill', code: 'ST-3310', title: 'Quill Studio vendor wire', city: 'Austin', channel: 'fedwire', stage: 'received', status: 'queued', owner: 'Priya Poluru', counterparty: 'Quill Studio LLC', account: 'DDA-3310', amount: 128000, valueDate: '2026-09-13' },
  { id: 'st-cedar', code: 'ST-4127', title: 'Cedar Yard same-day ACH', city: 'Houston', channel: 'ach', stage: 'posted', status: 'posted', owner: 'Rohan Poluru', counterparty: 'Cedar Yard', account: 'DDA-4127', amount: 64000, valueDate: '2026-09-13' },
  { id: 'st-lotline', code: 'ST-5094', title: 'Lotline Partners Fedwire', city: 'Austin', channel: 'fedwire', stage: 'posted', status: 'posted', owner: 'Priya Poluru', counterparty: 'Lotline Partners', account: 'DDA-5094', amount: 840000, valueDate: '2026-09-12' },
  { id: 'st-stride', code: 'ST-6271', title: 'Stride payroll RTP', city: 'Dallas', channel: 'rtp', stage: 'settled', status: 'settled', owner: 'Hana Poluru', counterparty: 'Stride Staffing', account: 'DDA-6271', amount: 38400, valueDate: '2026-09-13' },
  { id: 'st-nimbus', code: 'ST-8512', title: 'Nimbus SWIFT credit', city: 'Round Rock', channel: 'swift', stage: 'received', status: 'queued', owner: 'Ishaan Poluru', counterparty: 'Nimbus Low Voltage', account: 'DDA-8512', amount: 215000, valueDate: '2026-09-13' },
];

export const accounts = [
  { id: 'dda-1048', number: 'DDA-1048', name: 'Harborwell operating', type: 'dda', city: 'Austin', balance: 84200, status: 'restricted', owner: 'Leela Poluru' },
  { id: 'dda-2218', number: 'DDA-2218', name: 'Alder Hall rent', type: 'dda', city: 'Dallas', balance: 186400, status: 'active', owner: 'Leela Poluru' },
  { id: 'dda-3310', number: 'DDA-3310', name: 'Quill Studio ops', type: 'dda', city: 'Austin', balance: 412000, status: 'active', owner: 'Leela Poluru' },
  { id: 'dda-4127', number: 'DDA-4127', name: 'Cedar Yard payables', type: 'dda', city: 'Houston', balance: 268000, status: 'active', owner: 'Arjun Poluru' },
  { id: 'dda-4182', number: 'DDA-4182', name: 'Folio Mechanical treasury', type: 'mma', city: 'Houston', balance: 6400000, status: 'watch', owner: 'Dev Poluru' },
  { id: 'dda-5094', number: 'DDA-5094', name: 'Lotline Partners ops', type: 'dda', city: 'Austin', balance: 1284000, status: 'active', owner: 'Leela Poluru' },
  { id: 'dda-6271', number: 'DDA-6271', name: 'Stride payroll', type: 'dda', city: 'Dallas', balance: 96400, status: 'active', owner: 'Hana Poluru' },
  { id: 'dda-8512', number: 'DDA-8512', name: 'Nimbus correspondent', type: 'nostro', city: 'Round Rock', balance: 2150000, status: 'active', owner: 'Ishaan Poluru' },
];

export const exceptions = [
  { id: 'ex-2401', payment: 'ST-2401', title: 'OFAC name match on Folio', property: 'Folio Mechanical Fedwire', owner: 'Nikhil Poluru', date: '2026-09-13', status: 'open', severity: 'high' },
  { id: 'ex-1840', payment: 'ST-1840', title: 'NSF return on Harborwell payroll', property: 'Harborwell payroll ACH', owner: 'Kavya Poluru', date: '2026-09-12', status: 'open', severity: 'high' },
  { id: 'ex-8512', payment: 'ST-8512', title: 'SWIFT BIC mismatch', property: 'Nimbus SWIFT credit', owner: 'Ishaan Poluru', date: '2026-09-13', status: 'watch', severity: 'medium' },
  { id: 'ex-3310', payment: 'ST-3310', title: 'Duplicate vendor invoice', property: 'Quill Studio vendor wire', owner: 'Priya Poluru', date: '2026-09-13', status: 'watch', severity: 'medium' },
  { id: 'ex-2218', payment: 'ST-2218', title: 'Late addenda on rent ACH', property: 'Alder Hall rent ACH', owner: 'Rohan Poluru', date: '2026-09-12', status: 'closed', severity: 'low' },
  { id: 'ex-4127', payment: 'ST-4127', title: 'Same-day cutoff risk', property: 'Cedar Yard same-day ACH', owner: 'Rohan Poluru', date: '2026-09-13', status: 'closed', severity: 'low' },
  { id: 'ex-5094', payment: 'ST-5094', title: 'Memo vs amount mismatch', property: 'Lotline Partners Fedwire', owner: 'Asha Poluru', date: '2026-09-12', status: 'open', severity: 'medium' },
  { id: 'ex-6271', payment: 'ST-6271', title: 'RTP confirmation delayed', property: 'Stride payroll RTP', owner: 'Hana Poluru', date: '2026-09-13', status: 'closed', severity: 'low' },
];

export const screening = [
  { id: 'scr-2401', payment: 'ST-2401', title: 'Possible OFAC hit · Folio Mechanical', subject: 'Folio Mechanical', owner: 'Maya Poluru', date: '2026-09-13', status: 'open', severity: 'high' },
  { id: 'scr-1840', payment: 'ST-1840', title: 'Repeated NSF pattern', subject: 'Harborwell LLC', owner: 'Nikhil Poluru', date: '2026-09-12', status: 'watch', severity: 'medium' },
  { id: 'scr-8512', payment: 'ST-8512', title: 'Correspondent high-risk corridor', subject: 'Nimbus Low Voltage', owner: 'Maya Poluru', date: '2026-09-13', status: 'open', severity: 'high' },
  { id: 'scr-3310', payment: 'ST-3310', title: 'Vendor not on approved list', subject: 'Quill Studio LLC', owner: 'Nikhil Poluru', date: '2026-09-13', status: 'watch', severity: 'medium' },
  { id: 'scr-5094', payment: 'ST-5094', title: 'Large-value wire after hours', subject: 'Lotline Partners', owner: 'Maya Poluru', date: '2026-09-12', status: 'closed', severity: 'low' },
  { id: 'scr-4182', payment: 'DDA-4182', title: 'Unusual MMA drawdown', subject: 'Folio Mechanical treasury', owner: 'Dev Poluru', date: '2026-09-13', status: 'open', severity: 'medium' },
  { id: 'scr-2218', payment: 'ST-2218', title: 'New originator on rent ACH', subject: 'Alder Hall', owner: 'Rohan Poluru', date: '2026-09-11', status: 'closed', severity: 'low' },
  { id: 'scr-6271', payment: 'ST-6271', title: 'RTP payroll name variation', subject: 'Stride Staffing', owner: 'Hana Poluru', date: '2026-09-13', status: 'closed', severity: 'low' },
];

export const clearing = [
  { id: 'clr-6271', payment: 'ST-6271', counterparty: 'Stride Staffing', amount: 38400, window: 'RTP instant', owner: 'Hana Poluru', date: '2026-09-13', status: 'settled' },
  { id: 'clr-2218', payment: 'ST-2218', counterparty: 'Alder Hall', amount: 42000, window: 'ACH same-day', owner: 'Rohan Poluru', date: '2026-09-13', status: 'posted' },
  { id: 'clr-4127', payment: 'ST-4127', counterparty: 'Cedar Yard', amount: 64000, window: 'ACH same-day', owner: 'Rohan Poluru', date: '2026-09-13', status: 'posted' },
  { id: 'clr-5094', payment: 'ST-5094', counterparty: 'Lotline Partners', amount: 840000, window: 'Fedwire', owner: 'Priya Poluru', date: '2026-09-12', status: 'posted' },
  { id: 'clr-2401', payment: 'ST-2401', counterparty: 'Folio Mechanical', amount: 2400000, window: 'Fedwire', owner: 'Nikhil Poluru', date: '2026-09-13', status: 'held' },
  { id: 'clr-1840', payment: 'ST-1840', counterparty: 'Harborwell LLC', amount: 186400, window: 'ACH next-day', owner: 'Kavya Poluru', date: '2026-09-12', status: 'returned' },
  { id: 'clr-3310', payment: 'ST-3310', counterparty: 'Quill Studio LLC', amount: 128000, window: 'Fedwire', owner: 'Priya Poluru', date: '2026-09-13', status: 'queued' },
  { id: 'clr-8512', payment: 'ST-8512', counterparty: 'Nimbus Low Voltage', amount: 215000, window: 'SWIFT MT103', owner: 'Ishaan Poluru', date: '2026-09-13', status: 'queued' },
];

export const liquidityTrend = [1.8, 1.9, 2.0, 2.05, 2.1, 2.15, 2.2, 2.25, 2.28, 2.32, 2.36, 2.4];

export const clearingStages = [
  { id: 'received', label: 'Received', count: 2, href: '#/payments' },
  { id: 'posted', label: 'Posted', count: 3, href: '#/accounts' },
  { id: 'held', label: 'Held', count: 2, href: '#/exceptions', hot: true },
  { id: 'settled', label: 'Settled', count: 1, href: '#/clearing' },
];

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'home' },
  { label: 'Payments', href: '#/payments', icon: 'folder' },
  { label: 'Accounts', href: '#/accounts', icon: 'user' },
  { label: 'Exceptions', href: '#/exceptions', icon: 'alert-triangle' },
  { label: 'Screening', href: '#/screening', icon: 'star' },
  { label: 'Clearing', href: '#/clearing', icon: 'check' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const inboxItems = [
  { label: 'Folio Fedwire is OFAC held', description: 'Nikhil Poluru · ST-2401', icon: 'alert-triangle', href: '#/payment/st-folio' },
  { label: 'Harborwell payroll returned NSF', description: 'Kavya Poluru · ST-1840', icon: 'clock', href: '#/exceptions' },
  { label: 'Stride RTP settled', description: 'Hana Poluru · $38,400', icon: 'check', href: '#/clearing' },
  { label: 'Fedwire cutoff 16:00 CT', description: 'Priya Poluru · wire desk', icon: 'file', href: '#/payments' },
];

export const commandItems = [
  { label: 'Overview', description: 'Operations pulse', href: '#/overview', icon: 'home' },
  { label: 'Release payment', description: 'Queue a wire or ACH', href: '#release-payment', icon: 'plus' },
  { label: 'Payments', description: 'Priya Poluru’s desk', href: '#/payments', icon: 'folder' },
  { label: 'Accounts', description: 'Leela Poluru’s book', href: '#/accounts', icon: 'user' },
  { label: 'Exceptions', description: 'Kavya Poluru’s queue', href: '#/exceptions', icon: 'alert-triangle' },
  { label: 'Screening', description: 'Nikhil Poluru’s AML', href: '#/screening', icon: 'star' },
  { label: 'Clearing', description: 'Arjun Poluru’s windows', href: '#/clearing', icon: 'check' },
  { label: 'Settings', description: 'Aurevia desk defaults', href: '#/settings', icon: 'settings' },
];

export const channelOptions = [
  { label: 'Fedwire', value: 'fedwire' },
  { label: 'ACH', value: 'ach' },
  { label: 'RTP', value: 'rtp' },
  { label: 'SWIFT', value: 'swift' },
  { label: 'Book', value: 'book' },
];

export function overviewStats() {
  const open = payments.filter((item) => ['queued', 'posted', 'ofac', 'nsf'].includes(item.status)).length;
  const held = payments.filter((item) => item.stage === 'held').length;
  const flags = screening.filter((item) => ['open', 'watch'].includes(item.status)).length;
  const liquidity = accounts.reduce((sum, item) => sum + item.balance, 0);
  return [
    { label: 'In flight', value: String(open), hint: 'Austin, Dallas, Houston rails', trend: 'flat', trendValue: 'Book' },
    { label: 'Liquidity', value: `$${(liquidity / 1_000_000).toFixed(1)}M`, hint: 'Dev Poluru’s desk', trend: 'up', trendValue: '+2%' },
    { label: 'Held', value: String(held), hint: 'Folio OFAC · Harborwell NSF', trend: 'up', trendValue: '2 hot' },
    { label: 'AML flags', value: String(flags), hint: 'Nikhil Poluru · screening', trend: 'flat', trendValue: 'Today' },
  ];
}

export function addPayment({ title, city, channel, counterparty }) {
  const number = 8600 + payments.length;
  const record = {
    id: `st-${number}`,
    code: `ST-${number}`,
    title,
    city: city || 'Austin',
    channel: channel || 'fedwire',
    stage: 'received',
    status: 'queued',
    owner: 'Priya Poluru',
    counterparty: counterparty || currentUser.name,
    account: 'DDA-NEW',
    amount: 25000,
    valueDate: '2026-09-13',
  };
  payments.unshift(record);
  return record;
}

export function buildSearchCatalog() {
  const paymentHits = payments.map((item) => ({
    label: `${item.code} ${item.title}`,
    description: `${item.city} · ${item.owner}`,
    owner: item.owner,
    type: 'Payment',
    href: `#/payment/${item.id}`,
  }));
  const accountHits = accounts.map((item) => ({
    label: item.number,
    description: `${item.name} · ${item.type}`,
    owner: item.owner,
    type: 'Account',
    href: '#/accounts',
  }));
  const exceptionHits = exceptions.map((item) => ({
    label: item.title,
    description: `${item.payment} · ${item.owner}`,
    owner: item.owner,
    type: 'Exception',
    href: '#/exceptions',
  }));
  const screenHits = screening.map((item) => ({
    label: item.title,
    description: `${item.payment} · ${item.owner}`,
    owner: item.owner,
    type: 'Screening',
    href: '#/screening',
  }));
  return [
    ...paymentHits,
    ...accountHits,
    ...exceptionHits,
    ...screenHits,
    ...commandItems.map((item) => ({ ...item, type: 'Jump' })),
  ];
}
