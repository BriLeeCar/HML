'use client'

import {
	Icon,
	Section,
	SectionHeading,
	SubSection,
} from '~/components'
export const GuidesContent = ({
	pdfGuides,
}: {
	pdfGuides: Array<{ title: string; link: string; type: string }>
}) => {
	const asylumGuides = [
		{
			title: 'Claiming Asylum',
			subtitle: 'What It Means and Where to Start',
			link: '/claiming-asylum',
			type: 'reading',
		},
		...pdfGuides.filter((x) =>
			['Eu Entrance Information', 'Asylum Process'].includes(x.title)
		),
	]

	const pageGuides = [
		...pdfGuides.filter((x) =>
			asylumGuides.every((y) => y.title !== x.title)
		),
		{
			title: 'Get Ready to Leave',
			subtitle: 'Essential Steps from Planning to Packing',
			link: '/get-ready-to-leave',
			type: 'guide',
		},
	]

	return (
		<Section>
			<SectionHeading
				id='guides'
				eyebrow='How-To Guides & Resources'
				subtitle='We know this process can be overwhelming. These guides are designed to help you navigate the complexities of planning your evacuation, offering practical advice and insights to empower your journey.'>
				Hope this helps
			</SectionHeading>
			<SubSection
				title='Asylum Information'
				className='mb-8'>
				<div className='mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 md:mx-0 md:max-w-none md:grid-cols-2'>
					{asylumGuides.map((post) => (
						<Doc
							key={post.link}
							post={post}
						/>
					))}
				</div>
			</SubSection>
			<SubSection
				title='General Information'
				className='mb-8'>
				<div className='mx-auto my-10 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 md:mx-0 md:max-w-none md:grid-cols-2'>
					{pageGuides.map((post) => (
						<Doc
							key={post.link}
							post={post}
						/>
					))}
				</div>
			</SubSection>
		</Section>
	)
}

const Doc = ({
	post,
}: {
	post: {
		link: string
		subtitle?: string
		title: string
	}
}) => (
	<div
		key={post.link}
		className='grid grid-cols-[auto_1fr] items-start gap-4'>
		<div className='mt-1'>
			{post.subtitle === 'Checklist' ?
				<Icon
					IconName='CheckIcon'
					className='h-6 w-6 text-green-600'
				/>
			: post.subtitle === 'Guide' ?
				<Icon
					IconName='BookLibraryIcon'
					className='text-brand-bright h-6 w-6'
				/>
			:	<Icon
					IconName='InfoCircleIcon'
					className='h-6 w-6 text-zinc-600'
				/>
			}
		</div>
		<div>
			<a
				href={post.link}
				className='text-lg/1 font-semibold text-zinc-900 hover:underline dark:text-zinc-100'>
				{post.title}
			</a>
			{post.subtitle && (
				<p className='mt-0 text-sm text-zinc-600 dark:text-zinc-400'>
					{post.subtitle}
				</p>
			)}
		</div>
	</div>
)
