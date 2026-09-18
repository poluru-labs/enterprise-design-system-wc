export const STATUS_TONE = {
  live: 'success',
  active: 'success',
  healthy: 'success',
  succeeded: 'success',
  passing: 'success',
  pass: 'success',
  on_track: 'success',
  scheduled: 'info',
  queued: 'info',
  shared: 'info',
  watch: 'warning',
  behind: 'warning',
  degraded: 'warning',
  warn: 'warning',
  fail: 'danger',
  failed: 'danger',
  high: 'danger',
  critical: 'danger',
  draft: 'neutral',
  archived: 'neutral',
  paused: 'neutral',
  private: 'neutral',
  flat: 'neutral',
  low: 'info',
  medium: 'warning',
};

export function statusTone(status) {
  if (!status) return 'neutral';
  const key = String(status).toLowerCase().replace(/[\s-]+/g, '_');
  return STATUS_TONE[key] || 'neutral';
}

export function statusLabel(status) {
  if (!status) return 'Unknown';
  return String(status)
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function severityTone(severity) {
  const key = String(severity || '').toLowerCase();
  if (key === 'critical' || key === 'high' || key === 'error') return 'danger';
  if (key === 'medium' || key === 'moderate' || key === 'watch' || key === 'warn') return 'warning';
  if (key === 'low' || key === 'ok') return 'info';
  if (key === 'resolved' || key === 'passed') return 'success';
  return 'neutral';
}

export function slaTone(status) {
  const key = String(status || '').toLowerCase();
  if (key === 'breach' || key === 'breached' || key === 'error') return 'danger';
  if (key === 'risk' || key === 'at_risk' || key === 'warn' || key === 'watch') return 'warning';
  return 'success';
}

export function badgeVariant(status) {
  const tone = statusTone(status);
  return tone === 'brand' ? 'info' : tone;
}
