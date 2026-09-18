import { describe, expect, it } from 'vitest';
import { badgeVariant, severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps banking statuses to design-system tones', () => {
    expect(statusTone('settled')).toBe('success');
    expect(statusTone('posted')).toBe('success');
    expect(statusTone('queued')).toBe('info');
    expect(statusTone('held')).toBe('warning');
    expect(statusTone('watch')).toBe('warning');
    expect(statusTone('ofac')).toBe('danger');
    expect(statusTone('nsf')).toBe('danger');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('in_progress')).toBe('In Progress');
    expect(statusLabel('on track')).toBe('On Track');
    expect(statusLabel('ofac')).toBe('OFAC');
    expect(statusLabel('ach')).toBe('ACH');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity to a tone', () => {
    expect(severityTone('critical')).toBe('danger');
    expect(severityTone('watch')).toBe('warning');
    expect(severityTone('ok')).toBe('success');
    expect(severityTone('passed')).toBe('success');
  });

  it('maps SLA state to a tone', () => {
    expect(slaTone('ok')).toBe('success');
    expect(slaTone('watch')).toBe('warning');
    expect(slaTone('breach')).toBe('danger');
  });

  it('maps badge variants for status chips', () => {
    expect(badgeVariant('settled')).toBe('success');
    expect(badgeVariant('queued')).toBe('info');
  });
});
