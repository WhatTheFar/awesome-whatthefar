import { DataByCategory } from './category';

describe('class DataByCategory', () => {
	describe('Given an instance of DataByCategory<string, string>', () => {
		class SimpleDataByCategory extends DataByCategory<string, string> {
			public categoryFor(key: string): string {
				return key;
			}

			public keyFor(category: string): string {
				return category;
			}
		}

		const instance = new SimpleDataByCategory([
			{ key: 'first', data: ['1'] },
			{ key: 'second', data: ['1', '2'] },
			{ key: 'third', data: ['1', '2', '3'] },
		]);

		describe('When forEach() is called', () => {
			test('Then all rows must be called with fn()', () => {
				const spy = jest.fn((_category: string, _row: string) => {});

				instance.forEach(spy);

				expect(spy.mock.calls.length).toBe(6);
			});
		});

		describe('When filter() is called', () => {
			test('Then it should return new instance with data changed', () => {
				const spy = jest.fn((_category: string, row: string) => {
					return row !== '2';
				});

				const actual = instance.filter(spy);

				expect(actual).not.toBe(instance);
				expect(actual).toBeInstanceOf(DataByCategory);

				let count = 0;
				actual.forEach(() => {
					count += 1;
				});
				expect(count).toBe(4);
				expect(spy.mock.calls.length).toBe(6);
			});
		});
	});
});
