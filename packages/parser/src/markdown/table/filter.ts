import { MarkdownPageContext } from '../types';

export type TableDataFilter = TableDataFilterFunction | 'skip';

export type TableDataFilterFunction = (
	row: string[],
	rowIndex: number,
	ctx: MarkdownPageContext
) => boolean;

// tslint:disable-next-line:no-namespace
export namespace Filter {
	export function isFilterFunction(
		arg: TableDataFilter
	): arg is TableDataFilterFunction {
		return typeof arg === 'function';
	}
}
