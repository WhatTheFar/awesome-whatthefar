import { existsSync, mkdirSync } from 'fs';
import * as _ from 'lodash';
import { resolve } from 'path';
import { readmeMarkdown } from './input/readme';
import { referencePage } from './input/reference';
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

	const getGeneratedPath = _.partial(resolve, generatedDir, _);

	await generateMarkdownFile(readmeMarkdown, getGeneratedPath('README.md'));
	await generateMarkdownFile(referencePage, getGeneratedPath('reference.md'));

	console.timeEnd(label);
})();
