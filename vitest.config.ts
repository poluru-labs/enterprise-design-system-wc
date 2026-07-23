import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.ts'],
    globals: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/components/**/eds-*.ts'],
      exclude: [
        'src/**/*.stories.ts',
        'src/**/*.test.ts',
        'src/**/index.ts',
        'src/docs/**',
        'src/storybook/**',
        'src/test/**',
      ],
      thresholds: {
        perFile: true,
        lines: 80,
        functions: 80,
        branches: 55,
        statements: 80,
      },
    },
  },
});
