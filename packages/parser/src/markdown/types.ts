import { CsvInput } from '../csv';
import { OmitStrict } from '../types';
import { TableOptions } from './table/table';
import { MarkdownPageReferenceDict } from './types';
// tslint:disable:max-classes-per-file

export class MarkdownPageReference<T extends MarkdownPageReferenceDict> {
	public relativePath?: string;
	constructor(public page: MarkdownPage<T>) {}

	public toString(): string {
		if (!this.relativePath) {
			const log = `${this.page.title} is refered outside page context.`;
			console.log(log);
			throw new Error(log);
		}
		return this.relativePath;
	}
}

export interface MarkdownPageReferenceDict {
	[page: string]: MarkdownPageReference<any>;
}

interface Dict {
	[key: string]: any;
}

export interface MarkdownContextHelper {
	createMarkdownImage: (
		altText: string,
		absoluteImagePath: string,
		title?: string
	) => string;

	getRelativePathToPage: (anotherPath: string) => string;
}

export interface MarkdownPageContext<
	T extends MarkdownPageReferenceDict = MarkdownPageReferenceDict
> {
	metaData: {
		dirPath: string;
		fileName: string;
	};
	helper: MarkdownContextHelper;
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
		dirPath: string;
		fileName: string;
		items?: Array<MarkdownItem<MarkdownPageContext<T>>>;
		options?: MarkdownPageOptions;
		reference?: T;
	}): MarkdownPage<T> {
		const { title, description, dirPath, fileName, items, options, reference } = args;
		return new MarkdownPage(
			title,
			description || '',
			dirPath,
			fileName,
			reference || ({} as T),
			items,
			options
		);
	}

	constructor(
		public title: string,
		public description: string,
		public dirPath: string,
		public fileName: string,
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
	| MarkdownItemGroup<T>
	| MarkdownPlainText<T>
	| MarkdownList
	| MarkdownBackToTop
	| MarkdownImage;

export type MarkdownTableOfContents<
	T extends MarkdownPageContext = MarkdownPageContext
> = Extract<
	MarkdownItem<T>,
	MarkdownSection<T> | MarkdownTable | MarkdownHeader | MarkdownItemGroup<T>
>;

export interface MarkdownImage {
	type: 'MarkdownImage';
	altText: string;
	path: string;
	title?: string;
}

export interface MarkdownItemGroup<T extends MarkdownPageContext> {
	type: 'MarkdownItemGroup';
	items: Array<MarkdownItem<T>>;
}

export interface MarkdownBackToTop {
	type: 'MarkdownBackToTop';
}

export const BACK_TO_TOP: MarkdownBackToTop = { type: 'MarkdownBackToTop' };

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
