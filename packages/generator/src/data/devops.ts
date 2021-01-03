import { parseCsvFromInput } from '@awesome-whatthefar/parser';
import { publishedId } from './google-sheet';
import { DataBySubcategory, parseSubcategory } from './subcategory';

export interface DevOpsData {
	title: string;
	description: string;
	expertise: string;
	ref: string;
}

export class DevOpsDataByCategory extends DataBySubcategory<DevOpsData> {}

let singleton: Promise<DevOpsDataByCategory> | undefined;

export async function getDevOpsDataSingleton(): Promise<DevOpsDataByCategory> {
	if (singleton === undefined) {
		singleton = getDevOpsData();
	}
	return singleton;
}

async function getDevOpsData(): Promise<DevOpsDataByCategory> {
	const [data, errors] = await parseCsvFromInput({
		type: 'GoogleSheetInput',
		publishedId,
		sheetId: '609606435',
	});

	if (errors && !!errors.length) {
		throw new Error('Cannot parse CSV from input');
	}

	// indexes
	const [TITLE, EXPERTISE, CATEGORY, SUBCATEGORY, OTHERS, DESCRIPTION, REF] = [
		0,
		1,
		2,
		3,
		4,
		5,
		6,
	];

	const dataByCat = new DevOpsDataByCategory();

	data.slice(1).forEach((e) => {
		const categories: Array<[string, string]> = [[e[CATEGORY], e[SUBCATEGORY]]];

		if (e[OTHERS] !== '') {
			categories.push(
				...e[OTHERS].split(',').map((s) => {
					const [cat, sub] = parseSubcategory(s.trim());
					return [cat === '' ? e[CATEGORY] : cat, sub] as [string, string];
				})
			);
		}

		categories.forEach((c) => {
			dataByCat.push(c, {
				title: e[TITLE],
				description: e[DESCRIPTION],
				expertise: e[EXPERTISE],
				ref: e[REF],
			});
		});
	});

	return dataByCat;
}
