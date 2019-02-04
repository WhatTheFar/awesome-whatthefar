import { existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { readmeMarkdown } from './input/readme';
import { generateMarkdownFile } from './parser/markdown';

function mkdirpSync(dir: string) {
	if (!existsSync(dir)) {
		mkdirSync(dir);
	}
}

const generatedDir = resolve(__dirname, 'generated');

(async () => {
	const label = '✨  Done';
	console.time(label);

	mkdirpSync(generatedDir);
	const path = resolve(generatedDir, 'README.md');
	await generateMarkdownFile(readmeMarkdown, path);

	console.timeEnd(label);
})();
