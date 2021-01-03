import { MarkdownPage } from '@awesome-whatthefar/parser';
import {
	fictionBookTable,
	nonFictionBookTable,
	nonFictionThaiBookTable,
	readedNonFictionBookTable,
} from '../table';
import { GENERATED_CONTENT_DIR } from '../directory';
import { programmingBookTable } from './../table';
// tslint:disable:max-line-length

const reference = {};

export type BookPagePageReference = typeof reference;

export const bookPage = MarkdownPage.create({
	title: 'Book Library',
	reference,
	dirPath: GENERATED_CONTENT_DIR,
	fileName: 'book.md',
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
							'https://designepiclife.com/book-summary-websites/',
						],
						[
							'15 ofthe Best Time Management and Productivity Books of All Time',
							'',
							'https://www.entrepreneur.com/article/329378?utm_source=facebook&utm_medium=editorial&utm_content=entrepreneur-books&fbclid=IwAR1fVoKe8aAdS3I5J-pZedAiVV-UPsFfojpFiigofhDIop0rykKY-MWvnX4',
						],
						[
							'BookDD',
							'A youtube channel with great book summary contents',
							'https://www.youtube.com/channel/UClaqefQhdRC7KnrASLE7J-g/',
						],
					],
				},
				options: {
					align: ['left', 'left', { type: 'Reference', colunm: 0 }],
				},
			},
		},
		{
			type: 'MarkdownSection',
			title: 'Reading List',
			items: [
				programmingBookTable,
				readedNonFictionBookTable,
				nonFictionBookTable,
				nonFictionThaiBookTable,
				fictionBookTable,
			],
		},
	],
});
