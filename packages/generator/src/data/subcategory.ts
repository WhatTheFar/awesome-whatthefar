import { DataByCategory } from './core';

export function parseSubcategory(other: string): [string, string] {
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

export class DataBySubcategory<T> extends DataByCategory<T, [string, string]> {
	public static categoryFor(key: string): [string, string] {
		// TODO: handle error
		return key.split('.') as [string, string];
	}

	public static keyFor(category: [string, string]): string {
		return category.join('.');
	}

	public subcategoryFor(category: string): string[] {
		const keys = this.pairs.map(({ key }) => key);
		return keys.reduce<string[]>((subcategories, key) => {
			const [currCategory, currSubcategory] = this.categoryFor(key);
			if (currCategory === category && currSubcategory !== '') {
				return [...subcategories, currSubcategory];
			}
			return subcategories;
		}, []);
	}

	public popSubcategoryFor(category: string): T[] {
		const subcategories = this.subcategoryFor(category);
		return subcategories.flatMap((sub) => {
			return this.pop([category, sub]);
		});
	}

	protected categoryFor(key: string): [string, string] {
		return DataBySubcategory.categoryFor(key);
	}

	protected keyFor(category: [string, string]): string {
		return DataBySubcategory.keyFor(category);
	}
}
