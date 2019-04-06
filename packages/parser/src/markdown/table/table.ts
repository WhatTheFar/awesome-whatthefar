import { ParseError } from 'papaparse';
import { CsvInput, parseCsvFromInput } from '../../csv';
import { COLON, DASH, MD_TABLE_HEADER_SIZE, NEW_LINE, PIPE, SPACE } from '../constant';
import { parseMarkdownHeader } from '../item/header';
import { MarkdownTable } from '../types';
import { formatMarkdown } from '../utils';
import { MarkdownPageContext } from './../types';
import { Align, MarkdownAlign } from './align';
import { Filter, TableDataFilter } from './filter';
import { Mapper, TableDataMapper } from './mapper';

export async function parseMarkdownTable(
	table: MarkdownTable,
	ctx: MarkdownPageContext
): Promise<string> {
	const [tableString, err] = await parseMarkdownTableFromCsvInput(
		table.tableData.input,
		ctx,
		table.tableData.options
	);
	if (err) {
		console.error(table.title);
		console.error(err);
		process.exit();
	}
	const { title, description } = table;
	const header = parseMarkdownHeader({
		type: 'MarkdownHeader',
		title,
		size: MD_TABLE_HEADER_SIZE
	});
	return (
		header +
		NEW_LINE +
		(description ? description + NEW_LINE + NEW_LINE : '') +
		tableString +
		NEW_LINE
	);
}

export interface TableOptions {
	align?: Align | Align[];
	mapper?: TableDataMapper | TableDataMapper[];
	filter?: TableDataFilter;
}

const defaultTableOptions: Required<TableOptions> = {
	align: 'left',
	mapper: 'skip',
	filter: 'skip'
};

const DEFAULT_DELIMITER = SPACE + PIPE + SPACE;
const DEFAULT_START = PIPE + SPACE;
const DEFAULT_END = PIPE + SPACE;

function getMarkdownTableAlignment(align: MarkdownAlign): string {
	switch (align) {
		case 'left':
			return COLON + DASH + DASH;
		case 'center':
			return COLON + DASH + COLON;
		case 'right':
			return DASH + DASH + COLON;
		default:
			const _exhaustiveCheck: never = align;
			return _exhaustiveCheck;
	}
}

function getMardownTableAlignmentRow(
	aligns: Align[],
	delimeter: string = DEFAULT_DELIMITER,
	start: string = DEFAULT_START,
	end: string = DEFAULT_END
) {
	return (
		start +
		aligns
			.filter(Align.isMarkdownAlign)
			.map(getMarkdownTableAlignment)
			.join(delimeter) +
		end
	);
}

interface TableDataInfo {
	columnSize: number;
}

function validateTableData(data: string[][]): TableDataInfo {
	let columnSize: number | null = null;

	data.forEach((v, i) => {
		if (!columnSize || v.length < columnSize) {
			columnSize = v.length;
		}
	});

	return {
		columnSize: columnSize || 0
	};
}

export async function parseMarkdownTableFromData(
	data: string[][],
	ctx: MarkdownPageContext,
	options: TableOptions = defaultTableOptions
) {
	const { align, mapper, filter }: Required<TableOptions> = {
		...defaultTableOptions,
		...options
	};

	const delimiter = DEFAULT_DELIMITER;
	const start = DEFAULT_START;
	const end = DEFAULT_END;

	// Each column size
	const { columnSize } = validateTableData(data);

	const [aligns, alignErr] = Align.validateAlign(align, columnSize);
	if (alignErr) {
		throw new Error(alignErr);
	}

	const [mappers, mapperErr] = Mapper.validateMapper(mapper, columnSize);
	if (mapperErr) {
		throw new Error(mapperErr);
	}

	const output = data.reduce((prev, row, rowIndex) => {
		let line = '';

		if (rowIndex === 1) {
			line += getMardownTableAlignmentRow(aligns, delimiter, start, end) + NEW_LINE;
		}

		let formattedRow: string[];
		if (rowIndex === 0) {
			formattedRow = row;
		} else {
			if (Filter.isFilterFunction(filter)) {
				const isSkipped = !filter(row, rowIndex, ctx);
				if (isSkipped) {
					// return prev + line, to skip this row
					return prev + line;
				}
			}

			formattedRow = row.map((value, i) => {
				const tempMapper = mappers[i];
				if (tempMapper === 'skip') {
					return value;
				} else if (Mapper.isMapperFunction(tempMapper)) {
					return tempMapper(value, i, row, ctx);
				} else {
					const _exhaustiveCheck: never = tempMapper;
					return _exhaustiveCheck;
				}
			});

			// Create tenp for column reference mapping
			const referenceMappingTemp: string[] = [];
			aligns.forEach((value, index) => {
				if (Align.isColumnReference(value)) {
					referenceMappingTemp[value.colunm] = formattedRow[index];
				}
			});

			formattedRow = formattedRow.map((value, i) => {
				const refValue = referenceMappingTemp[i];
				if (refValue) {
					return `[${value}](${refValue})`;
				}
				return value;
			});
		}

		line +=
			start +
			formattedRow
				.filter((v, i) => Align.isMarkdownAlign(aligns[i]))
				.join(delimiter) +
			end +
			NEW_LINE;

		return prev + line;
	}, '');

	const formatted = formatMarkdown(output);

	return formatted;
}

export async function parseMarkdownTableFromCsvInput(
	input: CsvInput,
	ctx: MarkdownPageContext,
	options?: TableOptions
): Promise<[string, ParseError[]?]> {
	const [data, errors] = await parseCsvFromInput(input);
	if (errors && !!errors.length) {
		return ['', errors];
	}

	return [await parseMarkdownTableFromData(data, ctx, options)];
}
