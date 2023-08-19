module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "eslint-config-prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: {
    react: { version: "18.2" },
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx"],
      },
    },
  },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react-hooks/exhaustive-deps": "off", // Devs can figure out what to pass to useEffect.
    // NOT SURE NEEDED
    // Allow us to never have to import React
    // 'react/jsx-uses-react': 'off',
    // 'react/react-in-jsx-scope': 'off',
    // --------- OTHER RULES ---------
    // show as warnings
    "prefer-template": "warn",
    "object-shorthand": "warn",
    "react/jsx-boolean-value": "warn",
    "react/jsx-curly-brace-presence": "warn",
    "react/no-array-index-key": "warn",
    "prefer-destructuring": "warn",
    "react/destructuring-assignment": "warn",
    "no-param-reassign": "off", // TODO: turn this to "warn" after figuring out how to exclude slice files.
    "no-unused-vars": "off", // disallow declaration of variables that are not used in the code
    "no-useless-computed-key": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "max-len": [
      2,
      {
        code: 80,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreTrailingComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignorePattern: "^import .*",
      },
    ], // specify the maximum length of a line in your program (off by default)
  },
};
