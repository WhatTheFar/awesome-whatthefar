import { BACK_TO_TOP, MarkdownPageContext, MarkdownSection } from '@awesome/parser';
import {
	androidTable,
	backendTable,
	devOpsTable,
	frontendTable,
	programmingLanguageTable,
	programmingPrincipleTable
} from '../../table';
import { ReadmePagePageReference } from '../readme';

export const programmingSection: MarkdownSection<
	MarkdownPageContext<ReadmePagePageReference>
> = {
	type: 'MarkdownSection',
	title: 'My Programming Skills',
	items: [
		programmingPrincipleTable,
		programmingLanguageTable,
		{
			type: 'MarkdownSection',
			title: 'Developer',
			items: [
				frontendTable,
				backendTable,
				androidTable,
				{
					type: 'MarkdownItemGroup',
					items: [
						{ type: 'MarkdownHeader', title: 'iOS', size: 3 },
						{
							type: 'MarkdownPlainText',
							text: "Sorry, I don't code iOS ;)"
						},
						BACK_TO_TOP
					]
				},
				{
					type: 'MarkdownTable',
					title: 'Cross-platform',
					tableData: {
						input: {
							type: 'MemoryInput',
							data: [
								['Title', 'Expertise Level'],
								['React Native', 'Beginner'],
								['Flutter', 'Beginner']
							]
						},
						options: {
							align: ['left', 'center']
						}
					}
				}
			]
		},
		devOpsTable
	]
};
