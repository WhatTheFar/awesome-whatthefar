import { BACK_TO_TOP, MarkdownPage, MarkdownPageReference } from '@awesome/parser';
import { GENERATED_ROOT_DIR } from '../../directory';
import { bookPage } from '../book';
import { potatoImage } from '../image';
import { podcastPage } from '../podcast';
import { referencePage } from '../reference';
import { courseraTable, tedxTalkTable, udacityTable, udemyTable } from '../table';
import { myersBriggsPage } from './../myers-briggs/myers-briggs';
import { aboutMeSection } from './section/about-me';
import { librarySection } from './section/library';
import { createProgrammingSection } from './section/programming';
// tslint:disable:max-line-length

const reference = {
	referencePage: new MarkdownPageReference(referencePage),
	podcastPage: new MarkdownPageReference(podcastPage),
	bookPage: new MarkdownPageReference(bookPage),
	myersBriggs: new MarkdownPageReference(myersBriggsPage)
};

export type ReadmePagePageReference = typeof reference;

export async function createReadmePage() {
	const readmePage = MarkdownPage.create({
		title: 'Awesome WhatTheFar',
		description: `
[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

😎 Curated list of awesome WhatTheFar

> The source code of contents is located at [@awesome/generator](https://github.com/WhatTheFar/awesome-whatthefar/tree/dev/packages/generator), powered by [@awesome/parser](https://github.com/WhatTheFar/awesome-whatthefar/tree/dev/packages/parser)
`,
		dirPath: GENERATED_ROOT_DIR,
		fileName: 'README.md',
		options: {
			tableOfContent: true,
			backToTop: true
		},
		reference,
		items: [
			aboutMeSection,
			await createProgrammingSection(),
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
						text: ctx =>
							`[Go to Reference page](${ctx.pageReferences.referencePage})`
					},
					BACK_TO_TOP
				]
			},
			{
				type: 'MarkdownSection',
				title: 'Potato',
				items: [potatoImage, BACK_TO_TOP]
			}
		]
	});

	return readmePage;
}
