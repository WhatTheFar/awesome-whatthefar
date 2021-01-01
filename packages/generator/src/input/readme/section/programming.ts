import {
	MarkdownItem,
	MarkdownPageContext,
	MarkdownSection,
	MarkdownTable,
} from '@awesome-whatthefar/parser';
import { DataBySubcategory } from 'src/data/subcategory';
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

function generateTables<T>(
	bundledData: DataBySubcategory<T>,
	toTableFunc: (title: string, data: T[]) => MarkdownTable
): MarkdownItem[] {
	const initialState: {
		items: MarkdownItem[];
		category: string | undefined;
	} = { items: [], category: undefined };

	const reduced = bundledData.reduceCategory((prev, curr) => {
		const { items: prevItems, category: prevCategory } = prev;
		const {
			category: [category, subcategory],
			data,
		} = curr;

		if (data.length === 0) {
			return prev;
		}

		if (bundledData.subcategoryFor(category).length > 0) {
			// TODO: handle if subcategory is duplicated to category
			const table = toTableFunc(subcategory, data);

			if (prevCategory !== category) {
				const section: MarkdownSection<any> = {
					type: 'MarkdownSection',
					title: category,
					items: [table],
				};
				prevItems.push(section);
			} else {
				// TODO: double check whether it is a MarkdownSecton or not
				const section = prevItems[prevItems.length - 1] as MarkdownSection<any>;
				// TODO: handle if section.items is undefined
				section.items?.push(table);
			}
		} else {
			const table = toTableFunc(category, data);
			prevItems.push(table);
		}

		return { items: prevItems, category };
	}, initialState);

	return reduced.items;
}

function toTable(title: string, data: DevOpsData[]): MarkdownTable {
	const tableData = [
		['Title', 'Expertise Level', 'Reference'],
		...data.map((e) => [e.title, e.expertise, e.ref]),
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

	const generated = generateTables(
		dev.sortCategory((a, b) => {
			return a.key.localeCompare(b.key);
		}),
		toTable
	);

	const wrapper: MarkdownItem[] = [
		{
			type: 'MarkdownSection',
			title: 'Developer',
			items: [...generated],
		},
	];

	return wrapper;
}

export async function generateDevOpsSection(): Promise<MarkdownItem[]> {
	const devops = await getDevOpsDataSingleton();

	devops.filter(({}, row) => {
		return row.expertise !== '';
	});

	const generated = generateTables(
		devops.sortCategory((a, b) => {
			return a.key.localeCompare(b.key);
		}),
		toTable
	);

	const wrapper: MarkdownItem[] = [
		{
			type: 'MarkdownSection',
			title: 'DevOps',
			items: [...generated],
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
