import { currentUser, navItems, productLine, productName } from '../data/index.js';

export function sidebarTemplate() {
  return `
    <aside class="st-sidebar" id="st-sidebar" aria-label="Banking">
      <div class="sidebar-head">
        <a class="wordmark" href="#/overview">
          <span class="brand-mark" aria-hidden="true">A</span>
          <span class="brand-copy">
            <strong>${productName}</strong>
            <small>${productLine}</small>
          </span>
        </a>
        <button class="sidebar-hide" id="sidebar-close" type="button" aria-label="Hide sidebar">
          <i class="bi bi-chevron-left" aria-hidden="true"></i>
        </button>
      </div>
      <eds-side-nav id="side-nav"></eds-side-nav>
      <div class="sidebar-foot">
        <eds-avatar name="${currentUser.name}" size="sm"></eds-avatar>
        <span class="brand-copy">
          <strong>${currentUser.name}</strong>
          <small>${currentUser.role}</small>
        </span>
      </div>
    </aside>
  `;
}

export function paintNav(route) {
  const nav = document.querySelector('#side-nav');
  if (!nav) return;
  const current = route.activeHref;
  nav.items = navItems.map((item) => ({
    ...item,
    active: item.href === current,
  }));
}
