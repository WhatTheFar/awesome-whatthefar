import { TableDataMapperFunction } from '@awesome-whatthefar/parser/lib/markdown/table/mapper';
import frontmatter from 'front-matter';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import * as glob from 'glob';
import { relative, resolve } from 'path';
import { mkdirpSync } from './directory';

export interface MarkdownContent<T extends {}> {
	readonly basename: string;
	readonly attributes: T;
	readonly body: string;
	readonly frontmatter?: string;
}

export function getMarkdownWithFrontMatter<T extends {}>(options: {
	globPath: string;
}): Array<MarkdownContent<T>> {
	const { globPath } = options;

	const filePaths = glob.sync(globPath);
	const contents: Array<MarkdownContent<T>> = filePaths.map((filePath) => {
		const file = readFileSync(filePath, 'utf8');
		const content = frontmatter<T>(file);
		return { basename: filePath.split(/.*[\/|\\]/)[1], ...content };
	});

	return contents;
}

export function generateMarkdownWithoutFronMatter<T extends {}>(options: {
	globPath: string;
	generatedDir: string;
}): Array<MarkdownContent<T>> {
	const { globPath, generatedDir } = options;

	const contents = getMarkdownWithFrontMatter<T>({ globPath });

	mkdirpSync(generatedDir);
	contents.forEach((v) => {
		const { basename, body } = v;
		writeFileSync(generatedDir + '/' + basename, body);
	});

	return contents;
}

export function createFileRefDataMapperFunc(
	text: string,
	absoluteTargetDir: string,
	ext?: string
): TableDataMapperFunction {
	const extString = ext ? ext : '';

	return (relativeFilePath: string, _index: number, _row: string[], ctx) => {
		// relativeFilePath is a target file's path
		// It is relative from the absolute target directiry (absoluteTargetDir)
		if (relativeFilePath) {
			const absoluteFilePath = resolve(
				absoluteTargetDir,
				relativeFilePath + extString
			);
			const relativeFilePathFromCurrentDir = relative(
				ctx.metaData.dirPath,
				absoluteFilePath
			);
			if (!existsSync(absoluteFilePath)) {
				console.log(`${absoluteFilePath} is not exist`);
			}
			return `[${text}](${relativeFilePathFromCurrentDir})`;
		} else {
			return '';
		}
	};
}
