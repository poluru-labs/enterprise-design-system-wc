export const STATUS_TONE = {
  settled: 'success',
  posted: 'success',
  cleared: 'success',
  active: 'success',
  closed: 'success',
  queued: 'info',
  received: 'info',
  dda: 'info',
  pending: 'info',
  open: 'warning',
  held: 'warning',
  watch: 'warning',
  restricted: 'warning',
  nsf: 'danger',
  ofac: 'danger',
  returned: 'danger',
  frozen: 'danger',
  denied: 'danger',
  overdue: 'danger',
  draft: 'neutral',
  book: 'neutral',
};

export function statusTone(status) {
  if (!status) return 'neutral';
  const key = String(status).toLowerCase().replace(/[\s-]+/g, '_');
  return STATUS_TONE[key] || 'neutral';
}

export function statusLabel(status) {
  if (!status) return 'Unknown';
  const key = String(status).toLowerCase().replace(/[\s-]+/g, '_');
  const acronyms = {
    ofac: 'OFAC',
    nsf: 'NSF',
    ach: 'ACH',
    rtp: 'RTP',
    dda: 'DDA',
    mma: 'MMA',
    swift: 'SWIFT',
    fedwire: 'Fedwire',
  };
  if (acronyms[key]) return acronyms[key];
  return String(status)
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function severityTone(severity) {
  const key = String(severity || '').toLowerCase();
  if (key === 'critical' || key === 'high' || key === 'error' || key === 'red') return 'danger';
  if (key === 'medium' || key === 'moderate' || key === 'watch' || key === 'warn' || key === 'amber') return 'warning';
  if (key === 'low' || key === 'ok' || key === 'green') return 'success';
  if (key === 'resolved' || key === 'passed') return 'success';
  return 'neutral';
}

export function slaTone(status) {
  const key = String(status || '').toLowerCase();
  if (key === 'breach' || key === 'breached' || key === 'error' || key === 'at risk') return 'danger';
  if (key === 'risk' || key === 'at_risk' || key === 'warn' || key === 'watch') return 'warning';
  return 'success';
}

export function badgeVariant(status) {
  const tone = statusTone(status);
  return tone === 'brand' ? 'info' : tone;
}
