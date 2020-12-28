export abstract class DataByCategory<T, C> {
	constructor(public data: Array<[string, T[]]> = []) {}

	public push(category: C, row: T): void {
		const key = this.keyFor(category);
		const index = this.data.findIndex(([currKey, {}]) => currKey === key);

		if (index === -1) {
			this.data.push([key, [row]]);
		} else {
			const [{}, rows] = this.data[index];
			rows.push(row);
		}
	}

	public pop(category: C): T[] {
		const key = this.keyFor(category);
		const index = this.data.findIndex((e) => e[0] === key);
		if (index === -1) {
			return [];
		}
		const [[{}, items]] = this.data.splice(index, 1);
		return items;
	}

	public sortCategory(
		fn: (
			a: { key: string; category: C; rows: T[] },
			b: { key: string; category: C; rows: T[] }
		) => number
	): this {
		this.data.sort(([key1, rows1], [key2, rows2]) => {
			const category1 = this.categoryFor(key1);
			const category2 = this.categoryFor(key2);
			return fn(
				{ key: key1, category: category1, rows: rows1 },
				{ key: key2, category: category2, rows: rows2 }
			);
		});
		return this;
	}

	public reduceCategory<U>(
		fn: (
			previousValue: U,
			currentValue: { category: C; rows: T[] },
			index: number
		) => U,
		initialState: U
	): U {
		return this.data.reduce<U>((prev, [key, rows], index) => {
			const category = this.categoryFor(key);
			return fn(prev, { category, rows }, index);
		}, initialState);
	}

	public forEach(fn: (category: C, row: T) => void): void {
		this.data.forEach(([key, rows]) => {
			const category = this.categoryFor(key);
			rows.forEach((row) => {
				fn(category, row);
			});
		});
	}

	public filter(predicate: (category: C, row: T) => boolean): this {
		this.data = this.data.map(([key, rows]) => {
			const category = this.categoryFor(key);
			const filtered = rows.filter((row) => {
				return predicate(category, row);
			});

			if (filtered.length <= rows.length) {
				return [key, filtered];
			}
			return [key, rows];
		});
		return this;
	}
	protected abstract categoryFor(key: string): C;
	protected abstract keyFor(category: C): string;
}
