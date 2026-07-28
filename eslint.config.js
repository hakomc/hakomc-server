import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig({
  files: [
    'src/**/*.ts',
    'src/**/*.tsx',
  ],
  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommended,
  ],
  rules: {
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    'semi': ['error', 'always'],
    'jsx-quotes': ['error', 'prefer-double'],
  },
});
