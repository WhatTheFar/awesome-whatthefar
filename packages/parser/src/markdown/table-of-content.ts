import * as _ from 'lodash';
import { MD_LIST, NEW_LINE, TAB } from './constant';
import { MarkdownItem, MarkdownTableOfContents } from './types';
import { pad, parseHeaderReference } from './utils';

function isTableOfContent(item: MarkdownItem): item is MarkdownTableOfContents {
	switch (item.type) {
		case 'MarkdownSection':
		case 'MarkdownHeader':
		case 'MarkdownTable':
		case 'MarkdownItemGroup':
			return true;
			break;
		case 'MarkdownPlainText':
		case 'MarkdownList':
		case 'MarkdownBackToTop':
		case 'MarkdownImage':
			return false;
			break;
		default:
			const _exhaustiveCheck: never = item;
			return _exhaustiveCheck;
	}
}

export function parseTableOfContent(
	item: MarkdownTableOfContents | MarkdownItem[],
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
					const result = parseTableOfContent(item.items, ++offset);
					if (result) {
						output += NEW_LINE + result;
					}
				}
				break;
			case 'MarkdownHeader':
			case 'MarkdownTable':
				if (item.title !== undefined) {
					output +=
						pad(offset, TAB) +
						MD_LIST +
						TAB +
						parseHeaderReference(item.title, item.title);
				}
				break;
			case 'MarkdownItemGroup':
				output += parseTableOfContent(item.items, offset);
				break;
			default:
				const _exhaustiveCheck: never = item;
				return _exhaustiveCheck;
		}
	}
	return output;
}
