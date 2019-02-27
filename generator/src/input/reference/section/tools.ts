import { MarkdownPageContext, MarkdownSection } from '@src/parser/markdown/types';
import { ReferencePagePageReference } from '../reference';

export const toolsSection: MarkdownSection<
	MarkdownPageContext<ReferencePagePageReference>
> = {
	type: 'MarkdownSection',
	title: 'Productivity Tools',
	items: [
		{
			type: 'MarkdownTable',
			title: 'Personal Management',
			tableData: {
				input: {
					type: 'MemoryInput',
					data: [
						['Title', 'Description', 'Reference'],
						[
							'awesome-whatthefar',
							'😎 Curated list of awesome WhatTheFar',
							'https://github.com/WhatTheFar/awesome-whatthefar/'
						],
						[
							'Google Calendar',
							'Time boxing tool',
							'https://www.google.com/calendar'
						],
						[
							'Notion',
							'All-in-one workspace. Write, plan, collaborate, and get organized.',
							'https://www.notion.so/'
						],
						[
							'Spotify',
							'For listening music and podcast',
							'https://www.spotify.com/'
						]
					]
				},
				options: {
					align: ['left', 'left', { type: 'Reference', colunm: 0 }]
				}
			}
		},
		{
			type: 'MarkdownTable',
			title: 'macOS',
			tableData: {
				input: {
					type: 'MemoryInput',
					data: [
						['Title', 'Description', 'Reference'],
						[
							'Alfred',
							'A must-have productivity app for macOS',
							'https://www.alfredapp.com/'
						],
						[
							'iTerm2',
							'Best replacement for Terminal',
							'https://www.iterm2.com/'
						],
						[
							'Fork',
							'a fast and friendly git client for Mac and Windows',
							'https://git-fork.com/'
						],
						[
							'Dropzone 3',
							'move and copy files, launch applications, upload to many different services, and more',
							'https://aptonic.com/'
						],
						[
							'Gestimer',
							'Best timer for macOS',
							'https://itunes.apple.com/th/app/gestimer/id990588172?mt=12'
						]
					]
				},
				options: {
					align: ['left', 'left', { type: 'Reference', colunm: 0 }]
				}
			}
		},
		{
			type: 'MarkdownTable',
			title: 'Google Chrome',
			tableData: {
				input: {
					type: 'MemoryInput',
					data: [
						['Title', 'Description', 'Reference'],
						[
							'The Great Suspender',
							"Make your computer run smoothly by suspending the tabs you aren't using",
							'https://chrome.google.com/webstore/detail/the-great-suspender/klbibkeccnjlkjkiokjodocebajanakg?hl=en'
						],
						[
							"Vimium - The Hacker's Browser",
							'Chrome extension for Vim user',
							'https://github.com/philc/vimium'
						]
					]
				},
				options: {
					align: ['left', 'left', { type: 'Reference', colunm: 0 }]
				}
			}
		}
	]
};
