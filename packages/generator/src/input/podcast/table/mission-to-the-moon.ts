import { MarkdownTable } from '@awesome-whatthefar/parser';
import { createFileRefDataMapperFunc } from '../../../util';
import { getGeneratedPodcastNotePath, getPodcastNotePath } from './../../../directory';
import { createPodcastNoteTableDataFormMarkdownFrontMatter } from './util';

const podcastName = 'mission-to-the-moon';
const podcastDirPath = getPodcastNotePath(podcastName);
const generatedPodcastDirPath = getGeneratedPodcastNotePath(podcastName);

export const missionToTheMoonPodcastTable: MarkdownTable = {
	type: 'MarkdownTable',
	title: 'Mission to the moon',
	description: 'Batteries included',
	tableData: {
		options: {
			mapper: [
				'skip',
				'skip',
				createFileRefDataMapperFunc('Note', generatedPodcastDirPath),
				'skip',
			],
			align: ['left', 'left', 'center', { type: 'Reference', colunm: 0 }],
		},
		input: {
			type: 'MemoryInput',
			data: createPodcastNoteTableDataFormMarkdownFrontMatter({
				markdownDir: podcastDirPath,
				generatedDir: generatedPodcastDirPath,
				tableHeaders: ['Title', 'Description', 'Note', 'Reference'],
			}),
			// data: [
			// 	['Title', 'Description', 'Note', 'Reference'],
			// 	[
			// 		'EP 325 - วิธีการจัดการไอเดียที่เยอะเกินไป',
			// 		'',
			// 		'',
			// 		'https://soundcloud.com/missiontothemoon/ep-325'
			// 	],
			// 	[
			// 		'EP 270 : Set Up To Fail Syndrome คืออะไร /คุณเป็นรึเปล่า/จะแก้ไขยังไง',
			// 		'',
			// 		'mm-270',
			// 		'https://soundcloud.com/missiontothemoon/ep-270-set-up-to-fail-syndrome'
			// 	],
			// 	[
			// 		'EP 245 - การกระจายงานที่ดีทำยังไง',
			// 		'',
			// 		'mm-245',
			// 		'https://soundcloud.com/missiontothemoon/ep-245'
			// 	],
			// 	[
			// 		'EP.1 - 7 เทคนิคที่ช่วยให้ธุรกิจไม่ล่มสลาย',
			// 		'',
			// 		'mm-1',
			// 		'https://soundcloud.com/missiontothemoon/ep1'
			// 	]
			// ]
		},
	},
};
