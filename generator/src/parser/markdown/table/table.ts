import { CsvInput, parseCsvFromInput } from '@parser/csv';
import { ParseError } from 'papaparse';
import { COLON, DASH, NEW_LINE, PIPE, SPACE } from '../constant';
import { MD_TABLE_HEADER_SIZE } from '../constant';
import { parseMarkdownHeader } from '../item/header';
import { MarkdownTable } from '../types';
import { formatMarkdown } from '../utils';
import { Align, MarkdownAlign } from './align';

export async function parseMarkdownTable(table: MarkdownTable): Promise<string> {
	const [tableString, err] = await parseMarkdownTableFromCsvInput(
		table.tableData.input,
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
		(description ? description + NEW_LINE : '') +
		tableString +
		NEW_LINE
	);
}

export interface TableOptions {
	align?: Align | Align[];
}

const defaultTableOptions: Required<TableOptions> = {
	align: 'left'
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
	options: TableOptions = defaultTableOptions
) {
	const { align }: Required<TableOptions> = {
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

	const output = data.reduce((prev, row, rowIndex) => {
		let line = '';

		if (rowIndex === 1) {
			line += getMardownTableAlignmentRow(aligns, delimiter, start, end) + NEW_LINE;
		}

		const referenceMappingTemp: string[] = [];
		aligns.forEach((value, index) => {
			if (Align.isColumnReference(value)) {
				referenceMappingTemp[value.colunm] = row[index];
			}
		});

		let formattedRow: string[];
		if (rowIndex === 0) {
			formattedRow = row;
		} else {
			formattedRow = row.map((value, i) => {
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
	options?: TableOptions
): Promise<[string, ParseError[]?]> {
	const [data, errors] = await parseCsvFromInput(input);
	if (errors && !!errors.length) {
		return ['', errors];
	}

	return [await parseMarkdownTableFromData(data, options)];
}