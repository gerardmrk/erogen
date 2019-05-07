/* eslint-disable */
import { paths } from "./shared.paths";

// prettier-ignore
module.exports = {
  preset: "ts-jest",
  notify: !process.env.CI,
  verbose: true,
  rootDir: "./../",
  roots: ["<rootDir>/src"],
  setupFiles: ["<rootDir>/config/jest.setup.enzyme.js"],
  setupFilesAfterEnv: ["<rootDir>/node_modules/jest-enzyme/lib/index.js"],
  testEnvironment: "enzyme",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^(?!.*\\.(js|jsx|mjs|css|json)$)": "<rootDir>/config/jest.non-ts-loader.js",
  },
  testRegex: "((\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "@client/(.*)\\?noembed$": "<rootDir>/src/client/$1",
    "@client/(.*)$": "<rootDir>/src/client/$1",
    "@renderer/(.*)$": "<rootDir>/src/renderer/$1",
    "@server/(.*)$": "<rootDir>/src/server/$1",
  },
  globals: {
    "ts-jest": {
      tsConfig: paths.tsconfigClientTest
    }
  },
};
