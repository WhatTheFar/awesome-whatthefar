# @awesome/parser

A package for parsing config to markdown.

### Example

```ts
import { generateMarkdownFile, MarkdownPage } from '@awesome/parser';

(async () => {
	const readmePage = MarkdownPage.create({
		title: '@awesome/parser',
		dirPath: __dirname,
		fileName: 'README.md'
	});
	await generateMarkdownFile(readmePage);
})();
```
