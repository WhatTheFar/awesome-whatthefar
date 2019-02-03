import { writeFileSync } from 'fs';
import * as _ from 'lodash';
import { NEW_LINE, SPACE, TAB } from './constant';
import { parseMarkdownTableFromCsvInput } from './table';
import {
	defaultMarkdownPageOptions,
	MarkdownHeader,
	MarkdownItem,
	MarkdownList,
	MarkdownListItem,
	MarkdownPage,
	MarkdownPageOptions,
	MarkdownPlainText,
	MarkdownSection,
	MarkdownTable
} from './types';
import { formatMarkdown, pad } from './utils';

const MD_PAGE_HEADER_SIZE = 1;
const MD_SECTION_HEADER_SIZE = 2;
const MD_TABLE_HEADER_SIZE = 3;

const MD_HEADER = '#';
const MD_LIST = '*';

const tableOfContentsTitle = 'Table of Contents';
const backToTopTitle = 'Back to Top';

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
	const { tableOfContent, backToTop }: Required<MarkdownPageOptions> = {
		...defaultMarkdownPageOptions,
		...options
	};
	let output: string = '';

	let backToTopLine: string | null = null;
	if (tableOfContent && backToTop) {
		backToTopLine = parseHeaderReference(backToTopTitle, tableOfContentsTitle);
	} else if (backToTop) {
		backToTopLine = parseHeaderReference(backToTopTitle, title);
	}

	const header = parseMarkdownHeader({
		type: 'MarkdownHeader',
		title,
		size: MD_PAGE_HEADER_SIZE
	});

	output += header + NEW_LINE;
	if (description) {
		output += description + NEW_LINE;
	}

	if (tableOfContent && items) {
		output +=
			parseMarkdownHeader({
				type: 'MarkdownHeader',
				title: tableOfContentsTitle,
				size: 2
			}) + NEW_LINE;
		output += parseTableOfContent(items) + NEW_LINE + NEW_LINE;
	}

	if (items) {
		const parseItems = _.partial(parseMardownItem, _, backToTopLine);
		const markdownItems = await Promise.all(items.map(parseItems));
		output += markdownItems.join(NEW_LINE) + NEW_LINE;
	}

	return formatMarkdown(output);
	// return output;
}

async function parseMardownItem(item: MarkdownItem, backToTop?: string): Promise<string> {
	let result: string;
	switch (item.type) {
		case 'MarkdownSection':
			result = await parseMarkdownSection(item, backToTop);
			break;
		case 'MarkdownHeader':
			result = parseMarkdownHeader(item);
			break;
		case 'MarkdownTable':
			result = await parseMarkdownTable(item);
			break;
		case 'MarkdownPlainText':
			result = parseMarkdownPlainText(item);
			break;
		case 'MarkdownList':
			result = parseMarkdownList(item);
			break;
		default:
			const _exhaustiveCheck: never = item;
			return _exhaustiveCheck;
	}

	if (backToTop) {
		switch (item.type) {
			case 'MarkdownTable':
				result += NEW_LINE;
				result += backToTop;
		}
	}

	return result;
}

async function parseMarkdownSection(
	{ title, description, items }: MarkdownSection,
	backToTop?: string
): Promise<string> {
	let output: string = '';
	const header = parseMarkdownHeader({
		type: 'MarkdownHeader',
		title,
		size: MD_SECTION_HEADER_SIZE
	});

	output += header + NEW_LINE;

	if (description) {
		output += description + NEW_LINE;
	}
	if (items) {
		const parseItems = _.partial(parseMardownItem, _, backToTop);
		const markdownItems = await Promise.all(items.map(parseItems));
		output += markdownItems.join(NEW_LINE) + NEW_LINE;
	}
	return output;
}

function parseMarkdownHeader({ title, size }: MarkdownHeader): string {
	return pad(size, MD_HEADER) + SPACE + title;
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
	const header = parseMarkdownHeader({
		type: 'MarkdownHeader',
		title,
		size: MD_TABLE_HEADER_SIZE
	});
	return (
		header +
		NEW_LINE +
		(description ? description + NEW_LINE : '') +
		tableString +
		NEW_LINE
	);
}

function parseMarkdownPlainText(item: MarkdownPlainText): string {
	return item.text;
}

function parseMarkdownList(item: MarkdownList, offset: number = 0): string {
	const { list } = item;
	let output: string = '';

	if (list) {
		if (offset > 5) {
			throw new Error('List can not be nested more than 5');
		}
		output += list.map(_.partial(parseMarkdownListItem, _, offset)).join(NEW_LINE);
	}
	return output;
}

function parseMarkdownListItem(item: MarkdownListItem, offset: number): string {
	let output: string = '';

	if (typeof item === 'string') {
		output += pad(offset, TAB) + MD_LIST + TAB + item;
	} else {
		output += parseMarkdownList(item, ++offset);
	}

	return output;
}

function isTableOfContent(item: MarkdownItem): boolean {
	switch (item.type) {
		case 'MarkdownSection':
		case 'MarkdownHeader':
		case 'MarkdownTable':
			return true;
			break;
		case 'MarkdownPlainText':
		case 'MarkdownList':
			return false;
			break;
		default:
			const _exhaustiveCheck: never = item;
			return _exhaustiveCheck;
	}
}

function parseTableOfContent(
	item: MarkdownItem | MarkdownItem[],
	offset: number = 0
): string {
	let output = '';

	if (item instanceof Array) {
		return item
			.filter(isTableOfContent)
			.map(_.partial(parseTableOfContent, _, offset))
			.join(NEW_LINE);
	} else {
		switch (item.type) {
			case 'MarkdownSection':
				output +=
					pad(offset, TAB) +
					MD_LIST +
					TAB +
					parseHeaderReference(item.title, item.title);
				if (item.items) {
					output += NEW_LINE + parseTableOfContent(item.items, ++offset);
				}
				break;
			case 'MarkdownHeader':
			case 'MarkdownTable':
				output +=
					pad(offset, TAB) +
					MD_LIST +
					TAB +
					parseHeaderReference(item.title, item.title);
				break;
			case 'MarkdownList':
			case 'MarkdownPlainText':
				break;
			default:
				const _exhaustiveCheck: never = item;
				return _exhaustiveCheck;
		}
	}
	return output;
}

function parseHeaderReference(text: string, headerToBeRefered: string): string {
	const ref = MD_HEADER + headerToBeRefered.replace(/[\s_]+/g, '-').toLowerCase();
	return `[${text}](${ref})`;
}
