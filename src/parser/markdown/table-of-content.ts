import * as _ from 'lodash';
import { MD_LIST, NEW_LINE, TAB } from './constant';
import { MarkdownItem } from './types';
import { pad, parseHeaderReference } from './utils';

function isTableOfContent(item: MarkdownItem): boolean {
	switch (item.type) {
		case 'MarkdownSection':
		case 'MarkdownHeader':
		case 'MarkdownTable':
			return true;
			break;
		case 'MarkdownPlainText':
		case 'MarkdownList':
		case 'MarkdownBackToTop':
			return false;
			break;
		default:
			const _exhaustiveCheck: never = item;
			return _exhaustiveCheck;
	}
}

export function parseTableOfContent(
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
			case 'MarkdownBackToTop':
				break;
			default:
				const _exhaustiveCheck: never = item;
				return _exhaustiveCheck;
		}
	}
	return output;
}