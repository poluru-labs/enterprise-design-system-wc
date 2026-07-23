import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, resetDom, nextEvent, shadowQuery } from '../../test/helpers.js';
import './eds-code-snippet.js';
import type { EdsCodeSnippet } from './eds-code-snippet.js';

describe('eds-code-snippet', () => {
  beforeEach(() => {
    resetDom();
    vi.restoreAllMocks();
  });

  it('renders code panel with label and language', async () => {
    const el = await mount<EdsCodeSnippet>('eds-code-snippet', (node) => {
      node.code = '<eds-button>Save</eds-button>';
      node.language = 'html';
      node.label = 'Example';
    });

    expect(shadowQuery(el, '.label').textContent).toContain('Example');
    expect(shadowQuery(el, '.label').textContent).toContain('html');
    expect(shadowQuery(el, 'code').textContent).toBe('<eds-button>Save</eds-button>');
  });

  it('renders nothing when code is empty', async () => {
    const el = await mount<EdsCodeSnippet>('eds-code-snippet');

    expect(el.shadowRoot?.querySelector('.panel')).toBeNull();
  });

  it('copies code to clipboard and emits eds-copy', async () => {
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
    const el = await mount<EdsCodeSnippet>('eds-code-snippet', (node) => {
      node.code = 'npm install @eds/wc';
    });
    const copyEvent = nextEvent<{ code: string }>(el, 'eds-copy');

    shadowQuery<HTMLButtonElement>(el, '.copy').click();
    const event = await copyEvent;
    await el.updateComplete;

    expect(writeText).toHaveBeenCalledWith('npm install @eds/wc');
    expect(event.detail.code).toBe('npm install @eds/wc');
    expect(shadowQuery(el, '.copy').getAttribute('data-copied')).toBe('true');
  });
});
