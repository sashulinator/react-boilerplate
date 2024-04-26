module.exports = {
  preset: 'ts-jest',
  // verbose: true,
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  testEnvironment: 'jsdom',
  modulePaths: ['<rootDir>/src', 'node_modules'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
    'abstract/(.*)': '<rootDir>/src/abstract/$1',
    '^ui/(.*)': '<rootDir>/src/ui/$1',
    'utils/(.*)': '<rootDir>/src/utils/$1',
    'themes/(.*)': '<rootDir>/src/shared/themes/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['!node_modules/'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testPathIgnorePatterns: ['/node_modules/'],
  testRegex: '.*.(test|spec).(j|t)s[x]?$',
  transform: {
    'node_modules/(react-dnd|dnd-core|@react-dnd)/.+\\.(j|t)sx?$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
}
