import { DataByCategory } from './category';
import { DataBySubcategory, MainCategoryWtihSub, parseSubcategory } from './subcategory';

describe('Subcategory', () => {
	test.each`
		other                                  | category
		${'Kubernetes[Configuration]'}         | ${['Kubernetes', 'Configuration']}
		${'Kubernetes[Continuous Deployment]'} | ${['Kubernetes', 'Continuous Deployment']}
		${'Kubernetes[CI/CD]'}                 | ${['Kubernetes', 'CI/CD']}
		${'[Progressive Delivery]'}            | ${['', 'Progressive Delivery']}
		${'IaC'}                               | ${['IaC', '']}
	`(
		'categoryFrom($other) should return $category',
		({ other, category }: { other: string; category: [string, string] }) => {
			const actual: [string, string] = parseSubcategory(other);

			expect(actual).toEqual(category);
		}
	);
});

describe('class DataBySubcategory', () => {
	describe('Given an instance of DataBySubcategory<string>', () => {
		const instance = new DataBySubcategory([
			{ key: 'Frontend.CSS', data: ['1'] },
			{ key: 'Frontend.React', data: ['1', '2'] },
			{ key: 'Backend.', data: ['1', '2', '3'] },
			{ key: 'Kubernetes.Service Mesh', data: ['1', '2', '3', '4'] },
		]);

		describe('When filter() is called', () => {
			test('Then it should return new instance with data changed', () => {
				const spy = jest.fn((_category: MainCategoryWtihSub, row: string) => {
					return row !== '2';
				});

				const actual = instance.filter(spy);

				expect(actual).not.toBe(instance);
				expect(actual).toBeInstanceOf(DataByCategory);
				expect(actual).toBeInstanceOf(DataBySubcategory);

				let count = 0;
				actual.forEach(() => {
					count += 1;
				});
				expect(count).toBe(7);
				expect(spy.mock.calls.length).toBe(10);
			});
		});
	});
});
