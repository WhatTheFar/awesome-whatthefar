import { MarkdownImage } from '@awesome-whatthefar/parser';
import { getAssetPath } from './directory';

export const potatoImage: MarkdownImage = {
	type: 'MarkdownImage',
	altText: "Sorry for the Long Post, here's a Potato",
	path: getAssetPath('potato.jpg'),
	title: "Sorry for the Long Post, here's a Potato",
};
