import * as fs from 'fs';
import * as path from 'path';
import { MarkdownPlainText } from '../markdown';
import { renderMarkdown, sanitizeKey } from './renderer';

describe('Renderer', () => {
	describe('sanitizeKey(key)', () => {
		test.each`
			key                         | sanitized
			${'CI/CD'}                  | ${'ci-cd'}
			${'Configuration Language'} | ${'configuration-language'}
			${'[Ingress Controller]'}   | ${'ingress-controller'}
		`(
			'sanitizeKey($key) should return',
			({ key, sanitized }: { key: string; sanitized: string }) => {
				const received: string = sanitizeKey(key);

				expect(received).toBe(sanitized);
			}
		);
	});

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

		test('render toc template, should pass', async () => {
			const FIXTURE_DIR = path.resolve(__dirname, 'fixture');

			const fileName = 'toc.rendered.md';
			const sourceFilePath = path.resolve(FIXTURE_DIR, 'toc.md');

			await renderMarkdown(
				{
					fileName,
					dirPath: FIXTURE_DIR,
					sourceFilePath,
					reference: {}
				},
				{},
				{ tableOfContents: true }
			);

			const result = fs
				.readFileSync(path.resolve(FIXTURE_DIR, fileName))
				.toString();

			expect(result).toBe(`# Awesome

<!--START_SECTION:awesome:table-of-contents-->

## Table of Contents

-   [Section 1](#section-1)
-   [Section 2](#section-2)

<!--END_SECTION:awesome:table-of-contents-->

## Section 1

## Section 2
`);
		});
	});
});