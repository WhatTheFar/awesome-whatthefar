import { MarkdownPageContext, MarkdownSection } from '@awesome/parser';
import { PodcastPagePageReference } from './../podcast';
import { fiveMinPodcastTable } from './../table/five-min';
import { missionToTheMoonPodcastTable } from './../table/mission-to-the-moon';

export const podcastBookmarkSection: MarkdownSection<
	MarkdownPageContext<PodcastPagePageReference>
> = {
	type: 'MarkdownSection',
	title: 'Podcast Bookmark',
	description: 'My bookmarked podcasts and additional notes library',
	items: [missionToTheMoonPodcastTable, fiveMinPodcastTable]
};
