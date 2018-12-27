import {
	MarkdownPage,
	MarkdownItem,
	MarkdownHeader,
	MarkdownTable,
	MarkdownSection
} from './types';
import { NEW_LINE, SPACE, parseMarkdownTableFromCsvInput } from './table';
import { pad, formatMarkdown } from './utils';
import { writeFileSync } from 'fs';

export async function generateMarkdownFile(
	markdownPage: MarkdownPage,
	filepath: string
): Promise<void> {
	const markdown = await parseMarkdownFile(markdownPage);
	writeFileSync(filepath, markdown);
	return;
}

async function parseMarkdownFile({
	title,
	description,
	items,
	options
}: MarkdownPage): Promise<string> {
	let output: string = '';
	const header = parseMarkdownHeader({ type: 'MarkdownHeader', title, size: 2 });

	output += header + NEW_LINE;
	if (description) {
		output += description + NEW_LINE;
	}
	if (items) {
		const markdownItems = await Promise.all(items.map(parseMardownItem));
		output += markdownItems.join(NEW_LINE) + NEW_LINE;
	}

	return formatMarkdown(output);
	// return output;
}

async function parseMardownItem(item: MarkdownItem): Promise<string> {
	switch (item.type) {
		case 'MarkdownSection':
			return await parseMarkdownSection(item);
			break;
		case 'MarkdownHeader':
			return parseMarkdownHeader(item);
			break;
		case 'MarkdownTable':
			return await parseMarkdownTable(item);
			break;
		default:
			const _exhaustiveCheck: never = item;
			return _exhaustiveCheck;
	}
}

async function parseMarkdownSection({
	title,
	description,
	items
}: MarkdownSection): Promise<string> {
	let output: string = '';
	const header = parseMarkdownHeader({ type: 'MarkdownHeader', title, size: 2 });

	output += header + NEW_LINE;

	if (description) {
		output += description + NEW_LINE;
	}
	if (items) {
		const markdownItems = await Promise.all(items.map(parseMardownItem));
		output += markdownItems.join(NEW_LINE) + NEW_LINE;
	}
	return output;
}

function parseMarkdownHeader({ title, size }: MarkdownHeader): string {
	return pad(size, '#') + SPACE + title;
}

async function parseMarkdownTable(table: MarkdownTable): Promise<string> {
	const [tableString, err] = await parseMarkdownTableFromCsvInput(
		table.data.input,
		table.data.options
	);
	if (err) {
		console.error(table.title);
		console.error(err);
		process.exit();
	}
	const { title, description } = table;
	const header = parseMarkdownHeader({ type: 'MarkdownHeader', title, size: 3 });
	return (
		header +
		NEW_LINE +
		(description ? description + NEW_LINE : '') +
		tableString +
		NEW_LINE
	);
}
