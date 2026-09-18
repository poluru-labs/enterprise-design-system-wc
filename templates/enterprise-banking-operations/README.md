# Aurevia · Poluru National

Core banking operations workspace for **Poluru National**. Light theme, brand `#0B3D5C`, hash routing. Titles use **Source Serif 4**; body copy uses **Source Sans 3**.

The canvas starts **full width**. Use the menu control (or `⌘\`) to open the sidebar; hide it again to return to full width.

## Demo

[Live demo](https://enterprise-banking-operations-qx4j9dx6r-polurus.vercel.app/#/overview)

## Run

```bash
npm install
npm run dev
npm test
npm run build
```

Opens at [http://localhost:5191](http://localhost:5191). Preview build at port **4191**.

## Clearing-rail header

Aurevia uses a **clearing-rail header** — a cool navy canvas (`#EAF2F6`) with **Received / Posted / Held / Settled** rail cells and a gold **liquidity** chip (`$2.4B available`). Right side: payment search, ⌘K command palette, Release payment, inbox, and profile. The Aurevia brand mark sits on navy `#0B3D5C`. Implemented as the `<aurevia-header>` custom element with open shadow DOM.

This is intentionally distinct from Beacon’s claims-stage rail, Sentinel’s queue strip, and Atlas’s purchase pipeline.

Cards use full 1px borders. There are no gradients and no left or top accent bars.

## Folder map

```
src/
  main.js                 # boot: tokens, DS, styles, mount <aurevia-shell>
  components/
    app-shell.js          # <aurevia-shell>
    app-header.js         # <aurevia-header> clearing rail + liquidity chip
    app-sidebar.js
    content-card.js       # equal-height <content-card>
    widgets.js            # pageHeader, statGrid, payment/account cards
  pages/                  # one file per hash route
  data/index.js           # demo catalog (payments, accounts, exceptions, AML)
  lib/                    # format, search, status, router + tests
  styles/                 # tokens, layout, header
  test/setup.js
```

## Pages

Overview, Payments (and payment detail), Accounts, Exceptions, Screening, Clearing, Settings, **Search** (`#/search`).

Jump with `⌘K` (command palette) or the header search (routes to `#/search`).

## Tests

Vitest + jsdom unit tests cover format/search/status/router helpers and the `content-card` / `aurevia-header` custom elements:

```bash
npm test
```

## Author

**Subrahmanyam Poluru** · [polurus.com](https://polurus.com)
