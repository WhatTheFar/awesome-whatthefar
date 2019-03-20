import { generateMarkdownFile } from '@awesome/parser';
import { existsSync, mkdirSync } from 'fs';
import * as _ from 'lodash';
import { resolve } from 'path';
import { readmePage } from './input/readme';

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

	await generateMarkdownFile(readmePage);

	console.timeEnd(label);
})();