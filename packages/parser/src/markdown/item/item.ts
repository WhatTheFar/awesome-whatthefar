import * as _ from 'lodash';
import { parseMarkdownTable } from '../table/table';
import { NEW_LINE } from './../constant';
import { MarkdownItem, MarkdownPageContext } from './../types';
import { parseMarkdownHeader } from './header';
import { parseMarkdownImage } from './image';
import { parseMarkdownList } from './list';
import { parseMarkdownPlainText } from './plain-text';
import { parseMarkdownSection } from './section';

export async function parseMardownItem(
	item: MarkdownItem | MarkdownItem[],
	context: MarkdownPageContext
): Promise<string> {
	const { backToTop, backToTopReference } = context;

	let result: string;
	if (item instanceof Array) {
		const parseItems = _.partial(parseMardownItem, _, context);
		const markdownItems = await Promise.all(item.map(parseItems));
		return markdownItems.join(NEW_LINE) + NEW_LINE;
	}
	switch (item.type) {
		case 'MarkdownSection':
			result = await parseMarkdownSection(item, context);
			break;
		case 'MarkdownHeader':
			result = parseMarkdownHeader(item);
			break;
		case 'MarkdownTable':
			result = await parseMarkdownTable(item, context);
			break;
		case 'MarkdownPlainText':
			result = parseMarkdownPlainText(item, context);
			break;
		case 'MarkdownList':
			result = parseMarkdownList(item);
			break;
		case 'MarkdownBackToTop':
			result = backToTopReference;
			break;
		case 'MarkdownItemGroup':
			const parseItems = _.partial(parseMardownItem, _, context);
			const markdownItems = await Promise.all(item.items.map(parseItems));
			result = markdownItems.join(NEW_LINE) + NEW_LINE;
			break;
		case 'MarkdownImage':
			result = parseMarkdownImage(item, context);
			break;
		default:
			const _exhaustiveCheck: never = item;
			return _exhaustiveCheck;
	}

	if (backToTop) {
		switch (item.type) {
			case 'MarkdownTable':
				result += NEW_LINE;
				result += backToTopReference;
		}
	}

	return result;
}
