import pluginJs from '@eslint/js'
import pluginImport from 'eslint-plugin-import'
import pluginReact from 'eslint-plugin-react'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  // Базовые настройки
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    ignores: ['node_modules', 'dist', 'build', '.next', 'coverage', '*.config.js', '*.config.ts'],
  },

  // Плагины
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: pluginReact,
      import: pluginImport,
    },
  },

  // Настройки парсера и окружения
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  // Базовые рекомендуемые конфиги
  pluginJs.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  // React конфиг
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Основные правила
  {
    rules: {
      // === TypeScript правила (практичные) ===
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],

      // Убрал строгие/мешающие правила:
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',

      // === React правила ===
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off', // TypeScript заменяет prop-types
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'react/display-name': 'off',
      'react/jsx-key': ['error', { checkFragmentShorthand: true }],
      'react/jsx-no-target-blank': ['error', { allowReferrer: true }],
      'react/no-unescaped-entities': 'off',
      'react/jsx-uses-react': 'off',
      'react/no-unknown-property': ['error', { ignore: ['css'] }],

      // === Import/Export правила ===
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
        },
      ],
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'off', // TypeScript делает это лучше
      'import/named': 'off', // TypeScript делает это лучше
      'import/namespace': 'off', // TypeScript делает это лучше
      'import/default': 'off', // TypeScript делает это лучше
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',

      // === Общие JavaScript правила ===
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-alert': 'warn',
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      'no-irregular-whitespace': [
        'error',
        {
          skipStrings: true,
          skipComments: true,
          skipRegExps: true,
          skipTemplates: true,
        },
      ],
      'no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',

      // === Стилевые правила ===
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['off', 'always'],
      'comma-dangle': ['off', 'always-multiline'],
      'arrow-parens': ['error', 'always'],
      'max-len': [
        'warn',
        {
          code: 120,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
    },
  },
]
