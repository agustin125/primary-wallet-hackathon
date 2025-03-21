

module.exports = {
  clearMocks: true,
  collectCoverageFrom: ["src/**/*.{js,ts}"],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["\\\\node_modules\\\\", "/__tests__", "/dist"],
  preset: "ts-jest",
  testEnvironment: "jest-environment-node",
  testPathIgnorePatterns: ["\\\\node_modules\\\\", "/dist"],
};
