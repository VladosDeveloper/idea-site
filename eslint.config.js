import pluginJs from '@eslint/js'
import pluginImport from 'eslint-plugin-import'
import eslintReact from 'eslint-plugin-react'
import pluginReact from 'eslint-plugin-react'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'
import tseslint from 'typescript-eslint'
// import pluginJsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  {
    ignores: ['node_modules', 'dist'],
  },
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: eslintReact,
      // 'react-hooks': eslintReactHooks,
      // 'react-refresh': eslintReactRefresh,
      import: pluginImport,
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: false,
            orderImportKind: 'asc',
          },
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      curly: ['error', 'all'],
      'no-irregular-whitespace': ['error', { skipTemplates: true, skipStrings: true }],
      'no-console': ['error', { allow: ['info', 'error', 'warn'] }],
    },
  },
]
