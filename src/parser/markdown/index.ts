import { writeFileSync } from 'fs';
import { parseMarkdownPage } from './page';
import { MarkdownPage, MarkdownTable } from './types';

export async function generateMarkdownFile(
	markdownPage: MarkdownPage,
	filepath: string
): Promise<void> {
	const markdown = await parseMarkdownPage(markdownPage);
	writeFileSync(filepath, markdown);
	return;
}
