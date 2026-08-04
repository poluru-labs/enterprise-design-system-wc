import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation',
  },
  staticDirs: ['../public'],
  core: {
    disableTelemetry: true,
  },
  async viteFinal(config) {
    config.build ??= {};
    config.build.rollupOptions ??= {};
    // Preserve Lit custom element registration side effects in the static build.
    config.build.rollupOptions.treeshake = {
      moduleSideEffects: true,
    };
    return config;
  },
};

export default config;
