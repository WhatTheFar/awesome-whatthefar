import { makeRepetitiveArray } from '../utils';
import { MarkdownPageContext } from './../types';
import { TableDataMapper, TableDataMapperFunction } from './mapper';
export type TableDataMapper = TableDataMapperFunction | 'skip';

export type TableDataMapperFunction = (
	value: string,
	index: number,
	row: string[],
	ctx: MarkdownPageContext
) => string;

export type MapperError = 'Invalid Mapper';

// tslint:disable-next-line:no-namespace
export namespace Mapper {
	export function isMapperFunction(
		arg: TableDataMapper
	): arg is TableDataMapperFunction {
		return typeof arg === 'function';
	}

	export function validateMapper(
		mapper: TableDataMapper | TableDataMapper[],
		columnLength: number
	): [TableDataMapper[], MapperError?] {
		let validatedMapper: TableDataMapper[];

		if (mapper instanceof Array) {
			if (mapper.length !== columnLength) {
				return [[], 'Invalid Mapper'];
			}
			return [mapper];
		} else if (typeof mapper === 'string' || isMapperFunction(mapper)) {
			validatedMapper = makeRepetitiveArray(columnLength, mapper);
			return [validatedMapper];
		} else {
			const _exhaustiveCheck: never = mapper;
			return _exhaustiveCheck;
		}
	}
}
