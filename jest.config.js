module.exports = {
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.json'
		}
	},
	moduleFileExtensions: ['ts', 'js', 'json'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	// testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
	testEnvironment: 'node',
	moduleNameMapper: {
		'^@src(.*)$': '<rootDir>/src$1'
	}
};
