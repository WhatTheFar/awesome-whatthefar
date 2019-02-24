import { MarkdownPage } from './../parser/markdown/types';

export const referencePage: MarkdownPage = {
	type: 'MarkdownPage',
	title: 'Reference',
	description: '',
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
		}
	]
};
