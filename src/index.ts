import { readmeMarkdown } from './input/readme.input';
import { allTable } from './input/table.input';
import { parseMarkdownTableFromCsvInput } from './parser/markdown/table';
import { generateMarkdownFile } from './parser/markdown';
import { resolve } from 'path';

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
