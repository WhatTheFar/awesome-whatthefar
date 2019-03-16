import { MarkdownTable } from '@awesome/parser';

const publishedId =
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
			align: ['left', 'center']
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
			align: ['left', 'center']
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
			align: ['left', 'center']
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
			align: ['left', 'center']
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
				(value, index, row) => {
					if (value) {
						return `[Click](content/book-note/${value}.md)`;
					} else {
						return '';
					}
				}
			]
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
				'left',
				'left',
				{ type: 'Reference', colunm: 0 },
				{ type: 'Reference', colunm: 1 }
			]
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
	nonFictionBookTable,
	nonFictionThaiBookTable,
	fictionBookTable,
	udemyTable
];
