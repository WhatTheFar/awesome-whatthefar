import './init-dir';

import { generateMarkdownFile } from '@awesome-whatthefar/parser';
import _ from 'lodash';
import { createReadmePage } from './input/readme';

async function main(): Promise<void> {
	const label = '✨  Done';
	console.time(label);

	await generateMarkdownFile(await createReadmePage());

	console.timeEnd(label);
}

if (require.main === module) {
	main();
}
