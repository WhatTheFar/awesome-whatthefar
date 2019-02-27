import { MarkdownPageContext, MarkdownSection } from '@src/parser/markdown/types';
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
		}
	]
};
