'use client'

import { Section, SectionHeading } from '@/(Content)/Components'
import Image from 'next/image'
export const BlogContent = ({
	blogPosts,
	...props
}: Props<'div'> & {
	blogPosts: {
		image: { url: string }
		title: string
		date: string
		author?: { name: string }
		file: string
	}[]
}) => {
	return (
		<Section>
			<SectionHeading
				eyebrow='Team Member Blogs'
				subtitle='We are people going through this process too. Here are some of our stories and reflections.'>
				What We Think
			</SectionHeading>
			<div
				{...props}
				className='mx-auto my-10 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 md:mx-0 md:max-w-none md:grid-cols-3'>
				{blogPosts.map((post) => (
					<article
						key={post.file}
						className='relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80 dark:bg-gray-800'>
						<Image
							alt=''
							src={post.image.url}
							fill
							sizes='225px'
							className='absolute inset-0 -z-10 size-full object-cover object-center'
						/>
						<div className='absolute inset-0 -z-10 bg-linear-to-t from-gray-900 via-gray-900/40 dark:from-black/80 dark:via-black/40' />
						<div className='absolute inset-0 -z-10 rounded-2xl inset-ring inset-ring-gray-900/10 dark:inset-ring-white/10' />

						<div className='flex flex-wrap items-center gap-y-0 overflow-hidden text-sm/6 text-gray-300'>
							<time
								dateTime={post.date}
								className='mr-8'>
								{new Date(post.date).toLocaleDateString()}
							</time>
							<div className='flex items-center gap-x-4 font-semibold'>
								{post.author?.name}
							</div>
						</div>
						<h3 className='mt-3 text-lg/6 font-semibold text-white'>
							<a href={`/blog/${post.file}`}>
								<span className='absolute inset-0' />
								{post.title}
							</a>
						</h3>
					</article>
				))}{' '}
			</div>
		</Section>
	)
}
