import './init-dir';

import { generateMarkdownFile } from '@awesome-whatthefar/parser';
import * as _ from 'lodash';
import { createReadmePage } from './input/readme';

(async () => {
	const label = '✨  Done';
	console.time(label);

	await generateMarkdownFile(await createReadmePage());

	console.timeEnd(label);
})();
