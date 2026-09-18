import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@poluru-labs/enterprise-design-system-wc/tokens.css';
import '@poluru-labs/enterprise-design-system-wc';
import './styles/tokens.css';
import './styles/layout.css';
import './components/app-shell.js';

const app = document.querySelector('#app');

function boot() {
  if (!app) throw new Error('Missing #app root');
  app.innerHTML = '<aurevia-shell></aurevia-shell>';
}

try {
  boot();
} catch (error) {
  console.error(error);
  if (app) {
    app.innerHTML = `<div class="boot-error"><strong>Aurevia could not start</strong><pre>${error?.stack || error.message}</pre></div>`;
  }
}
