import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json'

const config: Config = {
  bail: true,
  coverageProvider: "v8",
  preset: 'ts-jest',
  testMatch: ["**/*.spec.ts"],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text-summary',
    'lcov'
  ],
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/useCases/**/*.ts'
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/'
  })
};

export default config;
