import { generateMarkdownFile } from '@awesome-whatthefar/parser';
import _ from 'lodash';
import { initDir } from './directory';
import { createReadmePage } from './readme';

async function main(): Promise<void> {
	initDir();

	const label = '✨  Done';
	console.time(label);

	await generateMarkdownFile(await createReadmePage());

	console.timeEnd(label);
}

if (require.main === module) {
	main();
}
