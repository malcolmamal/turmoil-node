module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  coveragePathIgnorePatterns: ['node_modules', 'tests'],
  transform: {},
};
