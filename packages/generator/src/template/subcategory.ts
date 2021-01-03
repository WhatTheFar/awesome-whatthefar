import { MarkdownItem, MarkdownSection, MarkdownTable } from '@awesome-whatthefar/parser';
import { DataBySubcategory } from '../data';

export function tablesFromSubcategoricalData<T>(
	bundledData: DataBySubcategory<T>,
	toTableFunc: (title: string, data: T[]) => MarkdownTable
): MarkdownItem[] {
	const initialState: {
		items: MarkdownItem[];
		category: string | undefined;
	} = { items: [], category: undefined };

	const reduced = bundledData.reduceCategory((prev, curr) => {
		const { items: prevItems, category: prevCategory } = prev;
		const {
			category: [category, subcategory],
			data,
		} = curr;

		if (data.length === 0) {
			return prev;
		}

		if (bundledData.subcategoryFor(category).length > 0) {
			// TODO: handle if subcategory is duplicated to category
			const table = toTableFunc(subcategory, data);

			if (prevCategory !== category) {
				const section: MarkdownSection<any> = {
					type: 'MarkdownSection',
					title: category,
					items: [table],
				};
				prevItems.push(section);
			} else {
				// TODO: double check whether it is a MarkdownSecton or not
				const section = prevItems[prevItems.length - 1] as MarkdownSection<any>;
				// TODO: handle if section.items is undefined
				section.items?.push(table);
			}
		} else {
			const table = toTableFunc(category, data);
			prevItems.push(table);
		}

		return { items: prevItems, category };
	}, initialState);

	return reduced.items;
}
