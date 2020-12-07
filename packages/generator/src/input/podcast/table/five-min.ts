import { MarkdownTable } from '@awesome-whatthefar/parser';
import { createFileRefDataMapperFunc } from '../../../util';
import {
	getGeneratedPodcastNotePath,
	getPodcastNotePath,
	PODCAST_NOTE_DIR
} from './../../../directory';
import { createPodcastNoteTableDataFormMarkdownFrontMatter } from './util';

const podcastName = 'five-min';
const podcastDirPath = getPodcastNotePath(podcastName);
const generatedPodcastDirPath = getGeneratedPodcastNotePath(podcastName);

export const fiveMinPodcastTable: MarkdownTable = {
	type: 'MarkdownTable',
	title: '5 Minutes',
	tableData: {
		options: {
			mapper: [
				'skip',
				'skip',
				createFileRefDataMapperFunc('Note', PODCAST_NOTE_DIR, '.md'),
				'skip'
			],
			align: ['left', 'left', 'center', { type: 'Reference', colunm: 0 }]
		},
		input: {
			type: 'MemoryInput',
			data: createPodcastNoteTableDataFormMarkdownFrontMatter({
				markdownDir: podcastDirPath,
				generatedDir: generatedPodcastDirPath,
				tableHeaders: ['Title', 'Description', 'Note', 'Reference']
			})
			// data: [
			// 	['Title', 'Description', 'Note', 'Reference'],
			// 	[
			// 		'EP 21 Dunning–Kruger Effect',
			// 		'',
			// 		'',
			// 		'https://soundcloud.com/missiontothemoon/5-minutes-ep-21-dunningkruger-effect'
			// 	],
			// 	[
			// 		'EP 16 Theseus Paradox',
			// 		'',
			// 		'',
			// 		'https://soundcloud.com/missiontothemoon/5-minutes-ep-16-theseus-paradox'
			// 	]
			// ]
		}
	}
};
