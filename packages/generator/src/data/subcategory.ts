import { DataByCategory } from './core';

export function parseSubcategory(other: string): MainCategoryWtihSub {
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

export type MainCategoryWtihSub = [string, string];

export class DataBySubcategory<T> extends DataByCategory<T, MainCategoryWtihSub> {
	public static categoryFor(key: string): MainCategoryWtihSub {
		// TODO: handle error
		return key.split('.') as MainCategoryWtihSub;
	}

	public static keyFor(category: MainCategoryWtihSub): string {
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

	public popSubcategoryFor(mainCategory: string): T[] {
		const subcategories = this.subcategoryFor(mainCategory);
		return subcategories.flatMap((sub) => {
			return this.pop([mainCategory, sub]);
		});
	}

	public reduceMainCategory<U>(
		fn: (
			previousValue: U,
			currentValue: {
				mainCategory: string;
				subcategories: DataBySubcategory<T>;
			},
			index: number
		) => U,
		initialState: U
	): U {
		const mainCategories = new Set(
			this.pairs.map(({ key }) => {
				const [mainCategory, {}] = this.categoryFor(key);
				return mainCategory;
			})
		);
		return Array.from(mainCategories).reduce<U>((prev, curr, index) => {
			const mainCategory = curr;
			const filtered = this.pairs.filter(({ key }) => {
				const [thisMainCategory, {}] = this.categoryFor(key);
				return thisMainCategory === mainCategory;
			});
			const subcategories = new DataBySubcategory(filtered);
			return fn(prev, { mainCategory, subcategories }, index);
		}, initialState);
	}

	protected categoryFor(key: string): MainCategoryWtihSub {
		return DataBySubcategory.categoryFor(key);
	}

	protected keyFor(category: MainCategoryWtihSub): string {
		return DataBySubcategory.keyFor(category);
	}
}
