import * as _ from 'lodash';
import { parseMardownItem } from '.';
import { MD_SECTION_HEADER_SIZE, NEW_LINE } from './../constant';
import { MarkdownPageContext, MarkdownSection } from './../types';
import { parseMarkdownHeader } from './header';

export async function parseMarkdownSection(
	{ title, description, items }: MarkdownSection<any>,
	context: MarkdownPageContext
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
		const parseItems = _.partial(parseMardownItem, _, context);
		const markdownItems = await Promise.all(items.map(parseItems));
		output += markdownItems.join(NEW_LINE) + NEW_LINE;
	}
	return output;
}
