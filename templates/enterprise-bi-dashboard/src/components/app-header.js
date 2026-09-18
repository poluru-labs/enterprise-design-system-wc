import { formatTime } from '../lib/format.js';

export function renderAppHeader({ productName, workspace, anomalyCount, currentUser, notifications = [] }) {
  return `
    <header class="hx-header" data-testid="hx-app-header">
      <div class="hx-header-ribbon">
        <div class="hx-header-start">
          <eds-button id="nav-toggle" variant="tertiary" icon="menu" icon-only accessible-label="Toggle navigation"></eds-button>
          <span class="hx-brand-mark" aria-hidden="true"><span class="hx-brand-helix">H</span></span>
          <div class="hx-header-meta">
            <strong>${productName}</strong>
            <small>${workspace.name}</small>
          </div>
        </div>
        <div class="hx-header-center">
          <span class="hx-refresh-clock" id="refresh-clock" aria-live="polite">
            <i class="bi bi-arrow-repeat" aria-hidden="true"></i>
            <span>Last refresh</span>
            <strong id="refresh-time">${formatTime(workspace.lastRefresh)}</strong>
          </span>
          <a class="hx-anomaly-badge" href="#/anomalies" aria-label="${anomalyCount} open anomalies">
            <i class="bi bi-activity" aria-hidden="true"></i>
            ${anomalyCount} anomalies
          </a>
          <form class="hx-ask-console" id="ask-console" role="search" aria-label="Ask Helix">
            <span class="hx-ask-prompt">Ask Helix /</span>
            <input
              class="hx-ask-input"
              id="ask-console-input"
              type="search"
              name="q"
              placeholder="Why did activation drop this week?"
              autocomplete="off"
              aria-label="Ask Helix a question"
            />
          </form>
        </div>
        <div class="hx-header-end">
          <span class="hx-header-kbd"><eds-kbd keys="⌘K"></eds-kbd></span>
          <a class="hx-subscriptions-link" href="#/subscriptions" aria-label="Subscriptions">
            <i class="bi bi-envelope" aria-hidden="true"></i>
            <span>Subscriptions</span>
          </a>
          <eds-badge id="inbox-count" label="${notifications.length}" variant="danger" pill></eds-badge>
          <eds-tooltip content="Open inbox">
            <eds-button id="notify-btn" variant="tertiary" icon="bell" icon-only accessible-label="Notifications"></eds-button>
          </eds-tooltip>
          <eds-dropdown-menu id="user-menu" placement="bottom">
            <button slot="trigger" class="hx-profile-trigger" type="button">
              <eds-avatar name="${currentUser.name}" size="sm"></eds-avatar>
              <span>${currentUser.name}</span>
            </button>
            <eds-menu-item label="Settings" value="settings" icon="settings"></eds-menu-item>
            <eds-menu-item label="Legal & copyright" value="legal" icon="file"></eds-menu-item>
            <eds-menu-item label="Sign out" value="signout" icon="lock" danger></eds-menu-item>
          </eds-dropdown-menu>
        </div>
      </div>
    </header>
  `;
}

export function hydrateAppHeader(root, { workspace, onAsk, onCommandPalette, onUserSelect }) {
  const clock = root.querySelector('#refresh-time');
  const tick = () => {
    if (clock) clock.textContent = formatTime(workspace.lastRefresh);
  };
  tick();
  const interval = window.setInterval(tick, 30_000);

  root.querySelector('#ask-console')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = root.querySelector('#ask-console-input');
    onAsk?.(input?.value ?? '');
  });

  root.querySelector('#user-menu')?.addEventListener('eds-select', (event) => {
    onUserSelect?.(event.detail?.value);
  });

  return {
    destroy() {
      window.clearInterval(interval);
    },
    openCommandPalette: onCommandPalette,
  };
}

export class AppHeaderElement extends HTMLElement {
  connectedCallback() {
    this.setAttribute('data-testid', 'hx-app-header-element');
  }
}

if (!customElements.get('hx-app-header')) {
  customElements.define('hx-app-header', AppHeaderElement);
}
