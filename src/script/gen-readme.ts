import { resolve } from 'path';
import { readmeMarkdown } from '../input/readme';
import { generateMarkdownFile } from '../parser/markdown';

generateMarkdownFile(readmeMarkdown, resolve(__dirname, '..', '..', 'README.md'));
