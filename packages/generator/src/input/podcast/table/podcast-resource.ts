import { MarkdownTable } from '@awesome/parser';

export const podcastResourceTable: MarkdownTable = {
	type: 'MarkdownTable',
	title: 'Podcast Resource',
	tableData: {
		options: {
			align: ['left', 'left', 'center', { type: 'Reference', colunm: 0 }]
		},
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
					'5 Minutes',
					"Actually, it's more than 5...",
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
		}
	}
};
