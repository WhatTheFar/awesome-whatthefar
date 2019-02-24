import { readmePage } from '@src/input/readme';
import * as _ from 'lodash';
import { resolve } from 'path';
import { generateMarkdownFile } from '../parser/markdown';

const rootDir = resolve(__dirname, '..', '..');

const getFilePath = _.partial(resolve, rootDir, _);

generateMarkdownFile(readmePage, getFilePath('README.md'));
