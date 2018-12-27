import { makeRepetitiveArray } from './utils';

export interface ColumnReference {
	type: 'Reference';
	colunm: number;
}

export type Align = ValidAlign | ColumnReference;
export type ValidAlign = MarkdownAlign | 'skip';

export type MarkdownAlign = 'left' | 'center' | 'right';

export type AlignError = 'invalid align';

export namespace Align {
	export function isColumnReference(arg: Align): arg is ColumnReference {
		return typeof arg === 'object' && arg.type === 'Reference';
	}
	export function isValidAlign(arg: Align): arg is ValidAlign {
		switch (arg) {
			case 'left':
			case 'center':
			case 'right':
			case 'skip':
				return true;
		}

		switch (arg.type) {
			case 'Reference':
				return false;
			default:
				return false;
			// const _exhaustiveCheck: never = align;
			// return _exhaustiveCheck;
		}
	}

	export function isMarkdownAlign(arg: Align): arg is MarkdownAlign {
		switch (arg) {
			case 'left':
			case 'center':
			case 'right':
				return true;
			case 'skip':
				return false;
		}

		switch (arg.type) {
			case 'Reference':
				return false;
			default:
				return false;
			// const _exhaustiveCheck: never = align;
			// return _exhaustiveCheck;
		}
	}

	export function mapAlignToValid(align: Align): ValidAlign {
		switch (align) {
			case 'left':
			case 'center':
			case 'right':
			case 'skip':
				return align;
		}

		switch (align.type) {
			case 'Reference':
				return 'skip';
			default:
				return 'skip';
			// const _exhaustiveCheck: never = align;
			// return _exhaustiveCheck;
		}
	}

	export function validateAlign(
		align: Align | Align[],
		columnLength: number
	): [Align[], AlignError?] {
		let validatedAlign: Align[];

		if (typeof align === 'string') {
			if (Align.isValidAlign(align)) {
				validatedAlign = makeRepetitiveArray(columnLength, align);
			} else {
				return [[], 'invalid align'];
			}
		} else if (align instanceof Array) {
			if (align.length === columnLength) {
				const referenceCount = new Array(columnLength).fill(0);

				let maxReferenceColumn = 0;

				for (const index in align) {
					const value = align[index];

					if (isColumnReference(value)) {
						if (++referenceCount[value.colunm] > 1) {
							return [[], 'invalid align'];
						}
						if (value.colunm > maxReferenceColumn) {
							maxReferenceColumn = value.colunm;
						}
					}
				}

				if (maxReferenceColumn >= columnLength) {
					return [[], 'invalid align'];
				}

				validatedAlign = align;
			} else {
				return [[], 'invalid align'];
			}
		} else if (typeof align === 'object') {
			return [[], 'invalid align'];
		} else {
			const _exhaustiveCheck: never = align;
			return _exhaustiveCheck;
		}

		return [validatedAlign];
	}
}
