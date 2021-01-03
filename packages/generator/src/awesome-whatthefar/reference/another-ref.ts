import { MarkdownPage } from '@awesome-whatthefar/parser';
import { GENERATED_CONTENT_DIR } from '../directory';

export const anotherRefPage = MarkdownPage.create({
	title: 'Another Reference',
	description: 'For testing purpose',
	options: {
		initialState: {
			initial: 'This is an initial state value',
		},
	},
	dirPath: GENERATED_CONTENT_DIR,
	fileName: 'another-ref.md',
	items: [
		{
			type: 'MarkdownPlainText',
			text: 'Just an another reference page for Testing',
		},
		{
			type: 'MarkdownPlainText',
			text: (ctx) => `state.initial: ${ctx.state.initial}`,
		},
		{
			type: 'MarkdownPlainText',
			text: (ctx) => {
				ctx.dispatch({
					...ctx.state,
					temp: 'This is a temp value from earlier dispatch',
				});
				return 'state.temp is dispatched';
			},
		},
		{
			type: 'MarkdownPlainText',
			text: (ctx) => `state.temp: ${ctx.state.temp}`,
		},
	],
});
