import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

// Flat config. Next 16 removed `next lint`, so ESLint runs directly via the
// `lint` script in package.json and through the VS Code ESLint extension.
//
// core-web-vitals is the JS-only preset (this project has no TypeScript). It
// bundles the React, react-hooks, jsx-a11y and next plugins, and promotes the
// Core Web Vitals rules from warning to error.
export default defineConfig([
  ...nextVitals,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts'])
]);
