// jest.config.js
const { pathsToModuleNameMapper } = require('ts-jest/utils');
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig');

module.exports = {
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.json'
		}
	},
	moduleFileExtensions: ['ts', 'js', 'json'],
	rootDir: './src',
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	// testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
	testEnvironment: 'node',
	moduleNameMapper: compilerOptions.paths && pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>/'
	})
};
