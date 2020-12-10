import { MarkdownItem, MarkdownPage } from '@awesome-whatthefar/parser';
import { resolve } from 'path';
import { createPathAppendFunction } from '../../directory';
import { GENERATED_CONTENT_DIR, MYERS_BRIGGS_DIR } from './../../directory';
// tslint:disable:max-line-length

const get1MyersBriggsPath = createPathAppendFunction(MYERS_BRIGGS_DIR);
const personalitiesTestDir = resolve(MYERS_BRIGGS_DIR, '16personalities');
const get16PersonalitiesTestPath = createPathAppendFunction(personalitiesTestDir);

function create16PersonalitiesTestMarkdown(filename: string): MarkdownItem[] {
	return [
		{
			type: 'MarkdownHeader',
			title: filename,
			size: 3,
		},
		{
			type: 'MarkdownImage',
			altText: filename,
			path: get16PersonalitiesTestPath(filename + '.png'),
		},
	];
}
const personalitiesTestDate: string[] = ['2019-01-29', '2018-09-22'];

const reference = {};

export type MyersBriggsPageReference = typeof reference;

export const myersBriggsPage = MarkdownPage.create({
	title: 'Myers–Briggs',
	dirPath: GENERATED_CONTENT_DIR,
	fileName: 'myers-briggs.md',
	options: {
		tableOfContent: true,
		backToTop: true,
	},
	reference,
	items: [
		{
			type: 'MarkdownHeader',
			title: 'What is Myers-Briggs Type Indicator?',
			size: 2,
		},
		{
			type: 'MarkdownPlainText',
			text: `
The Myers–Briggs Type Indicator (MBTI) is an introspective self-report questionnaire with the purpose of indicating differing psychological preferences in how people perceive the world around them and make decisions.

Reference: [Myers–Briggs Type Indicator](https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator)
`,
		},
		{
			type: 'MarkdownImage',
			altText: 'Myers-Briggs',
			path: get1MyersBriggsPath('MyersBriggsTypes.png'),
		},
		{
			type: 'MarkdownSection',
			title: 'My 16Personalities Test',
			description:
				'The test is taken on [16Personalities](https://www.16personalities.com/).',
			items: [
				...personalitiesTestDate
					.map(create16PersonalitiesTestMarkdown)
					.reduce((a, b) => a.concat(b), []),
			],
		},
	],
});
