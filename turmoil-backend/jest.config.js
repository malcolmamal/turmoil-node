export default {
  testEnvironment: './jest-node-with-timezone.js',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  coveragePathIgnorePatterns: ['node_modules', 'src/server.js', 'tests'],
  transform: {},
  setupFilesAfterEnv: ['./tests/setupTests.js'],
};
