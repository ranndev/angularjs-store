// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*",
    "!<rootDir>/src/**/__snapshots__/*"
  ],
  coverageDirectory: "coverage",
  testMatch: [
    "<rootDir>/src/**/*.test.ts"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/demo",
    "<rootDir>/dist",
    "<rootDir>/docs",
    "<rootDir>/images",
    "<rootDir>/node_modules"
  ],
  transform: {
    "^.+\\.ts$": "ts-jest"
  }
};
