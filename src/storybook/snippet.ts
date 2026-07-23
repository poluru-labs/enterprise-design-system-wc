import type { Decorator, Parameters } from '@storybook/web-components';
import { html } from 'lit';
import '../components/code-snippet/eds-code-snippet.js';

export type SnippetFn = (args: Record<string, unknown>) => string;

/** Build an HTML attribute string from a value. */
export function attr(name: string, value: unknown): string {
  if (value === undefined || value === null || value === '') return '';
  if (typeof value === 'boolean') return value ? ` ${name}` : '';
  return ` ${name}="${escapeAttr(String(value))}"`;
}

function escapeAttr(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

/** Resolve snippet text from story parameters. */
export function resolveSnippet(
  parameters: Parameters,
  args: Record<string, unknown>,
): string {
  const snippet = parameters.snippet as string | SnippetFn | undefined;
  if (typeof snippet === 'function') return snippet(args).trim();
  if (typeof snippet === 'string') return snippet.trim();

  const docsCode = parameters.docs?.source?.code;
  if (typeof docsCode === 'string') return docsCode.trim();
  if (typeof docsCode === 'function') {
    try {
      return String(docsCode(args)).trim();
    } catch {
      return '';
    }
  }
  return '';
}

/**
 * Storybook decorator: renders a copyable code panel under the canvas.
 * Stories should set `parameters.snippet` to a string or `(args) => string`.
 */
export const withCopyableSnippet: Decorator = (story, context) => {
  const code = resolveSnippet(context.parameters, context.args as Record<string, unknown>);
  if (!code) return story();

  return html`
    <div style="display:flex;flex-direction:column;align-items:stretch;width:100%;max-width:42rem;">
      <div style="display:flex;justify-content:center;width:100%;">${story()}</div>
      <eds-code-snippet label="Snippet" language="html" .code=${code}></eds-code-snippet>
    </div>
  `;
};

/** Helper to attach a snippet + docs source to story parameters. */
export function withSnippet(snippet: string | SnippetFn): Parameters {
  return {
    snippet,
    docs: {
      source: {
        type: 'code',
        language: 'html',
        code: typeof snippet === 'string' ? snippet : undefined,
        transform: (_src: string, ctx: { args?: Record<string, unknown>; parameters?: Parameters }) => {
          const args = (ctx?.args ?? {}) as Record<string, unknown>;
          const params = { snippet, ...(ctx?.parameters ?? {}) };
          return resolveSnippet(params, args) || _src;
        },
      },
    },
  };
}
