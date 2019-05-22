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
    "^(?!.*\\.(js|jsx|mjs|css|json)$)": "<rootDir>/src/client/__fixtures__/jest.transform.non-ts.js",
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
    // "@loadable/component": "<rootDir>/src/client/__fixtures__/jest.mock.loadable.js",
  },
  snapshotResolver: "<rootDir>/src/client/__fixtures__/jest.resolve.snapshots.js",
  coverageDirectory: paths.coverageDir,
  coverageReporters: [
    "json",
    "json-summary",
    "lcov",
    "text",
    "clover"
  ],
  collectCoverageFrom: [
    "**/*.{ts,tsx}", // include all TS/TSX source
    "!**/*.d.ts", // ignore declaration files
    "!**/*.mock.{ts,tsx}", // ignore mocks
    "!**/*.static.{ts,tsx}", // ignore static services
    "!**/node_modules/**", // ignore 3rd-party modules
    "!**/dist/**", // ignore build
    "!**/.cache/**", // ignore cache
    "!**/__fixtures__/**", // ignore fixtures
    "!**/ui.*/**", // ignore reexported semantic ui components
    "!**/server/**" // TODO: reenable
  ],
  globals: {
    "ts-jest": {
      // tsConfig: paths.tsconfigClientTest,
      diagnostics: true
    }
  },
};
