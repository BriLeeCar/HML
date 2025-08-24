import { readFileSync } from 'fs'
import { getFrontmatter } from 'next-mdx-remote-client/utils'
import Image from 'next/image'
import path from 'path'
import { Heading, HGroup } from '~/components/Heading'
import { mdxComponents } from '~/components/MDX'
import { Section } from '~/components/Section'
import { Tag } from '~/components/Tag'
import { MDXProvider } from '~/MDX/MDXProvider'
import { toTitleCase } from '~/util/text'

const BlogEntry = async ({
	params,
}: {
	params: Promise<{ title: string }>
}) => {
	const { title } = await params

	const data = readFileSync(
		path.join(
			process.cwd(),
			'src',
			'data',
			'blog',
			(title as string) + '.mdx'
		),
		'utf-8'
	)

	const { frontmatter } = getFrontmatter(data) as {
		frontmatter: {
			subtitle: string
			date: string
			image?: {
				url: string
				alt: string
			}
			title?: string
			tags?: string[]
		}
	}

	return (
		<div className='relative mx-auto max-w-3xl pt-4'>
			<span className='mb-2 flex items-center justify-between px-10'>
				<time className='text-muted-foreground block text-xs font-medium italic'>
					{new Date(frontmatter.date).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
				</time>
				{frontmatter.tags && frontmatter.tags.length > 0 && (
					<div className='flex flex-wrap justify-end gap-2'>
						{frontmatter.tags.map((tag) => (
							<Tag
								key={tag}
								tag={tag}
							/>
						))}
					</div>
				)}
			</span>
			<Section>
				{frontmatter.subtitle ?
					<HGroup>
						<HGroup.Head level={1}>
							{toTitleCase(title.replace(/-/g, ' '))}
						</HGroup.Head>
						<HGroup.Sub>{frontmatter.subtitle}</HGroup.Sub>
					</HGroup>
				:	<Heading
						level={2}
						size='title'>
						{toTitleCase(title.replace(/-/g, ' '))}
					</Heading>
				}
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
					components={mdxComponents}
					options={{
						parseFrontmatter: true,
						removeTitle: true,
					}}
					source={data}
				/>
			</Section>
		</div>
	)
}

export default BlogEntry
