/* eslint-disable */
const { paths } = require("./shared.paths");

// prettier-ignore
module.exports = {
  preset: "ts-jest",
  notify: !process.env.CI,
  verbose: false,
  rootDir: paths.rootDir,
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^(?!.*\\.(js|jsx|mjs|css|json)$)": "<rootDir>/src/client/_fixtures_/jest.transform.non-ts.js",
  },
  testRegex: "((\\.|/)(test|spec))\\.tsx?$",
  testPathIgnorePatterns: [
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    ".+\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "@client/(.*)\\?noembed$": "<rootDir>/src/client/$1",
    "@client/(.*)$": "<rootDir>/src/client/$1",
    "@renderer/(.*)$": "<rootDir>/src/renderer/$1",
    "@server/(.*)$": "<rootDir>/src/server/$1",
    // "@loadable/component": "<rootDir>/src/client/_fixtures_/jest.mock.loadable.js",
  },
  globals: {
    "ts-jest": {
      // tsConfig: paths.tsconfigClientTest,
      diagnostics: true
    }
  },
};
