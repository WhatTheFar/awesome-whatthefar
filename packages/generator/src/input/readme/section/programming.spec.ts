import { categoryFrom } from './programming';

describe('Generate Items', () => {
	test.each`
		other                                  | category
		${'Kubernetes[Configuration]'}         | ${'Kubernetes'}
		${'Kubernetes[Continuous Deployment]'} | ${'Kubernetes'}
		${'Kubernetes[CI/CD]'}                 | ${'Kubernetes'}
		${'[Progressive Delivery]'}            | ${''}
		${'IaC'}                               | ${'IaC'}
	`(
		'categoryFrom($other) should return $category',
		({ other, category }: { other: string; category: string | null }) => {
			const actual: string | null = categoryFrom(other);

			expect(actual).toEqual(category);
		}
	);
});
