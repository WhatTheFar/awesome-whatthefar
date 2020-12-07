import { MarkdownTable } from '@awesome-whatthefar/parser';
import { BOOK_NOTE_DIR } from '../directory';
import { createFileRefDataMapperFunc } from '../util';

export const publishedId =
	'2PACX-1vQ6FlZEwgS9hr8lly1EwA1vCK1qDlOkLoZD3ninNi6vZlA5e7DtFtzMoPyJeFbeYntOfcqqldNmRD0d';

export const contactTable: MarkdownTable = {
	type: 'MarkdownTable',
	title: 'Contact',
	tableData: {
		input: {
			type: 'GoogleSheetInput',
			publishedId,
			sheetId: '1478469204'
		},
		options: {
			align: ['left', 'left', { type: 'Reference', colunm: 1 }]
		}
	}
};

export const programmingPrincipleTable: MarkdownTable = {
	type: 'MarkdownTable',
	title: 'Programming Principle',
	tableData: {
		input: {
			type: 'GoogleSheetInput',
			publishedId,
			sheetId: '1715428770'
		},
		options: {
			align: ['left', 'center']
		}
	}
};

export const programmingLanguageTable: MarkdownTable = {
	type: 'MarkdownTable',
	title: 'Programming Language',
	tableData: {
		input: {
			type: 'GoogleSheetInput',
			publishedId,
			sheetId: '795659014'
		},
		options: {
			align: ['left', 'center']
		}
	}
};

export const frontendTable: MarkdownTable = {
	type: 'MarkdownTable',
	title: 'Frontend',
	tableData: {
		input: {
			type: 'GoogleSheetInput',
			publishedId,
			sheetId: '1468357893'
		},
		options: {
			align: ['left', 'center', 'skip']
		}
	}
};

export const backendTable: MarkdownTable = {
	type: 'MarkdownTable',
	title: 'Backend',
	tableData: {
		input: {
			type: 'GoogleSheetInput',
			publishedId,
			sheetId: '435690626'
		},
		options: {
			align: ['left', 'center', 'skip']
		}
	}
};

export const androidTable: MarkdownTable = {
	type: 'MarkdownTable',
	title: 'Android',
	tableData: {
		input: {
			type: 'GoogleSheetInput',
			publishedId,
			sheetId: '1737119903'
		},
		options: {
			align: ['left', 'center', 'skip']
		}
	}
};

export const microservicesTable: MarkdownTable = {
	type: 'MarkdownTable',
	title: 'Microservices',
	tableData: {
		input: {
			type: 'GoogleSheetInput',
			publishedId,
			sheetId: '1363613515'
		},
		options: {
			align: ['left', 'center', 'skip']
		}
	}
};

export const devOpsTable: MarkdownTable = {
	type: 'MarkdownTable',
	title: 'DevOps',
	tableData: {
		input: {
			type: 'GoogleSheetInput',
			publishedId,
			sheetId: '1917160232'
		},
		options: {
			align: ['left', 'center', 'skip']
		}
	}
};

export const programmingBookTable: MarkdownTable = {
	type: 'MarkdownTable',
	title: 'Programming Book',
	tableData: {
		input: {
			type: 'GoogleSheetInput',
			publishedId,
			sheetId: '538544451'
		},
		options: {
			align: ['left', 'left', 'center', { type: 'Reference', colunm: 0 }]
		}
	}
};

export const nonFictionBookTable: MarkdownTable = {
	type: 'MarkdownTable',
	title: 'Non-fiction Book',
	tableData: {
		input: {
			type: 'GoogleSheetInput',
			publishedId,
			sheetId: '0'
		},
		options: {
			align: ['left', 'left', 'center', 'center'],
			mapper: [
				'skip',
				'skip',
				'skip',
				createFileRefDataMapperFunc('Click', BOOK_NOTE_DIR, '.md')
			]
		}
	}
};

export const readedNonFictionBookTable: MarkdownTable = {
	type: 'MarkdownTable',
	title: 'Readed Non-fiction Book',
	tableData: {
		input: {
			type: 'GoogleSheetInput',
			publishedId,
			sheetId: '0'
		},
		options: {
			align: ['left', 'left', 'center', 'center'],
			mapper: [
				'skip',
				'skip',
				'skip',
				createFileRefDataMapperFunc('Click', BOOK_NOTE_DIR, '.md')
			],
			filter: (row, _rowIndex, _ctx) => !!row[2]
		}
	}
};

export const nonFictionThaiBookTable: MarkdownTable = {
	type: 'MarkdownTable',
	title: 'Thai Non-fiction Book',
	tableData: {
		input: {
			type: 'GoogleSheetInput',
			publishedId,
			sheetId: '39977999'
		},
		options: {
			align: ['left', 'left', 'center']
		}
	}
};

export const fictionBookTable: MarkdownTable = {
	type: 'MarkdownTable',
	title: 'Fiction Book',
	tableData: {
		input: {
			type: 'GoogleSheetInput',
			publishedId,
			sheetId: '1637954035'
		},
		options: {
			align: ['left', 'left', 'center']
		}
	}
};

export const udemyTable: MarkdownTable = {
	type: 'MarkdownTable',
	title: 'Udemy Course',
	tableData: {
		input: {
			type: 'GoogleSheetInput',
			publishedId,
			sheetId: '1341593173'
		},
		options: {
			align: ['left', { type: 'Reference', colunm: 0 }]
		}
	}
};

export const courseraTable: MarkdownTable = {
	type: 'MarkdownTable',
	title: 'Coursera',
	tableData: {
		input: {
			type: 'GoogleSheetInput',
			publishedId,
			sheetId: '191270080'
		},
		options: {
			align: [
				// Course
				'left',
				// Instructor
				'left',
				// Done
				'center',
				// Course Ref
				{ type: 'Reference', colunm: 0 },
				// Instructor Ref
				{ type: 'Reference', colunm: 1 }
			],
			// Check whether the courses are done or on-going
			filter: (row, _rowIndex, _ctx) => !!row[2]
		}
	}
};

export const udacityTable: MarkdownTable = {
	type: 'MarkdownTable',
	title: 'Udacity',
	tableData: {
		input: {
			type: 'GoogleSheetInput',
			publishedId,
			sheetId: '1607382371'
		},
		options: {
			align: ['left', 'left', { type: 'Reference', colunm: 0 }]
		}
	}
};

export const tedxTalkTable: MarkdownTable = {
	type: 'MarkdownTable',
	title: 'TedxTalk',
	tableData: {
		input: {
			type: 'GoogleSheetInput',
			publishedId,
			sheetId: '1207299647'
		},
		options: {
			align: ['left', 'left', { type: 'Reference', colunm: 0 }, 'skip']
		}
	}
};

export const allTable = [
	contactTable,
	programmingPrincipleTable,
	programmingLanguageTable,
	frontendTable,
	backendTable,
	androidTable,
	devOpsTable,
	programmingBookTable,
	readedNonFictionBookTable,
	nonFictionBookTable,
	nonFictionThaiBookTable,
	fictionBookTable,
	udemyTable,
	courseraTable,
	udacityTable,
	tedxTalkTable
];
