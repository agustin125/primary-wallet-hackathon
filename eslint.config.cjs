const js = require('@eslint/js');
const parser = require('@typescript-eslint/parser');
const plugin = require('@typescript-eslint/eslint-plugin');
const prettier = require('eslint-config-prettier');
const globals = require('globals');

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': plugin,
    },
    rules: {
      ...plugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  prettier,
];
