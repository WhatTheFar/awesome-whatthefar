import * as fs from 'fs';
import _ = require('lodash');
import { resolve } from 'path';
import { NEW_LINE } from '../markdown/constant';
import { parseMardownItem } from '../markdown/item';
import { createMarkdownContext } from '../markdown/page';
import { MarkdownItem, MarkdownPage } from '../markdown/types';
import { OmitStrict } from '../types';

interface MarkdownFile
	extends OmitStrict<MarkdownPage, 'title' | 'description' | 'items'> {
	sourceFilePath: string;
}

interface RenderMap {
	[name: string]: MarkdownItem[];
}

export async function renderMarkdown(file: MarkdownFile, map: RenderMap) {
	const { sourceFilePath, dirPath, fileName } = file;
	const filepath = resolve(dirPath, fileName);

	const context = createMarkdownContext(file);

	const rawMD = fs.readFileSync(sourceFilePath).toString();
	let md = rawMD;

	for (const name in map) {
		if (map.hasOwnProperty(name)) {
			const items = map[name];

			const startComment = `<!--START_SECTION:awesome:${name}-->`;
			const endComment = `<!--END_SECTION:awesome:${name}-->`;
			const re = new RegExp(`${startComment}[\s\S]+${endComment}`);
			if (!re.test(rawMD)) {
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

	mkdirpSync(dirPath);
	fs.writeFileSync(filepath, md);
	return;
}

function mkdirpSync(dir: string) {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
}