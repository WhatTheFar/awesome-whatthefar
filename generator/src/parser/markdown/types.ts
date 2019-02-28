import { CsvInput } from '../csv';
import { TableOptions } from './table/table';
import { MarkdownPageReferenceDict } from './types';
// tslint:disable:max-classes-per-file

export class MarkdownPageReference<T extends MarkdownPageReferenceDict> {
	constructor(public page: MarkdownPage<T>, public relativeFilePath: string) {}

	public toString() {
		return this.relativeFilePath;
	}
}

export interface MarkdownPageReferenceDict {
	[page: string]: MarkdownPageReference<any>;
}

interface Dict {
	[key: string]: any;
}

export interface MarkdownPageContext<
	T extends MarkdownPageReferenceDict = MarkdownPageReferenceDict
> {
	backToTop: boolean;
	backToTopReference: string;
	pageReferences: T;
	state: Dict;
	dispatch: (newState: Dict) => void;
}

export class MarkdownPage<
	T extends MarkdownPageReferenceDict = MarkdownPageReferenceDict
> {
	public static create<T extends MarkdownPageReferenceDict>(args: {
		title: string;
		description?: string;
		items?: Array<MarkdownItem<MarkdownPageContext<T>>>;
		options?: MarkdownPageOptions;
		reference?: T;
	}): MarkdownPage<T> {
		const { title, description, items, options, reference } = args;
		return new MarkdownPage(
			title,
			description || '',
			reference || ({} as T),
			items,
			options
		);
	}

	constructor(
		public title: string,
		public description: string,
		public reference: T,
		public items?: Array<MarkdownItem<MarkdownPageContext<T>>>,
		public options?: MarkdownPageOptions
	) {}
}

// export interface MarkdownPage<
// 	T extends MarkdownPageReferenceDict = MarkdownPageReferenceDict
// > {
// 	type: 'MarkdownPage';
// 	title: string;
// 	description?: string;
// 	items?: Array<MarkdownItem<MarkdownContext<T>>>;
// 	options?: MarkdownPageOptions;
// 	reference?: T;
// }

export interface MarkdownPageOptions {
	tableOfContent?: boolean;
	backToTop?: boolean;
	initialState?: Dict;
}

export const defaultMarkdownPageOptions: Required<MarkdownPageOptions> = {
	tableOfContent: true,
	backToTop: true,
	initialState: {}
};

export type MarkdownText<T extends MarkdownPageContext> =
	| string
	| ((context: T) => string);

export type MarkdownItem<T extends MarkdownPageContext = MarkdownPageContext> =
	| MarkdownSection<T>
	| MarkdownTable
	| MarkdownHeader
	| MarkdownPlainText<T>
	| MarkdownList
	| MarkdownBackToTop
	| MarkdownItemGroup<T>;

export interface MarkdownItemGroup<T extends MarkdownPageContext> {
	type: 'MarkdownItemGroup';
	items: Array<MarkdownItem<T>>;
}

export interface MarkdownBackToTop {
	type: 'MarkdownBackToTop';
}

export const BackToTopItem: MarkdownBackToTop = { type: 'MarkdownBackToTop' };

export interface MarkdownSection<T extends MarkdownPageContext> {
	type: 'MarkdownSection';
	title: string;
	description?: string;
	items?: Array<MarkdownItem<T>>;
}

export interface MarkdownTable {
	type: 'MarkdownTable';
	title: string;
	description?: string;
	tableData: {
		input: CsvInput;
		options?: TableOptions;
	};
}

export interface MarkdownHeader {
	type: 'MarkdownHeader';
	title: string;
	size: number;
}

export interface MarkdownPlainText<T extends MarkdownPageContext = MarkdownPageContext> {
	type: 'MarkdownPlainText';
	text: MarkdownText<T>;
}

export interface MarkdownList {
	type: 'MarkdownList';
	list?: MarkdownListItem[];
}

export type MarkdownListItem = string | MarkdownList;
