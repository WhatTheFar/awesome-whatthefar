import { existsSync, mkdirSync, writeFileSync } from 'fs';
import * as _ from 'lodash';
import { resolve } from 'path';
import { parseMarkdownPage } from './page';
import { MarkdownPage, MarkdownPageReferenceDict } from './types';

function mkdirpSync(dir: string) {
	if (!existsSync(dir)) {
		mkdirSync(dir, { recursive: true });
	}
}

export async function generateMarkdownFile<T extends MarkdownPageReferenceDict>(
	markdownPage: MarkdownPage<T>,
	filepath: string
): Promise<void> {
	const ref = markdownPage.reference as MarkdownPageReferenceDict;
	for (const key in ref) {
		if (ref.hasOwnProperty(key)) {
			const value = ref[key];
			const temp = await parseMarkdownPage(value.page);
			const tempPath = resolve(filepath, '..', value.relativeFilePath);

			mkdirpSync(resolve(tempPath, '..'));
			writeFileSync(tempPath, temp);
		}
	}
	const markdown = await parseMarkdownPage((markdownPage as unknown) as MarkdownPage);
	mkdirpSync(resolve(filepath, '..'));
	writeFileSync(filepath, markdown);
	return;
}
