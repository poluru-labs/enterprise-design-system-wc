import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@poluru-labs/enterprise-design-system-wc/tokens.css';
import '@poluru-labs/enterprise-design-system-wc';
import { setDensity } from '@poluru-labs/enterprise-design-system-wc';
import './styles/tokens.css';
import './styles/layout.css';
import './styles/header.css';
import { renderAppShell, hydrateAppShell } from './components/app-shell.js';
import { navItems, productName, routes } from './data/index.js';
import { currentRoute, ensureHash, withActiveNav } from './lib/router.js';
import { hydrateView, renderView } from './pages/index.js';

const app = document.querySelector('#app');
const routeNames = Object.keys(routes);

function renderRoute() {
  const route = currentRoute(routeNames);
  ensureHash();
  const nav = document.querySelector('#side-nav');
  if (nav) nav.items = withActiveNav(navItems, route);
  const crumbs = document.querySelector('#crumbs');
  if (crumbs) crumbs.items = routes[route].crumbs;
  const view = document.querySelector('#view');
  if (!view) return;
  view.innerHTML = renderView(route);
  hydrateView(view, route);
  document.title = `${routes[route].title} · ${productName}`;
}

setDensity('comfortable');
app.innerHTML = renderAppShell();
hydrateAppShell();
renderRoute();
window.addEventListener('hashchange', renderRoute);
