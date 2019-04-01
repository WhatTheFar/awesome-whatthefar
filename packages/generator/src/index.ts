import './init-dir';

import { generateMarkdownFile } from '@awesome/parser';
import * as _ from 'lodash';
import { readmePage } from './input/readme';

(async () => {
	const label = '✨  Done';
	console.time(label);

	await generateMarkdownFile(readmePage);

	console.timeEnd(label);
})();
