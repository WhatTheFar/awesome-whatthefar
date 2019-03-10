import { existsSync } from 'fs';
import * as _ from 'lodash';
import { relative, resolve } from 'path';
import { MD_PAGE_HEADER_SIZE, NEW_LINE } from './constant';
import { parseMardownItem } from './item';
import { parseMarkdownHeader } from './item/header';
import { parseTableOfContent } from './table-of-content';
import {
	defaultMarkdownPageOptions,
	MarkdownContextHelper,
	MarkdownPage,
	MarkdownPageContext,
	MarkdownPageOptions
} from './types';
import { formatMarkdown, parseHeaderReference } from './utils';

const tableOfContentsTitle = 'Table of Contents';
const backToTopTitle = 'Back to Top';

function createMarkdownContextHelper(page: MarkdownPage): MarkdownContextHelper {
	const { dirPath } = page;
	return {
		createMarkdownImage: (
			altText: string,
			absoluteImagePath: string,
			title?: string
		) => {
			if (!existsSync(absoluteImagePath)) {
				console.log(`${altText}: ${absoluteImagePath} not found`);
			}
			const relativeImageRef = relative(dirPath, absoluteImagePath);
			return `![${altText}](${relativeImageRef}${title ? ` "${title}"` : ''})`;
		},

		getRelativePathToPage: (anotherPath: string) => relative(dirPath, anotherPath)
	};
}

export async function parseMarkdownPage(page: MarkdownPage): Promise<string> {
	const { title, description, dirPath, fileName, items, options, reference } = page;

	const { tableOfContent, backToTop, initialState }: Required<MarkdownPageOptions> = {
		...defaultMarkdownPageOptions,
		...options
	};
	let output: string = '';

	let context: MarkdownPageContext;
	let backToTopReference: string;
	const pageReferences = reference ? reference : {};
	if (tableOfContent) {
		backToTopReference = parseHeaderReference(backToTopTitle, tableOfContentsTitle);
	} else {
		backToTopReference = parseHeaderReference(title, tableOfContentsTitle);
	}

	// Create MarkdownPageContext
	context = {
		metaData: {
			dirPath,
			fileName
		},
		helper: createMarkdownContextHelper(page),
		backToTop,
		backToTopReference,
		pageReferences,
		state: initialState,
		dispatch: newState => {
			context.state = { ...context.state, ...newState };
		}
	};

	// Init PageReferences
	for (const key in reference) {
		if (reference.hasOwnProperty(key)) {
			const element = reference[key];
			element.relativePath = relative(
				dirPath,
				resolve(element.page.dirPath, element.page.fileName)
			);
		}
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
