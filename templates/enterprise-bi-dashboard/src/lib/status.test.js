import { describe, expect, it } from 'vitest';
import { badgeVariant, severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps analytics statuses to design-system tones', () => {
    expect(statusTone('Live')).toBe('success');
    expect(statusTone('Healthy')).toBe('success');
    expect(statusTone('Scheduled')).toBe('info');
    expect(statusTone('Watch')).toBe('warning');
    expect(statusTone('Degraded')).toBe('warning');
    expect(statusTone('Failed')).toBe('danger');
    expect(statusTone('High')).toBe('danger');
    expect(statusTone('Draft')).toBe('neutral');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('on_track')).toBe('On Track');
    expect(statusLabel('live')).toBe('Live');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity to a tone', () => {
    expect(severityTone('critical')).toBe('danger');
    expect(severityTone('high')).toBe('danger');
    expect(severityTone('medium')).toBe('warning');
    expect(severityTone('low')).toBe('info');
    expect(severityTone('resolved')).toBe('success');
    expect(severityTone('')).toBe('neutral');
  });

  it('maps SLA state to a tone', () => {
    expect(slaTone('ok')).toBe('success');
    expect(slaTone('warn')).toBe('warning');
    expect(slaTone('error')).toBe('danger');
  });

  it('returns badge variants from status tone', () => {
    expect(badgeVariant('Live')).toBe('success');
    expect(badgeVariant('Draft')).toBe('neutral');
  });
});
