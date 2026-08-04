import type { Preview } from '@storybook/web-components';
import { themes } from '@storybook/theming';
import { withThemeByClassName } from '@storybook/addon-themes';
import '../src/tokens/index.css';
import '../src/foundations/global.css';
// Register all custom elements for Storybook (dev + static). Side-effect import —
// required so Rollup does not drop Lit `@customElement` definitions.
import '../src/components/index.js';
import { resolveSnippet, withCopyableSnippet } from '../src/storybook/snippet.js';

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'eds-theme-dark',
      },
      defaultTheme: 'light',
      parentSelector: 'body',
    }),
    withCopyableSnippet,
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
      sort: 'requiredFirst',
    },
    docs: {
      theme: themes.light,
      source: {
        type: 'code',
        excludeDecorators: true,
        language: 'html',
        transform: (src: string, storyContext: { args?: Record<string, unknown>; parameters?: Record<string, unknown> }) => {
          const code = resolveSnippet(
            (storyContext.parameters ?? {}) as never,
            (storyContext.args ?? {}) as Record<string, unknown>,
          );
          return code || src;
        },
      },
      canvas: {
        sourceState: 'shown',
      },
      codePanel: true,
      toc: true,
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Introduction',
          ['Author'],
          'Foundations',
          ['Copy to clipboard', 'Icons', 'Themes', 'Tokens', 'Typography'],
          'Integration',
          ['Overview', 'Angular', 'React', 'Vue'],
          'Components',
        ],
      },
    },
    layout: 'centered',
    backgrounds: {
      disable: true,
    },
    a11y: {
      test: 'todo',
    },
  },
  tags: ['autodocs'],
};

export default preview;
