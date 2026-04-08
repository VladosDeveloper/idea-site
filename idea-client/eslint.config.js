import baseConfig from '../eslint.config.js'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...baseConfig,

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // React 17+ не требует импортировать React
      //   'jsx-a11y/anchor-is-valid': 'off',
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@idea-site/backend/**',
                '!@idea-site/backend/**/',
                '!@idea-site/backend/**/input',
                '!@idea-site/backend/src/utils/can',
              ],
              allowTypeImports: true,
              message: 'Only types and input schemas are allowed to be imported from backend workspace',
            },
          ],
        },
      ],
      'no-extra-boolean-cast': 'off',
    },
  },

  {
    ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js', 'stylelint.config.js'],
  },

  //   🔹 Специальные настройки для Vite-конфига
  {
    files: ['vite.config.ts'],
    languageOptions: {
      sourceType: 'module',
    },
  },
]
