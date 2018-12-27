import { MarkdownPage } from '../parser/markdown/types';
import {
	contactTable,
	programmingPrincipleTable,
	programmingLanguageTable,
	frontendTable,
	backendTable,
	androidTable,
	devOpsTable,
	programmingBookTable,
	udemyTable,
	nonFictionThaiBookTable,
	fictionBookTable,
	nonFictionBookTable
} from './table.input';

export const readmeMarkdown: MarkdownPage = {
	type: 'MarkdownPage',
	title: 'Awesome WhatTheFar',
	description: `
[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

😎 Curated list of awesome WhatTheFar`,
	items: [
		contactTable,
		{
			type: 'MarkdownSection',
			title: 'My Developer Skills',
			items: [
				programmingPrincipleTable,
				programmingLanguageTable,
				frontendTable,
				backendTable,
				androidTable,
				devOpsTable
			]
		},
		{
			type: 'MarkdownSection',
			title: 'My Readling List',
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
			items: [udemyTable]
		}
	]
};
