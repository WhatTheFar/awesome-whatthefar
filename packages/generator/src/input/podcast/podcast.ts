import { MarkdownPage } from '@awesome/parser';
import { GENERATED_CONTENT_DIR } from './../../directory';
import { podcastBookmarkSection } from './section/podcast-bookmark';
import { podcastResourceTable } from './table/podcast-resource';

const reference = {};

export type PodcastPagePageReference = typeof reference;

export const podcastPage = MarkdownPage.create({
	title: 'Podcast Library',
	reference,
	dirPath: GENERATED_CONTENT_DIR,
	fileName: 'podcast.md',
	items: [podcastResourceTable, podcastBookmarkSection]
});
