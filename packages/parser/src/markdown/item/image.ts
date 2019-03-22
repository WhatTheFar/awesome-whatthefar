import { MarkdownImage, MarkdownPageContext } from './../types';

export function parseMarkdownImage(
	{ altText, path, title }: MarkdownImage,
	{ helper }: MarkdownPageContext
): string {
	return helper.createMarkdownImage(altText, path, title);
}
