import { MarkdownPageContext, MarkdownSection } from '@src/parser/markdown/types';
import { ReferencePagePageReference } from '../reference';

export const managementSection: MarkdownSection<
	MarkdownPageContext<ReferencePagePageReference>
> = {
	type: 'MarkdownSection',
	title: 'Management 101',
	items: [
		{
			type: 'MarkdownTable',
			title: 'Engineering Management',
			tableData: {
				input: {
					type: 'MemoryInput',
					data: [
						['Title', 'Description', 'Reference'],
						[
							'The Eng Team Handbook',
							'เห็นพี่ต้าแชร์ แล้วคิดว่าดี',
							// tslint:disable-next-line:max-line-length
							'https://github.com/raylene/eng-handbook'
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
			title: 'Human Resource',
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
		}
	]
};
