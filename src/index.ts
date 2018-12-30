import { resolve } from 'path';
import { readmeMarkdown } from './input/readme';
import { allTable } from './input/table';
import { generateMarkdownFile } from './parser/markdown';
import { parseMarkdownTableFromCsvInput } from './parser/markdown/table';

async function testTable() {
	for (const value of allTable) {
		console.log(
			(await parseMarkdownTableFromCsvInput(
				value.data.input,
				value.data.options
			))[0]
		);
	}
}

// testTable();

generateMarkdownFile(readmeMarkdown, resolve(__dirname, 'README.md'));
