export const titles = {
  overview: 'Overview',
  payments: 'Payments',
  payment: 'Payment',
  accounts: 'Accounts',
  exceptions: 'Exceptions',
  screening: 'Screening',
  clearing: 'Clearing',
  settings: 'Settings',
  search: 'Search',
};

export function parseRoute(hash = window.location.hash) {
  const raw = String(hash).replace(/^#\/?/, '');
  const [name, ...rest] = raw.split('/');
  return { name: name || 'overview', id: rest.join('/') || undefined };
}

export function activeHref(route) {
  if (route.name === 'payment') return '#/payments';
  return `#/${route.name || 'overview'}`;
}

export function crumbItems(route, { payments, workspaceName }) {
  if (route.name === 'payment') {
    const item = payments.find((entry) => entry.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Payments', href: '#/payments' },
      { label: item?.code || 'Payment', current: true },
    ];
  }
  if (route.name === 'search') {
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Search', current: true },
    ];
  }
  return [
    { label: workspaceName, href: '#/overview' },
    { label: titles[route.name] || 'Overview', current: true },
  ];
}

export function searchHref(query) {
  const trimmed = String(query ?? '').trim();
  if (!trimmed) return '#/search';
  return `#/search/${encodeURIComponent(trimmed)}`;
}
