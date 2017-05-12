module.exports = {
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    SortBy: '<rootDir>/src/js/pages/headlines/SortBy.jsx',
    Category: '<rootDir>/src/js/pages/headlines/Category.jsx',
    SourceOptions: '<rootDir>/src/js/pages/headlines/SourceOptions.jsx',
    Article: '<rootDir>/src/js/pages/Article.jsx',
    Headlines: '<rootDir>/src/js/pages/Headlines.jsx',
    AuthAction: '<rootDir>/src/js/action/authAction.js',
    AuthStore: '<rootDir>/src/js/store/authStore.js',
  },
  globals: {
    window: true,
  },
  setupFiles: ['<rootDir>/src/js/__mocks__/localstorage.js'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>',
  coverageReporters: ['lcov'],
};
