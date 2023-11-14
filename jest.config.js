module.exports = {
  preset: 'react-native',
  roots: ['<rootDir>/__tests__'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**'
  ],

  moduleNameMapper: {
    '@/__tests__/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
  }
}