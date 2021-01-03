import { parseCsvFromInput } from '@awesome-whatthefar/parser';
import { publishedId } from './google-sheet';
import { DataBySubcategory, parseSubcategory } from './subcategory';

export interface DevData {
	title: string;
	description: string;
	expertise: string;
	ref: string;
}

export class DevDataByCategory extends DataBySubcategory<DevData> {}

let singleton: Promise<DevDataByCategory> | undefined;

export async function getDevDataSingleton(): Promise<DevDataByCategory> {
	if (singleton === undefined) {
		singleton = getDevData();
	}
	return singleton;
}

async function getDevData(): Promise<DevDataByCategory> {
	const [data, errors] = await parseCsvFromInput({
		type: 'GoogleSheetInput',
		publishedId,
		sheetId: '608142013',
	});

	if (errors && !!errors.length) {
		throw new Error('Cannot parse CSV from input');
	}

	// indexes
	const [
		TITLE,
		EXPERTISE,
		CATEGORY,
		SUBCATEGORY,
		OTHERS,
		DESCRIPTION,
		LANGUAGE,
		REF,
	] = [0, 1, 2, 3, 4, 5, 6, 7];

	const dataByCat = new DevDataByCategory();

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
