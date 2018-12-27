import { TableOptions } from './table';
import { CsvInput } from '../csv';

export interface MarkdownPage {
	type: 'MarkdownPage';
	title: string;
	description?: string;
	items?: MarkdownItem[];
	options?: {
		tableOfContent: boolean;
	};
}

export interface MarkdownSection {
	type: 'MarkdownSection';
	title: string;
	description?: string;
	items?: MarkdownItem[];
}

export type MarkdownItem = MarkdownSection | MarkdownTable | MarkdownHeader;

export interface MarkdownHeader {
	type: 'MarkdownHeader';
	title: string;
	size: number;
}

export interface MarkdownPlainText {
	type: 'MarkdownPlainText';
	text: string;
}

export interface MarkdownList {
	type: 'MarkdownList';
	text: string;
	list?: MarkdownList;
}

export interface MarkdownTable {
	type: 'MarkdownTable';
	title: string;
	description?: string;
	data: {
		input: CsvInput;
		options?: TableOptions;
	};
}
