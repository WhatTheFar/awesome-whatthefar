import {
	MarkdownItem,
	MarkdownPageContext,
	MarkdownSection,
	MarkdownTable,
	parseCsvFromInput,
} from '@awesome-whatthefar/parser';
import { getDevDataSingleton } from '../../../data/dev';
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

function toTable(title: string, rows: DevOpsData[]): MarkdownTable {
	const tableData = [
		['Title', 'Expertise Level', 'Reference'],
		...rows.map((e) => [e.title, e.expertise, e.ref]),
	];

	const table: MarkdownTable = {
		type: 'MarkdownTable',
		title: title === '' ? undefined : title,
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

export async function generateDevSection(): Promise<MarkdownItem[]> {
	const dev = await getDevDataSingleton();

	dev.filter(({}, row) => {
		return row.expertise !== '';
	});

	const initialState: {
		items: MarkdownItem[];
		category: string | undefined;
	} = { items: [], category: undefined };

	const generated = dev
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

			if (dev.subcategoryFor(category).length > 0) {
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
			title: 'Developer',
			items: [...generated.items],
		},
	];

	return wrapper;
}

export async function generateDevOpsSection(): Promise<MarkdownItem[]> {
	const devops = await getDevOpsDataSingleton();

	devops.filter(({}, row) => {
		return row.expertise !== '';
	});

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

			if (dev.subcategoryFor(category).length > 0) {
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
