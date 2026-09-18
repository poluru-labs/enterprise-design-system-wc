import { renderOverview, hydrateOverview } from './overview.js';
import { renderPayments, hydratePayments } from './payments.js';
import { renderPayment, hydratePayment } from './payment.js';
import { renderAccounts, hydrateAccounts } from './accounts.js';
import { renderExceptions, hydrateExceptions } from './exceptions.js';
import { renderScreening, hydrateScreening } from './screening.js';
import { renderClearing, hydrateClearing } from './clearing.js';
import { renderSettings, hydrateSettings } from './settings.js';
import { renderSearch, hydrateSearch } from './search.js';

const views = {
  overview: renderOverview,
  payments: renderPayments,
  payment: renderPayment,
  accounts: renderAccounts,
  exceptions: renderExceptions,
  screening: renderScreening,
  clearing: renderClearing,
  settings: renderSettings,
  search: renderSearch,
};

const hydrators = {
  overview: hydrateOverview,
  payments: hydratePayments,
  payment: hydratePayment,
  accounts: hydrateAccounts,
  exceptions: hydrateExceptions,
  screening: hydrateScreening,
  clearing: hydrateClearing,
  settings: hydrateSettings,
  search: hydrateSearch,
};

export function renderView(route) {
  const render = views[route.name] || renderOverview;
  return render(route);
}

export function hydrateView(root, route) {
  const hydrate = hydrators[route.name] || hydrateOverview;
  hydrate(root, route);
}
