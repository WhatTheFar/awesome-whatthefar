import { MarkdownPageContext, MarkdownSection } from '@awesome/parser';
import { ReferencePagePageReference } from '../reference';

export const productDevelopmentSection: MarkdownSection<
	MarkdownPageContext<ReferencePagePageReference>
> = {
	type: 'MarkdownSection',
	title: 'Product Development',
	items: [
		{
			type: 'MarkdownTable',
			title: 'User Experience',
			tableData: {
				input: {
					type: 'MemoryInput',
					data: [
						['Title', 'Description', 'Reference'],
						[
							'Heuristic Evaluation',
							'Introduction to Heuristic Evaluation in Design',
							// tslint:disable-next-line:max-line-length
							'https://uxknowledgebase.com/heuristic-evaluation-897bcd3ffcf4'
						],
						[
							'Mobile Approach in Prototype and Layers of Experience Design',
							'Suwitcha Sugthana (GuCode) [Mobile Conf 2018]',
							'https://youtu.be/oE94Qv3E48Q'
						]
					]
				},
				options: {
					align: ['left', 'left', { type: 'Reference', colunm: 0 }]
				}
			}
		},
		{
			type: 'MarkdownTable',
			title: 'Prototyping',
			tableData: {
				input: {
					type: 'MemoryInput',
					data: [
						['Title', 'Description', 'Reference'],
						[
							'Minimum Viable Product (MVP) and Design - Balancing Risk to Gain Reward',
							'Good reading for MVP',
							// tslint:disable-next-line:max-line-length
							'https://www.interaction-design.org/literature/article/minimum-viable-product-mvp-and-design-balancing-risk-to-gain-reward?utm_source=facebook&utm_medium=sm'
						]
					]
				},
				options: {
					align: ['left', 'left', { type: 'Reference', colunm: 0 }]
				}
			}
		}
	]
};
