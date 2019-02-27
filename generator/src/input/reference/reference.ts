import {
	BackToTopItem,
	MarkdownPage,
	MarkdownPageReference
} from '@parser/markdown/types';
import { anotherRefPage } from './anotherReference';
import { managementSection } from './section/management';
import { productDevelopmentSection } from './section/product-development';
import { toolsSection } from './section/productivity-tools';
import { softwareDevelopmentSection } from './section/software-development';

const reference = {
	anotherRefPage: new MarkdownPageReference(anotherRefPage, 'another-ref.md')
};

export type ReferencePagePageReference = typeof reference;

export const referencePage = MarkdownPage.create({
	// type: 'MarkdownPage',
	title: 'Reference',
	description: '',
	reference,
	items: [
		{
			type: 'MarkdownSection',
			title: 'Bussiness',
			description: 'There is nothing yet',
			items: [BackToTopItem]
		},
		managementSection,
		productDevelopmentSection,
		softwareDevelopmentSection,
		toolsSection,
		{
			type: 'MarkdownSection',
			title: 'Potato',
			description:
				"![Sorry for the Long Post, here's a Potato](../asset/potato.jpg)",
			items: [BackToTopItem]
		},
		{
			type: 'MarkdownSection',
			title: 'Another Reference',
			items: [
				{
					type: 'MarkdownPlainText',
					text: ctx => `[Click here](${ctx.pageReferences.anotherRefPage})`
				},
				BackToTopItem
			]
		}
	]
});
