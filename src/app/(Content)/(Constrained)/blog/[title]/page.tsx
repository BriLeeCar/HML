import { readdirSync, readFileSync } from 'fs'
import { getFrontmatter } from 'next-mdx-remote-client/utils'
import Image from 'next/image'
import path from 'path'
import {
	Icon,
	Link,
	mdxComponents,
	Page,
	PageHeading,
	Section,
	Tag,
} from '~/components'
import { cn } from '~/lib/cn'
import { MDXProvider } from '~/lib/mdx'
import { toTitleCase } from '~/lib/text'

export const generateStaticParams = async () => {
	const blogDir = path.join(process.cwd(), 'src', 'data', 'blog')
	const files = readdirSync(blogDir, 'utf-8')
	const fileNames = files
		.toString()
		.split('\n')
		.filter((file) => file.endsWith('.mdx'))
		.map((file) => file.replace('.mdx', ''))

	return fileNames.map((title) => ({ title }))
}

type tFrontMatter = {
	subtitle: string
	date: string
	image?: {
		url: string
		alt: string
	}
	author?: {
		name: string
		TikTok?: string
		BlueSky?: string
	}
	title?: string
	tags?: string[]
}

const SocialIcon = ({
	author,
	name,
}: {
	author: tFrontMatter['author']
	name: keyof tFrontMatter['author']
}) => {
	const url =
		name === 'TikTok' ? `https://www.tiktok.com/@${author?.[name]}`
		: name === 'BlueSky' ?
			`https://bsky.app/profile/${author?.[name]}`
		:	'#'

	const icon =
		name === 'TikTok' ? 'TikTokIcon'
		: name === 'BlueSky' ? 'BlueSkyIcon'
		: 'GlobeIcon'

	return (
		<Link
			href={url}
			className={cn(
				'hover:opacity-50',
				name == 'BlueSky' && 'text-[#0385ff]',
				name == 'TikTok' && 'text-foreground'
			)}
			aria-label={name}
			title={name}
			target='_blank'
			rel='noopener'>
			<Icon
				IconName={icon as keyof typeof Icon}
				className='h-4 w-4'
			/>
		</Link>
	)
}

const Brow = ({ frontmatter }: { frontmatter: tFrontMatter }) => (
	<span className='flex items-center gap-8 text-sm'>
		<span>
			Written By <strong>{frontmatter.author?.name}</strong>, on
			{' '
				+ new Date(frontmatter.date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				})}
		</span>
		{Object.keys(frontmatter.author ?? []).length > 1 && (
			<span className='flex gap-4'>
				{Object.keys(frontmatter.author ?? [])
					.filter((key) => key !== 'name')
					.map((key) => (
						<SocialIcon
							key={key}
							name={key as keyof tFrontMatter['author']}
							author={frontmatter.author}
						/>
					))}
			</span>
		)}
	</span>
)

const BlogEntry = async ({
	params,
}: {
	params: Promise<{ title: string }>
}) => {
	const { title } = await params

	const data = readFileSync(
		path.join(process.cwd(), 'src', 'data', 'blog', title + '.mdx'),
		'utf-8'
	)

	const { frontmatter } = getFrontmatter(data) as {
		frontmatter: tFrontMatter
	}

	return (
		<Page>
			<PageHeading
				eyebrow={
					frontmatter.author ?
						<Brow frontmatter={frontmatter} />
					:	<></>
				}
				subtitle={
					<>
						{frontmatter.subtitle}
						<span className='flex items-center justify-start px-10 py-2'>
							{frontmatter.tags && frontmatter.tags.length > 0 && (
								<span className='flex flex-wrap justify-end gap-2'>
									{frontmatter.tags.map((tag) => (
										<Tag
											key={tag}
											tag={tag}
										/>
									))}
								</span>
							)}
						</span>
					</>
				}>
				{toTitleCase(title.replace(/-/g, ' '))}
			</PageHeading>
			<Section>
				{frontmatter.image && (
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
						/>
						<figcaption className='text-muted-foreground absolute top-full left-0 px-2 text-center text-sm italic'>
							{frontmatter.image.alt}
						</figcaption>
					</figure>
				)}

				<MDXProvider
					components={mdxComponents()}
					options={{
						parseFrontmatter: true,
						removeTitle: true,
					}}
					source={data}
				/>
			</Section>
		</Page>
	)
}

export default BlogEntry
