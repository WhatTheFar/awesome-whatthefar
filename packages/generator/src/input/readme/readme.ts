import { BACK_TO_TOP, MarkdownPage, MarkdownPageReference } from '@awesome/parser';
import { GENERATED_ROOT_DIR } from '../../directory';
import { bookPage } from '../book';
import { podcastPage } from '../podcast';
import { referencePage } from '../reference';
import {
	androidTable,
	backendTable,
	courseraTable,
	devOpsTable,
	frontendTable,
	programmingLanguageTable,
	programmingPrincipleTable,
	tedxTalkTable,
	udacityTable,
	udemyTable
} from '../table';
import { getAssetPath } from './../../directory';
import { aboutMeSection } from './section/about-me';
import { librarySection } from './section/library';
// tslint:disable:max-line-length

const reference = {
	referencePage: new MarkdownPageReference(referencePage),
	podcastPage: new MarkdownPageReference(podcastPage),
	bookPage: new MarkdownPageReference(bookPage)
};

export type ReadmePagePageReference = typeof reference;

export const readmePage = MarkdownPage.create({
	title: 'Awesome WhatTheFar',
	description: `
[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

😎 Curated list of awesome WhatTheFar`,
	dirPath: GENERATED_ROOT_DIR,
	fileName: 'README.md',
	options: {
		tableOfContent: true,
		backToTop: true
	},
	reference,
	items: [
		aboutMeSection,
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
								BACK_TO_TOP
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
		librarySection,
		{
			type: 'MarkdownSection',
			title: 'My Self-learning List',
			items: [udemyTable, courseraTable, udacityTable, tedxTalkTable]
		},
		{
			type: 'MarkdownSection',
			title: 'My Reference',
			items: [
				{
					type: 'MarkdownPlainText',
					text: ctx => `[Go to Reference page](${ctx.pageReferences.referencePage})`
				},
				BACK_TO_TOP
			]
		},
		{
			type: 'MarkdownSection',
			title: 'Potato',
			items: [
				{
					type: 'MarkdownPlainText',
					text: ctx =>
						ctx.helper.createMarkdownImage(
							"Sorry for the Long Post, here's a Potato",
							getAssetPath('potato.jpg'),
							"Sorry for the Long Post, here's a Potato"
						)
				},
				BACK_TO_TOP
			]
		}
	]
});
