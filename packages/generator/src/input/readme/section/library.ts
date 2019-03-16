import { MarkdownPageContext, MarkdownSection } from '@awesome/parser';
import { ReadmePagePageReference } from '../readme';

export const librarySection: MarkdownSection<
	MarkdownPageContext<ReadmePagePageReference>
> = {
	type: 'MarkdownSection',
	title: 'My Library',
	items: [
		{
			type: 'MarkdownSection',
			title: 'Books',
			items: [
				{
					type: 'MarkdownPlainText',
					text: ctx => `[Go to Books page](${ctx.pageReferences.bookPage})`
				}
			]
		},
		{
			type: 'MarkdownSection',
			title: 'Podcasts',
			items: [
				{
					type: 'MarkdownPlainText',
					text: ctx => `[Go to Podcast page](${ctx.pageReferences.podcastPage})`
				}
			]
		}
	]
};
