import { readmePage } from './input/readme';
import { generateMarkdownFile } from '@awesome/parser';
import { existsSync, mkdirSync } from 'fs';
import * as _ from 'lodash';
import { resolve } from 'path';

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

	await generateMarkdownFile(readmePage, getGeneratedPath('README.md'));

	console.timeEnd(label);
})();
