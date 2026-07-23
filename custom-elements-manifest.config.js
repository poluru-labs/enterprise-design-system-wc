/**
 * Custom Elements Manifest analyzer config.
 * @see https://custom-elements-manifest.open-wc.org/
 */
export default {
  globs: ['src/components/**/eds-*.ts'],
  exclude: ['**/*.stories.ts', '**/*.d.ts', '**/index.ts'],
  outdir: '.',
  litelement: true,
  packagejson: true,
  dependencies: false,
};
