import {
	BACK_TO_TOP,
	MarkdownPageContext,
	MarkdownSection
} from '@awesome-whatthefar/parser';
import { contactTable } from '../../table';
import { ReadmePagePageReference } from '../readme';

export const aboutMeSection: MarkdownSection<
	MarkdownPageContext<ReadmePagePageReference>
> = {
	type: 'MarkdownSection',
	title: 'About me',
	description: '**Jakpat Mingmongkolmitr**',
	items: [
		{
			type: 'MarkdownPlainText',
			text:
				// tslint:disable-next-line:max-line-length
				'> I am an enthusiastic Software Engineer and Developer, especially interested in Data Scientist. I enjoy learning new technologies and programming techniques to constantly develop my skills and grow professionally.'
		},
		contactTable,
		{
			type: 'MarkdownTable',
			title: 'Medium Stories',
			tableData: {
				input: {
					type: 'MemoryInput',
					data: [
						['Title', 'Language', 'Date', 'Reference'],
						[
							'การศึกษาและเงื่อนไข',
							'TH',
							'May 16, 2020',
							'https://medium.com/@jakpat.m/education-and-conditions-th-a6f24bd2258a'
						],
						[
							'ความหมายของชีวิต 2019',
							'TH',
							'Nov 30, 2019',
							'https://medium.com/@jakpat.m/meaning-of-life-2019-th-2acb37700fca'
						],
						[
							'How will you measure the Internship?',
							'TH',
							'Jul 9, 2019',
							'https://medium.com/@jakpat.m/how-will-you-measure-the-internship-th-16ca5a1bf0f1'
						],
						[
							'Best of Jakpat M. 2018',
							'TH',
							'Dec 31, 2018',
							'https://medium.com/@jakpat.m/best-of-jakpat-m-2018-d379a482826e'
						],
						[
							'ทำไมคนถึง(ไม่)ใช้ Chula Popbus ด้วยแนวคิด Hooked Model',
							'TH',
							'Nov 15, 2018',
							'https://medium.com/thinc-org/hooked-chula-popbus-th-c7688bac200b'
						],
						[
							'การฝึกงานครั้งแรก จากมุมมองเด็กอายุ 19',
							'TH',
							'Aug 18, 2018',
							'https://medium.com/c0d1um/first-internship-th-e96805fd2686'
						]
					]
				},
				options: {
					align: ['left', 'center', 'center', { type: 'Reference', colunm: 0 }]
				}
			}
		},
		{
			type: 'MarkdownHeader',
			title: 'Myers-Brigg',
			size: 3
		},
		{
			type: 'MarkdownPlainText',
			text: ctx => `[Go to Myers-Brigg page](${ctx.pageReferences.myersBriggs})`
		},
		BACK_TO_TOP
	]
};
