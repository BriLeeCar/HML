import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Fragment } from 'react'
import {
	Icon,
	Page,
	PageHeading,
	Section,
	Tag,
} from '~/components/index'
import { cn } from '~/lib/cn'
import { toShortDate } from '~/lib/date'
import type { RouterOutput, zSocial } from '~/server/api/zod'
import { api } from '~/trpc/server'

const TestPage = async () => {
	const blogPost = await api.blogPost.page({ id: 2 })

	// console.log(blogPost?.contentHTML)
	if (!blogPost) redirect('/not-found')

	const { name, subtitle, author, contentHTML, tags } = blogPost
	return (
		<Page>
			<PageHeading
				eyebrow={author ? <Brow blogPost={blogPost} /> : <></>}
				subtitle={
					<>
						{subtitle}
						<span className='flex items-center justify-start px-10 py-2'>
							{tags && (
								<span className='flex flex-wrap justify-end gap-2'>
									{tags.map((tag) => (
										<Fragment key={tag.tag.id}>
											{tag.tag.name && <Tag tag={tag.tag.name} />}
										</Fragment>
									))}
								</span>
							)}
						</span>
					</>
				}>
				{name}
			</PageHeading>
			<Section>
				{/* 
				{blogPost.image && (
					<figure className='relative mx-auto mb-6 block aspect-video w-[90%]'>
                        <Image
								src={frontmatter.image.url}
								alt={frontmatter.title || title}
								style={{
									objectFit: 'cover',
								}}
								fill
								className='rounded-md'
								priority
							/> */}
				{/* <figcaption className='text-muted-foreground absolute top-full left-0 px-2 text-center text-sm italic'>
								{frontmatter.image.alt}
							</figcaption> 
					</figure>
				)}
                            */}
				<div dangerouslySetInnerHTML={{ __html: contentHTML }} />
			</Section>
		</Page>
	)
}

export default TestPage

const Brow = ({
	blogPost,
}: {
	blogPost: NonNullable<RouterOutput<'blogPost', 'page'>>
}) => {
	const { author } = blogPost

	return (
		<span className='flex items-center gap-8 text-sm'>
			<span>
				Written By{' '}
				<strong>
					{author.firstName ?
						[author.firstName, author.lastName].join(' ')
					:	author.name}
				</strong>
				, on{' '}
				{blogPost.createdAt ?
					toShortDate(blogPost.createdAt)
				:	'Unknown Date'}
			</span>
			{Object.keys(author ?? []).length > 1 && (
				<span className='flex gap-4'>
					{author.socials
						&& author.socials.map((social) => (
							<SocialIcon
								key={`${author.id}-${social.social.name}`}
								socials={
									social as unknown as {
										handle: string
										social: zSocial
									}
								}
							/>
						))}
				</span>
			)}
		</span>
	)
}

const SocialIcon = ({
	socials,
}: {
	socials: {
		handle: string
		social: zSocial
	}
}) => {
	const { social } = socials

	return (
		<Link
			href={social.profileLinkFormat.replace(
				'[HANDLE]',
				socials.handle
			)}
			className={cn('hover:opacity-50')}
			style={{
				color: social.lightModeColor,
			}}
			aria-label={`${social.name} Profile`}
			title={`${social.name} Profile`}
			target='_blank'
			rel='noopener'>
			<Icon
				IconName={social.icon as IconKey}
				className='h-4 w-4'
			/>
		</Link>
	)
}
