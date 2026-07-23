import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import litPlugin from 'eslint-plugin-lit';
import wcPlugin from 'eslint-plugin-wc';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'storybook-static/**',
      'node_modules/**',
      'coverage/**',
      '**/*.d.ts',
      '**/*.mdx',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...litPlugin.configs['flat/recommended'],
    files: ['**/*.{ts,js,mjs}'],
  },
  {
    ...wcPlugin.configs['flat/recommended'],
    files: ['**/*.{ts,js,mjs}'],
  },
  {
    files: ['**/*.{ts,js,mjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      wc: {
        elementBaseClasses: ['LitElement'],
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'lit/no-invalid-html': 'warn',
      'lit/binding-positions': 'warn',
      'lit/no-useless-template-literals': 'off',
      'wc/no-constructor-attributes': 'off',
      'wc/guard-super-call': 'off',
    },
  },
  {
    files: ['**/*.stories.ts', 'src/storybook/**/*.ts', '**/*.test.ts'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['.storybook/**/*.{ts,js}', 'vite.config.ts', 'eslint.config.js'],
    rules: {
      'no-console': 'off',
    },
  },
);
