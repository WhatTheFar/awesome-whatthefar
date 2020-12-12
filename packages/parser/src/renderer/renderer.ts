import * as fs from 'fs';
import _ = require('lodash');
import toc from 'markdown-toc';
import { resolve } from 'path';
import { NEW_LINE } from '../markdown/constant';
import { parseMardownItem } from '../markdown/item';
import { createMarkdownContext } from '../markdown/page';
import { MarkdownItem, MarkdownPage } from '../markdown/types';
import { formatMarkdown } from '../markdown/utils';
import { OmitStrict } from '../types';

const TABLE_OF_CONTENTS_KEY = 'table-of-contents';

export interface MarkdownFile
	extends OmitStrict<MarkdownPage, 'title' | 'description' | 'items'> {
	sourceFilePath: string;
}

export interface RenderMap {
	[name: string]: MarkdownItem[];
}

export function sanitizeKey(key: string): string {
	return key
		.toLowerCase()
		.replace(/[ \/]/g, '-')
		.replace(/[\[\]]/g, '');
}

export interface RenderOptions {
	verbose: boolean;
	tableOfContents: boolean;
}

const defaultOptions: RenderOptions = {
	verbose: false,
	tableOfContents: false
};

export async function renderMarkdown(
	file: MarkdownFile,
	map: RenderMap,
	opts?: Partial<RenderOptions>
) {
	const { verbose, tableOfContents }: RenderOptions = {
		...defaultOptions,
		...opts
	};

	const logVerbose = (text: string) => {
		if (verbose === true) {
			console.log(text);
		}
	};

	const { sourceFilePath, dirPath, fileName } = file;
	const filepath = resolve(dirPath, fileName);

	const context = createMarkdownContext(file);

	const rawMD = fs.readFileSync(sourceFilePath).toString();
	let md = rawMD;

	for (const name in map) {
		if (map.hasOwnProperty(name)) {
			const items = map[name];

			const sanitizedKey = sanitizeKey(name);

			const startComment = `<!--START_SECTION:awesome:${sanitizedKey}-->`;
			const endComment = `<!--END_SECTION:awesome:${sanitizedKey}-->`;
			const re = new RegExp(`${startComment}[\\s\\S]+${endComment}`);

			if (!re.test(rawMD)) {
				logVerbose(`Key '${sanitizedKey}' does not exists`);
				continue;
			}

			const parseItems = _.partial(parseMardownItem, _, context);
			const markdownItems = await Promise.all(items.map(parseItems));
			const content = markdownItems.join(NEW_LINE) + NEW_LINE;

			md = md.replace(
				re,
				`${startComment}
${content}
${endComment}`
			);
		}
	}

	// Render table of contents
	if (tableOfContents === true) {
		const tocContent = toc(md, { firsth1: false }).content;

		const startToc = `<!--START_SECTION:awesome:${TABLE_OF_CONTENTS_KEY}-->`;
		const endToc = `<!--END_SECTION:awesome:${TABLE_OF_CONTENTS_KEY}-->`;

		const re = new RegExp(`${startToc}[\\s\\S]+${endToc}`);

		if (!re.test(rawMD)) {
			logVerbose(`Key '${TABLE_OF_CONTENTS_KEY}' does not exists`);
		} else {
			md = md.replace(
				re,
				`${startToc}

## Table of Contents

${tocContent}

${endToc}`
			);
		}
	}

	md = formatMarkdown(md);

	mkdirpSync(dirPath);
	fs.writeFileSync(filepath, md);
	return;
}

function mkdirpSync(dir: string) {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
}
