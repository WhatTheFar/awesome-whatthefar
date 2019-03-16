import { BACK_TO_TOP, MarkdownPage, MarkdownPageReference } from '@awesome/parser';
import { GENERATED_CONTENT_DIR, getAssetPath } from '../../directory';
import { anotherRefPage } from './another-ref';
import { managementSection } from './section/management';
import { productDevelopmentSection } from './section/product-development';
import { toolsSection } from './section/productivity-tools';
import { selfLearningSection } from './section/self-learning';
import { softwareDevelopmentSection } from './section/software-development';

const reference = {
	anotherRefPage: new MarkdownPageReference(anotherRefPage)
};

export type ReferencePagePageReference = typeof reference;

export const referencePage = MarkdownPage.create({
	// type: 'MarkdownPage',
	title: 'Reference',
	description: '',
	reference,
	dirPath: GENERATED_CONTENT_DIR,
	fileName: 'reference.md',
	items: [
		{
			type: 'MarkdownSection',
			title: 'Bussiness',
			description: 'There is nothing yet',
			items: [BACK_TO_TOP]
		},
		managementSection,
		productDevelopmentSection,
		softwareDevelopmentSection,
		selfLearningSection,
		toolsSection,
		{
			type: 'MarkdownSection',
			title: 'Potato',
			items: [
				{
					type: 'MarkdownPlainText',
					text: ctx =>
						ctx.helper.createMarkdownImage(
							"Sorry for the Long Post, here's a Potato",
							getAssetPath('potato.jpg'),
							"Sorry for the Long Post, here's a Potato"
						)
				},
				BACK_TO_TOP
			]
		},
		{
			type: 'MarkdownSection',
			title: 'Another Reference',
			items: [
				{
					type: 'MarkdownPlainText',
					text: ctx => `[Click here](${ctx.pageReferences.anotherRefPage})`
				},
				BACK_TO_TOP
			]
		}
	]
});
