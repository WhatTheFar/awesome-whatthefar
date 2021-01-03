import { MarkdownTable } from '@awesome-whatthefar/parser';
import { getGeneratedPodcastNotePath, getPodcastNotePath } from '../../directory';
import { createFileRefDataMapperFunc } from '../../util';
import { createPodcastNoteTableDataFormMarkdownFrontMatter } from './util';

const podcastName = 'eight-and-a-half-line';
const podcastDirPath = getPodcastNotePath(podcastName);
const generatedPodcastDirPath = getGeneratedPodcastNotePath(podcastName);

export function eightAndAHalfLineTable(): MarkdownTable {
	return {
		type: 'MarkdownTable',
		title: 'แปดบรรทัดครั่ง',
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
				// 		'EP10 - ที่บริษัท Google เขาเลือกคนยังไง',
				// 		'ทำไมเราถึงต้องเลือกคนเก่งมาทำงาน',
				// 		'8line-10',
				// 		'ep10-google'
				// 		// 'https://soundcloud.com/user-643868388/ep10-google'
				// 	],
				// 	[
				// 		'EP9 - 3 เคล็ดลับ สร้างแรงจูงใจให้ทีมงาน',
				// 		'AMP - Autonomy, Mastery, Purpose',
				// 		'',
				// 		'ep9-3'
				// 		// 'https://soundcloud.com/user-643868388/ep9-3'
				// 	],
				// 	[
				// 		'EP7 - คำติชม ให้อย่างไร ไม่ทะเลาะ #2',
				// 		'How to give a feedback - assertive communication',
				// 		'',
				// 		'ep7-2'
				// 		// 'https://soundcloud.com/user-643868388/ep7-2'
				// 	],
				// 	[
				// 		'EP6 - คำติชม ให้อย่างไร ไม่ทะเลาะ #1',
				// 		'Feedback is a gift',
				// 		'',
				// 		'ep6'
				// 		// 'https://soundcloud.com/user-643868388/ep6'
				// 	]
				// ]
			},
		},
	};
}
