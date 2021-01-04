import _ from 'lodash';

interface DataKeyPair<Datum> {
	key: string;
	data: Datum[];
}

export abstract class DataByCategory<Datum, Category> {
	constructor(public pairs: Array<DataKeyPair<Datum>> = []) {}

	public push(category: Category, datum: Datum): void {
		const key = this.keyFor(category);
		const index = this.pairs.findIndex(({ key: thisKey }) => thisKey === key);
		if (index === -1) {
			// no key exists, create a new category pair
			this.pairs.push({ key, data: [datum] });
		} else {
			// key exists, push a new datum into exisitng category's data
			const { data } = this.pairs[index];
			data.push(datum);
		}
	}

	public pop(category: Category): Datum[] {
		const key = this.keyFor(category);
		const index = this.pairs.findIndex(({ key: thisKey }) => thisKey === key);
		if (index === -1) {
			return [];
		}
		const [pair] = this.pairs.splice(index, 1);
		const { data } = pair;
		return data;
	}

	public sortCategory(
		fn: (
			a: { key: string; category: Category; data: Datum[] },
			b: { key: string; category: Category; data: Datum[] }
		) => number
	): this {
		this.pairs.sort(({ key: key1, data: data1 }, { key: key2, data: data2 }) => {
			const category1 = this.categoryFor(key1);
			const category2 = this.categoryFor(key2);
			return fn(
				{ key: key1, category: category1, data: data1 },
				{ key: key2, category: category2, data: data2 }
			);
		});
		return this;
	}

	public reduceCategory<U>(
		fn: (
			previousValue: U,
			currentValue: { category: Category; data: Datum[] },
			index: number
		) => U,
		initialState: U
	): U {
		return this.pairs.reduce<U>((prev, { key, data }, index) => {
			const category = this.categoryFor(key);
			return fn(prev, { category, data }, index);
		}, initialState);
	}

	public forEach(fn: (category: Category, datum: Datum) => void): void {
		this.pairs.forEach(({ key, data }) => {
			const category = this.categoryFor(key);
			data.forEach((datum) => {
				fn(category, datum);
			});
		});
	}

	public filter(predicate: (category: Category, datum: Datum) => boolean): this {
		const newThis = _.cloneDeep(this);
		newThis.pairs = this.pairs
			.map(({ key, data }): DataKeyPair<Datum> | undefined => {
				const category = this.categoryFor(key);
				const filtered = data.filter((datum) => {
					return predicate(category, datum);
				});

				if (filtered.length === 0) {
					return undefined;
				} else if (filtered.length <= data.length) {
					return { key, data: filtered };
				}
				return { key, data };
			})
			.filter((e): e is DataKeyPair<Datum> => e !== undefined);
		return newThis;
	}

	protected abstract categoryFor(key: string): Category;
	protected abstract keyFor(category: Category): string;
}
