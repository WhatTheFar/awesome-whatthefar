import { NEW_LINE } from './../constant';
import { MarkdownPageContext, MarkdownPlainText } from './../types';

export function parseMarkdownPlainText(
	item: MarkdownPlainText,
	context: MarkdownPageContext
): string {
	switch (typeof item.text) {
		case 'string':
			return item.text + NEW_LINE;
		case 'function':
			return item.text(context) + NEW_LINE;
		default:
			const _exhaustiveCheck: never = item.text;
			return _exhaustiveCheck;
	}
}
