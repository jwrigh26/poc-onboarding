/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2022: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'prettier', // Integrate Prettier
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // -- OUR OVERRIDES
    'react-hooks/exhaustive-deps': 'off', // Devs can figure out what to pass to useEffect.
    // Allow us to never have to import React
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',

    // -- AIRBNB OVERRIDES
    'no-console': 'off',
    'arrow-parens': 'off',
    'import/no-unresolved': 'off', // Handled by webpack
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    'import/prefer-default-export': 'off', // Allow files with exports that aren't default
    'spaced-comment': 'off',
    'comma-spacing': 'off',
    'func-names': 'off', // TODO: restrict to generator default export off only
    'import/order': 'off',
    'no-use-before-define': 'off',
    'arrow-body-style': 'off',
    'react/jsx-filename-extension': 'off', // We don't use the JSX extension
    'react/jsx-no-bind': 'off',
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-fragments': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/no-unescaped-entities': 'off',
    'no-plusplus': 'off',
    'no-nested-ternary': 'off',
    'jsx-a11y/anchor-is-valid': 'off', // TODO: revisit
    'no-confusing-arrow': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/iframe-has-title': 'off',
    'no-return-await': 'off',
    'no-underscore-dangle': 'off',
    'react/button-has-type': 'off',

    // handled by prettier
    indent: 'off',
    'object-curly-spacing': 'off',
    'comma-dangle': 'off',
    'object-curly-newline': 'off',
    'generator-star-spacing': 'off',
    'react/jsx-curly-newline': 'off',
    'function-paren-newline': 'off',
    'array-bracket-spacing': 'off',
    quotes: 'off',
    'space-before-function-paren': 'off',
    'react/jsx-indent': 'off',
    semi: 'off',

    // show as warnings
    'prefer-template': 'warn',
    'object-shorthand': 'warn',
    'react/jsx-boolean-value': 'warn',
    'react/jsx-curly-brace-presence': 'warn',
    'react/no-array-index-key': 'warn',
    'prefer-destructuring': 'warn',
    'react/destructuring-assignment': 'warn',
    'no-param-reassign': 'off', // TODO: turn this to "warn" after figuring out how to exclude slice files.
    'no-unused-vars': 'off', // disallow declaration of variables that are not used in the code
    'no-useless-computed-key': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'max-len': [
      2,
      {
        code: 80,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreTrailingComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignorePattern: '^import .*',
      },
    ], // specify the maximum length of a line in your program (off by default)

    // -- MUI Tree shaking
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@mui/*/*/*'],
      },
    ],
  },
};
