import {
	BackToTopItem,
	MarkdownPage,
	MarkdownPageReference
} from '@parser/markdown/types';

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
			type: 'MarkdownSection',
			title: 'Bussiness',
			description: 'There is nothing yet'
		},
		{
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
		},
		{
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
		},
		{
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
		},
		{
			type: 'MarkdownSection',
			title: 'Potato',
			description:
				"![Sorry for the Long Post, here's a Potato](../asset/potato.jpg)",
			items: [BackToTopItem]
		},
		{
			type: 'MarkdownSection',
			title: 'Another Reference',
			items: [
				{
					type: 'MarkdownPlainText',
					text: ctx => `[Click here](${ctx.pageReferences.anotherRefPage})`
				},
				BackToTopItem
			]
		}
	]
});
