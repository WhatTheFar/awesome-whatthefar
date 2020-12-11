import { categoryFrom } from './programming';

describe('Generate Items', () => {
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
			const actual: [string, string] = categoryFrom(other);

			expect(actual).toEqual(category);
		}
	);
});
