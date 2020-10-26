import * as prettier from 'prettier';
import { MD_HEADER } from './constant';

/* Get a string consisting of `length` `character`s. */
export function pad(length: number, character: string = ' ') {
	return new Array(length + 1).join(character);
}

export function makeRepetitiveArray<T>(length: number, item: T): T[] {
	return new Array<T>(length).fill(item);
}

export function formatMarkdown(input: string): string {
	return prettier.format(input, { parser: 'markdown', tabWidth: 4, useTabs: true });
}

export function convertToKebabCase(input: string): string {
	return input
		.replace(/([a-z])([A-Z])/g, '$1-$2') // get all lowercase letters that are near to uppercase ones
		.replace(/[\s_]+/g, '-') // replace all spaces and low dash
		.toLowerCase(); // convert to lower case
}

export function parseHeaderReference(text: string, headerToBeRefered: string): string {
	const ref =
		MD_HEADER +
		headerToBeRefered
			.replace(/[\s_]+/g, '-')
			.replace(/[//]+/g, '')
			.toLowerCase();
	return `[${text}](${ref})`;
}
