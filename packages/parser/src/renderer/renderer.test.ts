import * as path from 'path';
import { MarkdownPlainText, MarkdownText } from '../markdown';
import { renderMarkdown } from './renderer';
import * as fs from 'fs';

describe('Renderer', () => {
	describe('renderMarkdown(file, map)', () => {
		test('render simple template, should pass', async () => {
			const FIXTURE_DIR = path.resolve(__dirname, 'fixture');

			const fileName = 'simple.rendered.md';
			const sourceFilePath = path.resolve(FIXTURE_DIR, 'simple.md');

			const content: MarkdownPlainText = {
				type: 'MarkdownPlainText',
				text: 'New content'
			};

			await renderMarkdown(
				{
					fileName,
					dirPath: FIXTURE_DIR,
					sourceFilePath,
					reference: {}
				},
				{
					simple: [content]
				}
			);

			const result = fs
				.readFileSync(path.resolve(FIXTURE_DIR, fileName))
				.toString();

			expect(result).toBe(`<!--START_SECTION:awesome:simple-->

New content

<!--END_SECTION:awesome:simple-->
`);
		});
	});
});
