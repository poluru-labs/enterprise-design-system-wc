import { productName, currentUser } from '../data/index.js';

export function renderAppSidebar() {
  return `
    <aside class="hx-app-sidebar" id="sidebar">
      <div class="hx-brand">
        <span class="hx-brand-mark" aria-hidden="true"><span class="hx-brand-helix">H</span></span>
        <div class="hx-brand-copy">
          <strong>${productName}</strong>
          <small>Enterprise analytics</small>
        </div>
      </div>
      <eds-side-nav id="side-nav"></eds-side-nav>
      <div class="hx-sidebar-foot">
        <eds-avatar name="${currentUser.name}" size="sm"></eds-avatar>
        <div class="hx-brand-copy">
          <strong>${currentUser.name}</strong>
          <small>${currentUser.role}</small>
        </div>
      </div>
    </aside>
  `;
}

export function hydrateAppSidebar(_root, { onNavigate }) {
  document.querySelector('#side-nav')?.addEventListener('eds-navigate', (event) => {
    const href = event.detail?.href ?? event.detail?.item?.href;
    onNavigate?.(href);
  });

}

export class AppSidebarElement extends HTMLElement {
  connectedCallback() {
    this.setAttribute('data-testid', 'hx-app-sidebar');
  }
}

if (!customElements.get('hx-app-sidebar')) {
  customElements.define('hx-app-sidebar', AppSidebarElement);
}
