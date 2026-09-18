export function pageHeader(eyebrow, title, lead, actions = '') {
  return `
    <header class="page-header">
      <div>
        <span class="eyebrow">${eyebrow}</span>
        <h1>${title}</h1>
        <p>${lead}</p>
      </div>
      <div class="inline-actions">${actions}</div>
    </header>
  `;
}

export function metricStripCells(count, prefix = 'kpi') {
  return Array.from({ length: count }, (_, index) => `
    <div class="metric-cell">
      <eds-stat id="${prefix}-${index}"></eds-stat>
    </div>`).join('');
}

export function sparklineSvg(label = 'Trend') {
  return `
    <svg class="sparkline" viewBox="0 0 360 92" role="img" aria-label="${label}">
      <polyline fill="none" stroke="#DA0037" stroke-width="3" points="0,70 30,64 60,68 90,52 120,48 150,54 180,36 210,40 240,28 270,32 300,18 330,22 360,12" />
      <polyline fill="rgb(218 0 55 / 0.12)" stroke="none" points="0,92 0,70 30,64 60,68 90,52 120,48 150,54 180,36 210,40 240,28 270,32 300,18 330,22 360,12 360,92" />
    </svg>
  `;
}

export function barChart(bars) {
  return `<div class="bars" aria-hidden="true">${bars.map((value) => `<span style="--h:${value}%"></span>`).join('')}</div>`;
}

export function regionMixRows(regions) {
  return regions
    .map(
      (region) => `
    <div class="region-row">
      <div class="d-flex justify-content-between">
        <strong>${region.name}</strong>
        <span>${region.value} · ${region.share}%</span>
      </div>
      <div class="region-track"><span style="width:${region.share}%"></span></div>
    </div>`,
    )
    .join('');
}
