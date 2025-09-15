const { createCjsPreset } = require('jest-preset-angular/presets');

module.exports = {
  ...createCjsPreset(),
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  // supprime ton transform actuel si createCjsPreset le configure déjà
  // transform: { '^.+\.(ts|js|html)$': 'ts-jest' },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverageFrom: ['src//*.ts', '!src/main.ts', '!src/environments/', '!src/**/*.module.ts'],
  coverageDirectory: '<rootDir>/coverage/'
};
