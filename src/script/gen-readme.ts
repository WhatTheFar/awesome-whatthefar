import { referencePage } from '@src/input/reference';
import * as _ from 'lodash';
import { resolve } from 'path';
import { readmeMarkdown } from '../input/readme';
import { generateMarkdownFile } from '../parser/markdown';

const rootDir = resolve(__dirname, '..', '..');

const getFilePath = _.partial(resolve, rootDir, _);

generateMarkdownFile(readmeMarkdown, getFilePath('README.md'));
generateMarkdownFile(referencePage, getFilePath('reference.md'));
