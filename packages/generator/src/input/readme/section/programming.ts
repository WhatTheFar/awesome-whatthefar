import {
	MarkdownItem,
	MarkdownPageContext,
	MarkdownSection,
	MarkdownTable,
	parseCsvFromInput,
} from '@awesome-whatthefar/parser';
import { publishedId } from '../../table';
import { ReadmePagePageReference } from '../readme';

export async function createProgrammingSection() {
	const programmingSection: MarkdownSection<
		MarkdownPageContext<ReadmePagePageReference>
	> = {
		type: 'MarkdownSection',
		title: 'My Programming Skills',
		items: [
			...(await generateDevSection()),
			...(await generateDevOpsSection()),
			machineLearningTable,
		],
	};

	return programmingSection;
}

export async function generateDevSection(): Promise<MarkdownItem[]> {
	const [data, errors] = await parseCsvFromInput({
		type: 'GoogleSheetInput',
		publishedId,
		sheetId: '1452936795',
	});

	if (errors && !!errors.length) {
		throw new Error('Cannot parse CSV from input');
	}

	// indexes
	const TITLE = 0;
	const EXPERTISE = 1;
	const CATEGORY = 2;
	const OTHERS = 3;
	const REF = 5;

	interface Data {
		title: string;
		// categories: string[];
		expertise: string;
		ref: string;
	}
	const dataByCat: {
		[category: string]: Data[];
	} = {};

	data.slice(1).forEach((e) => {
		const categories = [e[CATEGORY]];
		if (e[OTHERS] !== '') {
			categories.push(...e[OTHERS].split(',').map((s) => s.trim()));
		}
		categories.forEach((c) => {
			if (!(c in dataByCat)) {
				dataByCat[c] = [];
			}
			dataByCat[c].push({
				title: e[TITLE],
				expertise: e[EXPERTISE],
				ref: e[REF],
			});
		});
	});

	function toTable(cat: string): MarkdownTable {
		const tableData = [
			['Title', 'Expertise Level', 'Reference'],
			...dataByCat[cat].map((e) => [e.title, e.expertise, e.ref]),
		];

		const table: MarkdownTable = {
			type: 'MarkdownTable',
			title: cat,
			tableData: {
				input: {
					type: 'MemoryInput',
					data: tableData,
				},
				options: {
					align: ['left', 'center', { type: 'Reference', colunm: 0 }],
				},
			},
		};
		return table;
	}

	const progPrincipleTable = toTable('Principle');
	const progLanguageTable = toTable('Language');
	delete dataByCat.Principle;
	delete dataByCat.Language;

	const tables: MarkdownTable[] = Object.keys(dataByCat).map((cat) => {
		return toTable(cat);
	});

	const items: MarkdownItem[] = [
		progLanguageTable,
		progPrincipleTable,
		{
			type: 'MarkdownSection',
			title: 'Developer',
			items: [...tables],
		},
	];

	return items;
}

export function categoryFrom(other: string): string {
	const re = /^(?<cat>[\w\/ ]*)?(?:\[(?<sub>[\w\/ ]*)\])?$/;
	const match = other.match(re);
	if (match == null) {
		throw new Error(`Can not get category from ${other}`);
	}
	if (match.groups === undefined) {
		// this should not happen
		throw new Error(`Can not get category from ${other}`);
	}
	return match.groups.cat ?? '';
}

export async function generateDevOpsSection(): Promise<MarkdownItem[]> {
	const [data, errors] = await parseCsvFromInput({
		type: 'GoogleSheetInput',
		publishedId,
		sheetId: '609606435',
	});

	if (errors && !!errors.length) {
		throw new Error('Cannot parse CSV from input');
	}

	// indexes
	const [TITLE, EXPERTISE, CATEGORY, {}, OTHERS, {}, REF] = [0, 1, 2, 3, 4, 5, 6];

	interface Data {
		title: string;
		// categories: string[];
		expertise: string;
		ref: string;
	}
	const dataByCat: {
		[category: string]: Data[];
	} = {};

	data.slice(1)
		.filter((e) => {
			return e[EXPERTISE] !== '';
		})
		.forEach((e) => {
			const categories = [e[CATEGORY]];
			if (e[OTHERS] !== '') {
				categories.push(
					...e[OTHERS].split(',')
						.map((s) => {
							const category = categoryFrom(s.trim());
							if (category === '') {
								return null;
							}
							return category;
						})
						.filter((s): s is string => s !== null)
				);
			}
			categories.forEach((c) => {
				if (!(c in dataByCat)) {
					dataByCat[c] = [];
				}
				dataByCat[c].push({
					title: e[TITLE],
					expertise: e[EXPERTISE],
					ref: e[REF],
				});
			});
		});

	function toTable(cat: string): MarkdownTable {
		const tableData = [
			['Title', 'Expertise Level', 'Reference'],
			...dataByCat[cat].map((e) => [e.title, e.expertise, e.ref]),
		];

		const table: MarkdownTable = {
			type: 'MarkdownTable',
			title: cat,
			tableData: {
				input: {
					type: 'MemoryInput',
					data: tableData,
				},
				options: {
					align: ['left', 'center', { type: 'Reference', colunm: 0 }],
				},
			},
		};
		return table;
	}

	const tables: MarkdownTable[] = Object.keys(dataByCat).map((cat) => {
		return toTable(cat);
	});

	const items: MarkdownItem[] = [
		{
			type: 'MarkdownSection',
			title: 'DevOps',
			items: [...tables],
		},
	];

	return items;
}

export const machineLearningTable: MarkdownTable = {
	type: 'MarkdownTable',
	title: 'Machine Learning',
	tableData: {
		input: {
			type: 'GoogleSheetInput',
			publishedId,
			sheetId: '2002053549',
		},
		options: {
			align: ['left', 'center', { type: 'Reference', colunm: 0 }],
		},
	},
};
