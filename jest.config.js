module.exports = {
  moduleFileExtensions: ['js', 'jsx'],
  globals: {
    window: true,
    document: true,
  },
  setupFiles: ['<rootDir>/src/js/__mocks__/localstorage.js'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>',
  coverageReporters: ['lcov'],
  collectCoverageFrom: [
    '**/src/js/action/**', '**/src/js/store/**', '!**/src/js/pages/Login.jsx',
    '**/src/js/pages/**', '!**/node_modules/**',
    '!**/lcov-report/**', '!**/vendor/**"]',
  ],
};
