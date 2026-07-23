import { defineConfig } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import dts from 'vite-plugin-dts';

const rootDir = dirname(fileURLToPath(import.meta.url));
const isStorybook = process.argv.some(
  (arg) => arg.includes('storybook') || arg.includes('storybook/'),
);

export default defineConfig({
  build: isStorybook
    ? {}
    : {
        lib: {
          entry: resolve(rootDir, 'src/index.ts'),
          name: 'EnterpriseDesignSystem',
          formats: ['es'],
          fileName: 'index',
        },
        rollupOptions: {
          external: [/^lit/, /^lit\/.*/],
        },
        sourcemap: true,
        target: 'es2022',
      },
  plugins: isStorybook
    ? []
    : [
        dts({
          include: ['src'],
          exclude: ['src/**/*.stories.ts', 'src/**/*.test.ts', 'src/**/*.mdx', 'src/docs/**', 'src/storybook/**'],
          rollupTypes: true,
        }),
      ],
});
