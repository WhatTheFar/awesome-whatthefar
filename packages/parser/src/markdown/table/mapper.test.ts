import { Mapper, MapperError, TableDataMapper } from './mapper';

describe('Mapper', () => {
	describe('validateMapper', () => {
		test('single TableDataMapper, should pass', () => {
			const [validated] = Mapper.validateMapper('skip', 3);
			expect(validated).toEqual(['skip', 'skip', 'skip'] as TableDataMapper[]);

			const [validated2] = Mapper.validateMapper('skip', 3);
			expect(validated2).toEqual(['skip', 'skip', 'skip'] as TableDataMapper[]);
		});

		test('validate TableDataMapper[], should pass', () => {
			const validAligns: TableDataMapper[][] = [
				['skip', 'skip', 'skip'],
				[() => '', () => '', () => ''],
				[() => '', 'skip', () => '']
			];

			validAligns.forEach((v, i) => {
				const [validated] = Mapper.validateMapper(v, v.length);

				expect(validated).toEqual(v);
			});
		});

		test('validate TableDataMapper[], should error', () => {
			const validAligns: TableDataMapper[][] = [['skip'], [() => ''], []];
			const length = 3;

			validAligns.forEach((v, i) => {
				const [, error] = Mapper.validateMapper(v, length);

				const expectedError: MapperError = 'Invalid Mapper';

				expect(error).toEqual(expectedError);
			});
		});
	});
});
