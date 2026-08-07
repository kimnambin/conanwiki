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
}, ...storybook.configs["flat/recommended"]];
