export abstract class DataByCategory<T, C> {
	constructor(private data: { [key: string]: T[] } = {}) {}

	public abstract categoryFor(key: string): C;
	public abstract keyFor(category: C): string;

	public push(category: C, row: T): void {
		const key = this.keyFor(category);
		const rows: T[] | undefined = this.data[key];
		if (rows !== undefined) {
			this.data[key] = [];
		}
		this.data[key].push(row);
	}

	public forEach(fn: (category: C, row: T) => void): void {
		Object.entries(this.data).forEach(([key, rows]) => {
			const category = this.categoryFor(key);
			rows.forEach((row) => {
				fn(category, row);
			});
		});
	}

	public filter(predicate: (category: C, row: T) => boolean): DataByCategory<T, C> {
		Object.entries(this.data).forEach(([key, rows]) => {
			const category = this.categoryFor(key);
			const filtered = rows.filter((row) => {
				return predicate(category, row);
			});

			if (filtered.length <= rows.length) {
				this.data[key] = filtered;
			}
		});
		return this;
	}
}
