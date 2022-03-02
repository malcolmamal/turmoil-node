export default {
  testEnvironment: 'jest-environment-node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  coveragePathIgnorePatterns: ['node_modules', 'src/server.js', 'tests'],
  transform: {},
};
