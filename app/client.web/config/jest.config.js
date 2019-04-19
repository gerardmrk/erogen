module.exports = {
  preset: "ts-jest",
  notify: !process.env.CI,
  verbose: true,
  rootDir: "./../",
  roots: ["<rootDir>/src"],
  setupFiles: ["<rootDir>/config/jest.enzyme.js"],
  setupFilesAfterEnv: ["<rootDir>/node_modules/jest-enzyme/lib/index.js"],
  testEnvironment: "enzyme",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^(?!.*\\.(js|jsx|mjs|css|json)$)":
      "<rootDir>/config/jest.fileTransform.js",
  },
  testRegex: "((\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "@client/(.*)\\?noembed$": "<rootDir>/src/client/$1",
    "@client/(.*)$": "<rootDir>/src/client/$1",
    "@renderer/(.*)$": "<rootDir>/src/renderer/$1",
    // "@translations/(.*)$": "<rootDir>/config/i18n/translations/$1",
  },
};
