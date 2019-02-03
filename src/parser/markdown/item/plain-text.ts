import { NEW_LINE } from './../constant';
import { MarkdownPlainText } from './../types';

export function parseMarkdownPlainText(item: MarkdownPlainText): string {
	return item.text + NEW_LINE;
}
