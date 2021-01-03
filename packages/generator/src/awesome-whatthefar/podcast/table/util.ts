import { TableDataMapperFunction } from '@awesome-whatthefar/parser/lib/markdown/table/mapper';
import { generateMarkdownWithoutFronMatter } from '../../util';

export function createSoundCloundUrlDataMapperFunc(
	prefix: string
): TableDataMapperFunction {
	return (postfix: string, _index: number, _row: string[], ctx) =>
		`https://soundcloud.com/${prefix}/${postfix}`;
}

interface PodcastFrontMatter {
	readonly title: string;
	readonly description: string;
	readonly reference: string;
}

export function createPodcastNoteTableDataFormMarkdownFrontMatter(options: {
	markdownDir: string;
	generatedDir: string;
	tableHeaders: string[];
}) {
	const { markdownDir, generatedDir, tableHeaders } = options;

	const data = generateMarkdownWithoutFronMatter<PodcastFrontMatter>({
		globPath: markdownDir + '/*',
		generatedDir,
	}).map((content) => {
		const { title, description, reference } = content.attributes as any;
		const { basename, body } = content;

		return [title, description, body ? basename : '', reference];
	});

	return [tableHeaders, ...data];
}
