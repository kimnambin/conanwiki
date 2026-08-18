// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js';
import globals from 'globals';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [{ignores: ['dist']}, {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: 'latest',
      ecmaFeatures: {jsx: true},
      sourceType: 'module',
    },
  },
  settings: {react: {version: '18.3'}},
  plugins: {
    '@typescript-eslint': typescript,
    react,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...js.configs.recommended.rules,
    ...typescript.configs.recommended.rules,
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
    ...reactHooks.configs.recommended.rules,
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      {allowConstantExport: true},
    ],
  },
}, {
  // Next.js App Router 규칙상 page.tsx/layout.tsx는 컴포넌트 옆에
  // metadata/generateMetadata/generateStaticParams를 함께 export해야 해서
  // 이 규칙(원래 Vite Fast Refresh 전용)이 여기선 적용되지 않는다.
  files: ['src/app/**/*.{ts,tsx}'],
  rules: {
    'react-refresh/only-export-components': 'off',
  },
}, ...storybook.configs["flat/recommended"]];
