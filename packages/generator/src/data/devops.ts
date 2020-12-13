import { parseCsvFromInput } from '@awesome-whatthefar/parser';
import { publishedId } from '../input/table';
import { DataByCategory } from './core';

export function categoryFrom(other: string): [string, string] {
	const re = /^(?<cat>[\w\/ ]*)?(?:\[(?<sub>[\w\/ ]*)\])?$/;
	const match = other.match(re);
	if (match == null) {
		throw new Error(`Can't get category from '${other}'`);
	}
	if (match.groups === undefined) {
		// this should not happen
		throw new Error(`Can't get category from '${other}'`);
	}
	return [match.groups.cat ?? '', match.groups.sub ?? ''];
}

export interface DevOpsData {
	title: string;
	description: string;
	expertise: string;
	ref: string;
}

export class DevOpsDataByCategory extends DataByCategory<DevOpsData, [string, string]> {
	protected categoryFor(key: string): [string, string] {
		// TODO: handle error
		return key.split('.') as [string, string];
	}

	protected keyFor(category: [string, string]): string {
		return category.join('.');
	}
}

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
