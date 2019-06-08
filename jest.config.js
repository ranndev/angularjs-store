// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*",
    "!<rootDir>/src/**/__snapshots__/*"
  ],
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testMatch: [
    "<rootDir>/src/**/*.test.ts"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/.vscode",
    "<rootDir>/coverage",
    "<rootDir>/dist",
    "<rootDir>/images",
    "<rootDir>/node_modules"
  ],
  transform: {
    "^.+\\.ts$": "ts-jest"
  }
};
