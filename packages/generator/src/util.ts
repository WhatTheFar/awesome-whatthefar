import { TableDataMapperFunction } from '@awesome/parser/lib/markdown/table/mapper';
import { existsSync } from 'fs';
import { relative, resolve } from 'path';

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
