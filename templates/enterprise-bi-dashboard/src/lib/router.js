export function currentRoute(routeNames, fallback = 'overview') {
  const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  return routeNames.includes(hash) ? hash : fallback;
}

export function withActiveNav(navItems, route) {
  return navItems.map((item) => ({
    ...item,
    active: item.href === `#/${route}` || item.children?.some((child) => child.href === `#/${route}`),
    children: item.children?.map((child) => ({
      ...child,
      active: child.href === `#/${route}`,
    })),
  }));
}

export function navigate(href) {
  if (!href) return;
  window.location.hash = href.startsWith('#') ? href : `#/${href.replace(/^\//, '')}`;
}

export function ensureHash(defaultRoute = 'overview') {
  if (!window.location.hash) {
    window.location.hash = `#/${defaultRoute}`;
  }
}
