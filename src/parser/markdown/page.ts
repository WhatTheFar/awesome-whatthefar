import * as _ from 'lodash';
import { MD_PAGE_HEADER_SIZE, NEW_LINE } from './constant';
import { parseMardownItem } from './item';
import { parseMarkdownHeader } from './item/header';
import { parseTableOfContent } from './table-of-content';
import { defaultMarkdownPageOptions, MarkdownPage, MarkdownPageOptions } from './types';
import { formatMarkdown, parseHeaderReference } from './utils';

const tableOfContentsTitle = 'Table of Contents';
const backToTopTitle = 'Back to Top';

export interface MarkdownPageContext {
	backToTop: boolean;
	backToTopReference: string;
}

export async function parseMarkdownPage({
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

	let context: MarkdownPageContext;
	if (tableOfContent) {
		context = {
			backToTop,
			backToTopReference: parseHeaderReference(backToTopTitle, tableOfContentsTitle)
		};
	} else {
		context = {
			backToTop,
			backToTopReference: parseHeaderReference(title, tableOfContentsTitle)
		};
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
		const parseItems = _.partial(parseMardownItem, _, context);
		const markdownItems = await Promise.all(items.map(parseItems));
		output += markdownItems.join(NEW_LINE) + NEW_LINE;
	}

	return formatMarkdown(output);
	// return output;
}
