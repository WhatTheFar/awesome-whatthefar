import { ParseResult } from 'papaparse';
import { CsvInput, parseCsvFromInput } from '../csv';
import { Align, MarkdownAlign } from './align';
import { COLON, DASH, NEW_LINE, PIPE, SPACE } from './constant';
import { formatMarkdown } from './utils';

export interface TableOptions {
	align?: Align | Align[];
}

const defaultTableOptions: Required<TableOptions> = {
	align: 'left'
};

declare const _ParseResult: ParseResult;
export type ParseErrors = typeof _ParseResult.errors;

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
): Promise<[string, ParseErrors?]> {
	const result = await parseCsvFromInput(input);
	if (!!result.errors.length) {
		return ['', result.errors];
	}

	return [await parseMarkdownTableFromData(result.data, options)];
}
