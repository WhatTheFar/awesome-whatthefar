import * as fs from 'fs';
import _ = require('lodash');
import { resolve } from 'path';
import { NEW_LINE } from '../markdown/constant';
import { parseMardownItem } from '../markdown/item';
import { createMarkdownContext } from '../markdown/page';
import { MarkdownItem, MarkdownPage } from '../markdown/types';
import { formatMarkdown } from '../markdown/utils';
import { OmitStrict } from '../types';

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
}

const defaultOptions: RenderOptions = {
	verbose: false
};

export async function renderMarkdown(
	file: MarkdownFile,
	map: RenderMap,
	opts?: Partial<RenderOptions>
) {
	const { verbose }: RenderOptions = {
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
