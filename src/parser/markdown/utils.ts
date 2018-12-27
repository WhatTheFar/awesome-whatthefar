import * as prettier from 'prettier';

/* Get a string consisting of `length` `character`s. */
export function pad(length: number, character: string = ' ') {
	return new Array(length + 1).join(character);
}

export function makeRepetitiveArray<T>(length: number, item: T): T[] {
	return new Array<T>(length + 1).fill(item);
}

export function formatMarkdown(input: string): string {
	return prettier.format(input, { parser: 'markdown' });
}
