import './init-dir';

import { generateMarkdownFile } from '@awesome/parser';
import * as _ from 'lodash';
import { createReadmePage } from './input/readme';

(async () => {
	const label = '✨  Done';
	console.time(label);

	await generateMarkdownFile(await createReadmePage());

	console.timeEnd(label);
})();
