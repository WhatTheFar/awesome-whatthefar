import { parseCsvFromInput } from '@awesome-whatthefar/parser';
import { publishedId } from '../input/table';
import { DataByCategory } from './core';
import { categoryFrom } from './devops';

export interface DevData {
	title: string;
	description: string;
	expertise: string;
	ref: string;
}

export class DevDataByCategory extends DataByCategory<DevData, [string, string]> {
	// TODO: refactor to be a mixin
	public subcategoryFor(category: string): string[] {
		const keys = this.data.map((e) => e[0]);
		return keys.reduce<string[]>((subcategories, key) => {
			const [currCategory, currSubcategory] = this.categoryFor(key);
			if (currCategory === category && currSubcategory !== '') {
				return [...subcategories, currSubcategory];
			}
			return subcategories;
		}, []);
	}

	protected categoryFor(key: string): [string, string] {
		// TODO: handle error
		return key.split('.') as [string, string];
	}

	protected keyFor(category: [string, string]): string {
		return category.join('.');
	}
}

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
					const [cat, sub] = categoryFrom(s.trim());
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
