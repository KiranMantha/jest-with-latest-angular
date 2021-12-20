module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  collectCoverage: true,
  coverageReporters: ['html', 'lcov', 'json', 'text'],
  coverageDirectory: '<rootDir>/coverage',
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
};
