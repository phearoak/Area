const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./testInfo')

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {"^.+\\.tsx?$": "ts-jest"},
  moduleDirectories: ['node_modules'],
  testRegex: "src/__tests__/.+test.+", 
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  
  // [...]
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths /*, { prefix: '<rootDir>/' } */),
}