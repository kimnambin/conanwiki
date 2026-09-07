import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vitest/config';
import {storybookTest} from '@storybook/addon-vitest/vitest-plugin';
import {playwright} from '@vitest/browser-playwright';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.stories.tsx', 'src/data/**', 'src/types/**'],
    },
    projects: [
      {
        // Plain logic tests (utils, data shaping) — no browser needed.
        test: {
          name: 'unit',
          environment: 'node',
          include: ['src/**/*.test.ts'],
        },
      },
      {
        extends: true,
        plugins: [
          // Runs the stories defined in .storybook as real, browser-rendered tests.
          storybookTest({configDir: path.join(dirname, '.storybook')}),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{browser: 'chromium'}],
          },
          setupFiles: [path.join(dirname, '.storybook/vitest.setup.ts')],
        },
      },
      {
        // React Testing Library component tests, rendered in a real browser.
        // Kept separate from the "storybook" project: @storybook/addon-vitest's
        // play-function renderer currently breaks hook-using components on
        // re-render, so interaction tests for stateful components live here
        // using plain @testing-library/react + user-event instead.
        optimizeDeps: {
          include: ['react/jsx-dev-runtime', 'react-dom/client'],
        },
        test: {
          name: 'component',
          include: ['src/**/*.test.tsx'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{browser: 'chromium'}],
          },
          setupFiles: [path.join(dirname, 'vitest.component-setup.ts')],
        },
      },
    ],
  },
});
