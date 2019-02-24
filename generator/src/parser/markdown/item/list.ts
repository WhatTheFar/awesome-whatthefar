import * as _ from 'lodash';
import { pad } from '../utils';
import { MD_LIST, NEW_LINE, TAB } from './../constant';
import { MarkdownList, MarkdownListItem } from './../types';

export function parseMarkdownList(item: MarkdownList, offset: number = 0): string {
	const { list } = item;
	let output: string = '';

	if (list) {
		if (offset > 5) {
			throw new Error('List can not be nested more than 5');
		}
		output += list.map(_.partial(parseMarkdownListItem, _, offset)).join(NEW_LINE);
	}
	return output;
}

function parseMarkdownListItem(item: MarkdownListItem, offset: number): string {
	let output: string = '';

	if (typeof item === 'string') {
		output += pad(offset, TAB) + MD_LIST + TAB + item;
	} else {
		output += parseMarkdownList(item, ++offset);
	}

	return output;
}
