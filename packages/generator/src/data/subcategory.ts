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

export class DataBySubcategory<T> extends DataByCategory<T, [string, string]> {
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
