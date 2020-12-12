import { existsSync, mkdirSync, writeFileSync } from 'fs';
import _ from 'lodash';
import { resolve } from 'path';
import { parseMarkdownPage } from './page';
import { MarkdownPage, MarkdownPageReferenceDict } from './types';

function mkdirpSync(dir: string) {
	if (!existsSync(dir)) {
		mkdirSync(dir, { recursive: true });
	}
}

export async function generateMarkdownFile<T extends MarkdownPageReferenceDict>(
	markdownPage: MarkdownPage<T>
): Promise<void> {
	const ref = markdownPage.reference as MarkdownPageReferenceDict;
	const { dirPath, fileName } = markdownPage;
	const filepath = resolve(dirPath, fileName);

	// TODO: prevent circular dependency and infinite recursion
	for (const key in ref) {
		if (ref.hasOwnProperty(key)) {
			const value = ref[key];
			await generateMarkdownFile(value.page);
		}
	}
	// TODO: do not parse and create markdown if it exits
	const markdown = await parseMarkdownPage((markdownPage as unknown) as MarkdownPage);
	mkdirpSync(dirPath);
	writeFileSync(filepath, markdown);
	return;
}
