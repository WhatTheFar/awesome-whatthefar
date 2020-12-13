import { DataByCategory } from './core';

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
			['first', ['1']],
			['second', ['1', '2']],
			['third', ['1', '2', '3']],
		]);

		describe('When forEach() is called', () => {
			test('Then all rows must be called with fn()', () => {
				const spy = jest.fn((_category: string, _row: string) => {});

				instance.forEach(spy);

				expect(spy.mock.calls.length).toBe(6);
			});
		});

		describe('When filter() is called', () => {
			test('Then data rows must be changed', () => {
				const spy = jest.fn((_category: string, row: string) => {
					return row !== '2';
				});

				instance.filter(spy);

				let count = 0;
				instance.forEach(() => {
					count += 1;
				});

				expect(count).toBe(4);
				expect(spy.mock.calls.length).toBe(6);
			});
		});
	});
});
