import { MarkdownPage } from './../../parser/markdown/types';

export const anotherRefPage = MarkdownPage.create({
	title: 'Another Reference',
	description: 'For testing purpose',
	options: {
		initialState: {
			initial: 'This is an initial state value'
		}
	},
	items: [
		{
			type: 'MarkdownPlainText',
			text: 'Just an another reference page'
		},
		{
			type: 'MarkdownPlainText',
			text: ctx => `state.initial: ${ctx.state.initial}`
		},
		{
			type: 'MarkdownPlainText',
			text: ctx => {
				ctx.dispatch({
					...ctx.state,
					temp: 'This is a temp value from earlier dispatch'
				});
				return 'state.temp is dispatched';
			}
		},
		{
			type: 'MarkdownPlainText',
			text: ctx => `state.temp: ${ctx.state.temp}`
		}
	]
});
