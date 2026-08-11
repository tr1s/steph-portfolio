/*
 * ESLint configuration.
 * ------------------------------------------------------------------------------
 * Flat config. Next 16 removed `next lint`, so ESLint runs directly - via the
 * `lint` script, the VS Code extension (.vscode/settings.json) and CI.
 *
 * core-web-vitals is the JS-only preset; this project has no TypeScript. It
 * bundles the React, react-hooks, jsx-a11y and next plugins.
 *
 * Note that most of those rules only ever report as warnings, which is why the
 * `lint` script carries --max-warnings 0. Without it this config would catch
 * nothing that could fail a build.
 */

import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
  ...nextVitals,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts'])
]);
