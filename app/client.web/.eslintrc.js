module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaVersion: 6,
    env: {
      es6: true,
      browser: true,
      node: true,
      commonjs: true,
    },
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 80,
        semi: true,
        singleQuote: false,
        trailingComma: "all",
      },
    ],
  },
};
