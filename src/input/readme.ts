import { MarkdownPage } from '../parser/markdown/types';
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
			type: 'MarkdownSection',
			title: 'My Programming Skills',
			items: [
				programmingPrincipleTable,
				programmingLanguageTable,
				{
					type: 'MarkdownSection',
					title: 'Developer',
					items: [frontendTable, backendTable, androidTable]
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
			title: 'Self-learning List',
			items: [udemyTable, tedxTalkTable]
		}
	]
};
