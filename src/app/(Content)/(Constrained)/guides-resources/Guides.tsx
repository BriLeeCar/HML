'use client'

import { Icon, Section, SectionHeading } from '~/components'
export const GuidesContent = ({
	pdfGuides,
}: {
	pdfGuides: Array<{ title: string; link: string; type: string }>
}) => {
	const pageGuides = [
		{
			title: 'Claiming Asylum',
			subtitle: 'What It Means and Where to Start',
			link: '/claiming-asylum',
			type: 'reading',
		},
		{
			title: 'Get Ready to Leave',
			subtitle: 'Essential Steps from Planning to Packing',
			link: '/get-ready-to-leave',
			type: 'guide',
		},
	]

	const allReadings = [...pdfGuides, ...pageGuides]
		.map((item) => item)
		.sort((a, b) => a.type.localeCompare(b.type)) as Array<{
		file: string
		link: string
		title: string
		subtitle?: string
		type: string
	}>

	return (
		<Section>
			<SectionHeading
				id='guides'
				eyebrow='How-To Guides & Resources'
				subtitle='We know this process can be overwhelming. These guides are designed to help you navigate the complexities of planning your evacuation, offering practical advice and insights to empower your journey.'>
				Hope this helps
			</SectionHeading>
			<div className='mx-auto my-10 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 md:mx-0 md:max-w-none md:grid-cols-2'>
				{allReadings.map((post) => (
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
				))}
			</div>
		</Section>
	)
}
