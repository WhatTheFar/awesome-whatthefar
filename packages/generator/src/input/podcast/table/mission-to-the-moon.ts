import { MarkdownTable } from '@awesome/parser';
import { createFileRefDataMapperFunc } from '../../../util';
import { PODCAST_NOTE_DIR } from './../../../directory';

export const missionToTheMoonPodcastTable: MarkdownTable = {
	type: 'MarkdownTable',
	title: 'Mission to the moon',
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
			data: [
				['Title', 'Description', 'Note', 'Reference'],
				[
					'EP 270 : Set Up To Fail Syndrome คืออะไร /คุณเป็นรึเปล่า/จะแก้ไขยังไง',
					'',
					'mm-270',
					'https://soundcloud.com/missiontothemoon/ep-270-set-up-to-fail-syndrome'
				],
				[
					'EP 325 - วิธีการจัดการไอเดียที่เยอะเกินไป',
					'',
					'',
					'https://soundcloud.com/missiontothemoon/ep-325'
				]
			]
		}
	}
};
