import { pad } from '../utils';
import { MD_HEADER, SPACE } from './../constant';
import { MarkdownHeader } from './../types';

export function parseMarkdownHeader({ title, size }: MarkdownHeader): string {
	return pad(size, MD_HEADER) + SPACE + title;
}
