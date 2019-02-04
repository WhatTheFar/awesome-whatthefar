import { Align, AlignError, ValidAlign } from '@src/parser/markdown/table/align';

describe('Align', () => {
	describe('validateAlign', () => {
		test('single ValidAlign, should pass', () => {
			const validAligns: ValidAlign[] = ['left', 'center', 'right', 'skip'];
			const length = 3;

			validAligns.forEach((v, i) => {
				const [validated] = Align.validateAlign(v, length);
				expect(validated).toEqual(new Array(length + 1).fill(v));
			});
		});

		test('single Invalid Align, should error', () => {
			const validAligns: Array<Exclude<Align, ValidAlign>> = [
				{ type: 'Reference', colunm: 2 },
				{ type: 'Reference', colunm: 5 }
			];
			const length = 3;

			validAligns.forEach((v, i) => {
				const [, error] = Align.validateAlign(v, length);

				const expectedError: AlignError = 'invalid align';

				expect(error).toEqual(expectedError);
			});
		});

		test('validate Align[], should pass', () => {
			const validAligns: Align[][] = [
				['left', 'center', 'right', 'skip'],
				['left', { type: 'Reference', colunm: 0 }],
				['left', { type: 'Reference', colunm: 1 }]
			];

			validAligns.forEach((v, i) => {
				const [validated] = Align.validateAlign(v, v.length);

				expect(validated).toEqual(v);
			});
		});

		test('validate Align[], should error', () => {
			const validAligns: Align[][] = [
				[
					'left',
					{ type: 'Reference', colunm: 0 },
					{ type: 'Reference', colunm: 0 }
				],
				['left', { type: 'Reference', colunm: 2 }]
			];

			validAligns.forEach((v, i) => {
				const [, error] = Align.validateAlign(v, v.length);

				const expectedError: AlignError = 'invalid align';

				expect(error).toEqual(expectedError);
			});
		});
	});
});
