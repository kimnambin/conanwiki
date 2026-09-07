import path from 'node:path';
import {fileURLToPath} from 'node:url';
import type {StorybookConfig} from '@storybook/react-vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async viteConfig => {
    viteConfig.resolve ??= {};
    viteConfig.resolve.dedupe = [
      ...(viteConfig.resolve.dedupe ?? []),
      'react',
      'react-dom',
    ];
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      // Storybook uses @storybook/react-vite (not @storybook/nextjs), so
      // Next.js-only modules need a lightweight browser-safe stand-in.
      'next/image': path.resolve(dirname, './mocks/next-image.tsx'),
    };
    // Force react-bootstrap into the same eager dep-optimization pass as
    // react/react-dom; discovering it lazily mid-run leaves its internal
    // contexts (e.g. Card's) bound to a stale React module instance.
    viteConfig.optimizeDeps ??= {};
    viteConfig.optimizeDeps.include = [
      ...(viteConfig.optimizeDeps.include ?? []),
      'react-bootstrap',
      'react-bootstrap/Card',
      'react-bootstrap/Badge',
      'react/jsx-dev-runtime',
    ];
    return viteConfig;
  },
};

export default config;
