module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  collectCoverageFrom: [
    'components/**/*.{js,jsx}',
    'pages/**/*.{js,jsx}',
    '!pages/_app.js',
    '!pages/_document.js',
    '!pages/api/**',
  ],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
}
