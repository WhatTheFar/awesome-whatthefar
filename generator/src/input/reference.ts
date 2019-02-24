import { MarkdownPageReference } from '@src/parser/markdown/types';
import { MarkdownPage } from '../parser/markdown/types';

const anotherRefPage = MarkdownPage.create({
	title: 'Another Reference',
	description: 'For testing purpose',
	items: [
		{
			type: 'MarkdownPlainText',
			text: 'Just an another reference page'
		}
	]
});

export const referencePage = MarkdownPage.create({
	// type: 'MarkdownPage',
	title: 'Reference',
	description: '',
	reference: {
		anotherRefPage: new MarkdownPageReference(anotherRefPage, 'another-ref.md')
	},
	items: [
		{
			type: 'MarkdownTable',
			title: 'Management',
			tableData: {
				input: {
					type: 'MemoryInput',
					data: [
						['Title', 'Description', 'Reference'],
						[
							'8 Bad Mistakes That Make Good Employees Leave',
							'จาก Mission to the moon',
							// tslint:disable-next-line:max-line-length
							'https://www.forbes.com/sites/travisbradberry/2016/09/07/8-bad-mistakes-that-make-good-employees-leave/#24fdfb1943b7'
						]
					]
				},
				options: {
					align: ['left', 'left', { type: 'Reference', colunm: 0 }]
				}
			}
		},
		{
			type: 'MarkdownSection',
			title: 'Another Reference',
			items: [
				{
					type: 'MarkdownPlainText',
					text: ctx => `[Click here](${ctx.pageReferences.anotherRefPage})`
				}
			]
		}
	]
});
