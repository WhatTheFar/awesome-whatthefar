import { BackToTopItem, MarkdownPage } from '../parser/markdown/types';
import {
	androidTable,
	backendTable,
	contactTable,
	devOpsTable,
	fictionBookTable,
	frontendTable,
	nonFictionBookTable,
	nonFictionThaiBookTable,
	programmingBookTable,
	programmingLanguageTable,
	programmingPrincipleTable,
	tedxTalkTable,
	udemyTable
} from './table';
// tslint:disable:max-line-length

export const readmeMarkdown: MarkdownPage = {
	type: 'MarkdownPage',
	title: 'Awesome WhatTheFar',
	description: `
[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

😎 Curated list of awesome WhatTheFar`,
	options: {
		tableOfContent: true,
		backToTop: true
	},
	items: [
		// For debugging purpose
		// {
		// 	type: 'MarkdownList',
		// 	list: [
		// 		'FirstItem',
		// 		{ type: 'MarkdownList', list: ['NestedFirst', 'NestedSecond'] }
		// 	]
		// },
		contactTable,
		{
			type: 'MarkdownTable',
			title: 'Medium Stories',
			tableData: {
				input: {
					type: 'MemoryInput',
					data: [
						['Title', 'Language', 'Date', 'Reference'],
						[
							'Best of Jakpat M. 2018',
							'TH',
							'Dec 31, 2018',
							'https://medium.com/@jakpat.m/best-of-jakpat-m-2018-d379a482826e'
						],
						[
							'ทำไมคนถึง(ไม่)ใช้ Chula Popbus ด้วยแนวคิด Hooked Model',
							'TH',
							'Nov 15, 2018',
							'https://medium.com/thinc-org/hooked-chula-popbus-th-c7688bac200b'
						],
						[
							'การฝึกงานครั้งแรก จากมุมมองเด็กอายุ 19',
							'TH',
							'Aug 18, 2018',
							'https://medium.com/c0d1um/first-internship-th-e96805fd2686'
						]
					]
				},
				options: {
					align: ['left', 'center', 'center', { type: 'Reference', colunm: 0 }]
				}
			}
		},
		{
			type: 'MarkdownSection',
			title: 'My Programming Skills',
			items: [
				programmingPrincipleTable,
				programmingLanguageTable,
				{
					type: 'MarkdownSection',
					title: 'Developer',
					items: [
						frontendTable,
						backendTable,
						androidTable,
						{
							type: 'MarkdownItemGroup',
							items: [
								{ type: 'MarkdownHeader', title: 'iOS', size: 3 },
								{
									type: 'MarkdownPlainText',
									text: "Sorry, I don't code iOS ;)"
								},
								BackToTopItem
							]
						},
						{
							type: 'MarkdownTable',
							title: 'Cross-platform',
							tableData: {
								input: {
									type: 'MemoryInput',
									data: [
										['Title', 'Expertise Level'],
										['React Native', 'Beginner'],
										['Flutter', 'Beginner']
									]
								},
								options: {
									align: ['left', 'center']
								}
							}
						}
					]
				},
				devOpsTable
			]
		},
		{
			type: 'MarkdownSection',
			title: 'My Reading List',
			items: [
				programmingBookTable,
				nonFictionBookTable,
				nonFictionThaiBookTable,
				fictionBookTable
			]
		},
		{
			type: 'MarkdownSection',
			title: 'My Self-learning List',
			items: [udemyTable, tedxTalkTable]
		}
	]
};
