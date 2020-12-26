import {
	MarkdownItem,
	MarkdownPageContext,
	MarkdownSection,
	MarkdownTable,
	parseCsvFromInput,
} from '@awesome-whatthefar/parser';
import { DevOpsData, getDevOpsDataSingleton } from '../../../data/devops';
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

export async function generateDevOpsSection(): Promise<MarkdownItem[]> {
	const devops = await getDevOpsDataSingleton();

	devops.filter(({}, row) => {
		return row.expertise !== '';
	});

	function toTable(title: string, rows: DevOpsData[]): MarkdownTable {
		const tableData = [
			['Title', 'Expertise Level', 'Reference'],
			...rows.map((e) => [e.title, e.expertise, e.ref]),
		];

		const table: MarkdownTable = {
			type: 'MarkdownTable',
			title,
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

	const initialState: {
		items: MarkdownItem[];
		category: string | undefined;
	} = { items: [], category: undefined };

	const generated = devops
		.sortCategory((a, b) => {
			return a.key.localeCompare(b.key);
		})
		.reduceCategory((prev, curr) => {
			const { items: prevItems, category: prevCategory } = prev;
			const {
				category: [category, subcategory],
				rows,
			} = curr;

			if (rows.length === 0) {
				return prev;
			}

			if (subcategory !== '') {
				// TODO: handle if subcategory is duplicated to category
				const table = toTable(subcategory, rows);

				if (prevCategory !== category) {
					const section: MarkdownSection<any> = {
						type: 'MarkdownSection',
						title: category,
						items: [table],
					};
					prevItems.push(section);
				} else {
					// TODO: double check whether it is a MarkdownSecton or not
					const section = prevItems[
						prevItems.length - 1
					] as MarkdownSection<any>;
					// TODO: handle if section.items is undefined
					section.items?.push(table);
				}
			} else {
				const table = toTable(category, rows);
				prevItems.push(table);
			}

			return { items: prevItems, category };
		}, initialState);

	const wrapper: MarkdownItem[] = [
		{
			type: 'MarkdownSection',
			title: 'DevOps',
			items: [...generated.items],
		},
	];

	return wrapper;
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
