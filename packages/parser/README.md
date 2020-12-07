# @awesome-whatthefar/parser

A package for parsing config to markdown.

### Example

```ts
import { generateMarkdownFile, MarkdownPage } from '@awesome-whatthefar/parser';

(async () => {
	const readmePage = MarkdownPage.create({
		title: '@awesome-whatthefar/parser',
		dirPath: __dirname,
		fileName: 'README.md'
	});
	await generateMarkdownFile(readmePage);
})();
```
