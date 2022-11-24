module.exports = {
  env: {
    es6: true,
  },
  extends: [
    "airbnb-base",
    'airbnb-typescript',
    'prettier',
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  plugins: [],

  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts", ".tsx"],
        moduleDirectory: ["node_modules"],
      },
    },
  },
  rules: {
    "react/jsx-filename-extension":0,
    "object-curly-newline": 0,
    "function-paren-newline": 0,
    "implicit-arrow-linebreak": 0,
    "import/prefer-default-export": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "import/no-named-default": 0,
    "@typescript-eslint/class-name-casing": 0,
    "no-underscore-dangle": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "no-plusplus": 0,
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-confusing-arrow": 0,
    "@typescript-eslint/no-unused-vars":  ["error", { "argsIgnorePattern": "^_" }],
    "no-empty": ["error", { "allowEmptyCatch": true }],
    "class-methods-use-this": 0,
    "max-classes-per-file": 0
  },
};
