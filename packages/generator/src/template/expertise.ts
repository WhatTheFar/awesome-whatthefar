import { MarkdownTable } from '@awesome-whatthefar/parser';

export function toExpertiseTable(
	title: string,
	data: Array<{ title: string; expertise: string; ref: string }>
): MarkdownTable {
	const tableData = [
		['Title', 'Expertise Level', 'Reference'],
		...data.map((e) => [e.title, e.expertise, e.ref]),
	];

	const table: MarkdownTable = {
		type: 'MarkdownTable',
		title: title === '' ? undefined : title,
		tableData: {
			input: {
				type: 'MemoryInput',
				data: tableData,
			},
			options: {
				align: ['left', 'center', { type: 'Reference', colunm: 0 }],
			},
		},
	};
	return table;
}
