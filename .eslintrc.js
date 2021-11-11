module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:security/recommended',
    'standard'
  ],
  ignorePatterns: [
    'node_modules',
    'dist'
  ],
  overrides: [
    {
      extends: [
        'plugin:json/recommended'
      ],
      files: [
        '**/*.json'
      ],
      rules: {
        'comma-dangle': [
          'warn',
          'never'
        ],
        'quote-props': [
          'warn',
          'always'
        ],
        quotes: [
          'warn',
          'double'
        ],
        semi: [
          'warn',
          'never'
        ]
      }
    },
    {
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
      ],
      files: [
        '**/*.{ts,tsx}'
      ],
      parser: '@typescript-eslint/parser',
      plugins: [
        '@typescript-eslint',
        'jsx-a11y',
        'react',
        'typescript-sort-keys'
      ],
      rules: {
        '@typescript-eslint/no-use-before-define': ['error'],
        'no-use-before-define': 'off',
        'react/jsx-closing-bracket-location': [
          1,
          'tag-aligned'
        ],
        'react/jsx-closing-tag-location': [
          1,
          {
            nonEmpty: 'after-props',
            selfClosing: 'tag-aligned'
          }
        ],
        'react/jsx-first-prop-new-line': [
          1,
          'always'
        ],
        'react/jsx-indent': [
          1,
          2,
          {
            checkAttributes: true
          }
        ],
        'react/jsx-indent-props': [
          1,
          2
        ],
        'react/jsx-max-props-per-line': [
          1,
          {
            when: 'always'
          }
        ],
        'react/jsx-one-expression-per-line': [
          1,
          {
            allow: 'single-child'
          }
        ],
        'react/jsx-sort-props': [
          1
        ],
        'react/jsx-wrap-multilines': [
          1,
          {
            arrow: 'parens-new-line',
            assignment: 'parens-new-line',
            condition: 'ignore',
            declaration: 'parens-new-line',
            logical: 'ignore',
            prop: 'ignore',
            return: 'parens-new-line'
          }
        ],
        'react/react-in-jsx-scope': 'off',
        'typescript-sort-keys/interface': 1,
        'typescript-sort-keys/string-enum': 1
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': [
            '.ts',
            '.tsx'
          ]
        }
      }
    }
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 13,
    requireConfigFile: false,
    sourceType: 'module'
  },
  plugins: [
    'json',
    'security',
    'simple-import-sort',
    'sort-keys-fix'
  ],
  rules: {
    indent: [
      'warn',
      2
    ],
    'max-len': [
      'warn',
      {
        code: 80
      }
    ],
    'simple-import-sort/imports': 'warn',
    'sort-keys': [
      'warn'
    ],
    'sort-keys-fix/sort-keys-fix': 'warn'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
