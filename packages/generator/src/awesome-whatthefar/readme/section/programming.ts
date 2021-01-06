import {
	MarkdownItem,
	MarkdownPageContext,
	MarkdownSection,
	MarkdownTable,
} from '@awesome-whatthefar/parser';
import { getDevDataSingleton, getDevOpsDataSingleton } from '../../../data';
import { tablesFromSubcategoricalData, toExpertiseTable } from '../../../template';
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
	const rawDev = await getDevDataSingleton();

	const dev = rawDev.filter(({}, row) => {
		return row.expertise !== '';
	});

	const generated = tablesFromSubcategoricalData(
		dev.sortCategory((a, b) => {
			return a.key.localeCompare(b.key);
		}),
		toExpertiseTable
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
	const rawDevops = await getDevOpsDataSingleton();

	const devops = rawDevops.filter(({}, row) => {
		return row.expertise !== '';
	});

	const generated = tablesFromSubcategoricalData(
		devops.sortCategory((a, b) => {
			return a.key.localeCompare(b.key);
		}),
		toExpertiseTable
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
