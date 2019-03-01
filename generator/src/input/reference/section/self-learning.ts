import { MarkdownPageContext, MarkdownSection } from '@src/parser/markdown/types';
import { ReferencePagePageReference } from '../reference';

export const selfLearningSection: MarkdownSection<
	MarkdownPageContext<ReferencePagePageReference>
> = {
	type: 'MarkdownSection',
	title: 'Self-Learning',
	items: [
		{
			type: 'MarkdownTable',
			title: 'Reading Resource',
			tableData: {
				input: {
					type: 'MemoryInput',
					data: [
						['Title', 'Description', 'Reference'],
						[
							'40+ Best Book Summary',
							'“So many books, so little time.” — Frank Zappa',
							'https://designepiclife.com/book-summary-websites/'
						]
					]
				},
				options: {
					align: ['left', 'left', { type: 'Reference', colunm: 0 }]
				}
			}
		},
		{
			type: 'MarkdownTable',
			title: 'Podcast',
			tableData: {
				input: {
					type: 'MemoryInput',
					data: [
						['Title', 'Description', 'Lang', 'Reference'],
						[
							'Mission to the moon',
							'Batteries included',
							'TH',
							'https://soundcloud.com/missiontothemoon'
						],
						[
							'SUPER PRODUCTIVE',
							'Productivity, Self-development, Work-life',
							'TH',
							'https://soundcloud.com/thestandardpodcast/sets/super-productive'
						],
						[
							'แปดบรรทัดครึ่ง',
							'Kaweewut Temphuwapat - Creativity, Innovation, Culture',
							'TH',
							'https://soundcloud.com/user-643868388'
						],
						[
							"Nopadol's Story",
							'Nopadol Rompho - Measurement, OKRs, Book Review',
							'TH',
							'https://soundcloud.com/nopadol-rompho'
						],
						[
							'THE STANDARD Podcast',
							'Podcast god',
							'TH',
							'https://soundcloud.com/thestandardpodcast'
						]
					]
				},
				options: {
					align: ['left', 'left', 'center', { type: 'Reference', colunm: 0 }]
				}
			}
		}
	]
};
