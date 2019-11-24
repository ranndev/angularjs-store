// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/.github',
    '<rootDir>/.vscode',
    '<rootDir>/coverage',
    '<rootDir>/dist',
    '<rootDir>/images',
    '<rootDir>/node_modules',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    __DEV__: true,
  },
};
