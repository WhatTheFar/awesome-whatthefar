import { MarkdownPageContext, MarkdownSection } from '@awesome/parser';
import { ReferencePagePageReference } from '../reference';

export const softwareDevelopmentSection: MarkdownSection<
	MarkdownPageContext<ReferencePagePageReference>
> = {
	type: 'MarkdownSection',
	title: 'Software Development',
	items: [
		{
			type: 'MarkdownTable',
			title: 'Design Pattern',
			tableData: {
				input: {
					type: 'MemoryInput',
					data: [
						['Title', 'Description', 'Reference'],
						[
							'Design patterns ภาษาไทย',
							'เขียนดี มีรูปภาพ ภาษาไทย',
							// tslint:disable-next-line:max-line-length
							'https://github.com/saladpuk/design-patterns'
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
