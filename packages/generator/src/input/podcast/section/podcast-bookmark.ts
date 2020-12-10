import { MarkdownPageContext, MarkdownSection } from '@awesome-whatthefar/parser';
import { PodcastPagePageReference } from './../podcast';
import { eightAndAHalfLineTable } from './../table/eight-and-a-half-line';
import { fiveMinPodcastTable } from './../table/five-min';
import { missionToTheMoonPodcastTable } from './../table/mission-to-the-moon';

export const podcastBookmarkSection: MarkdownSection<
	MarkdownPageContext<PodcastPagePageReference>
> = {
	type: 'MarkdownSection',
	title: 'Bookmark',
	description: 'My bookmarked podcasts and additional notes',
	items: [missionToTheMoonPodcastTable, fiveMinPodcastTable, eightAndAHalfLineTable],
};
