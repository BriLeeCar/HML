import { readFileSync } from 'fs'
import { getFrontmatter } from 'next-mdx-remote-client/utils'
import path from 'path'
import { Heading } from '~/components/Heading'
import { mdxComponents } from '~/components/MDX'
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
		}
	}

	return (
		<div className='mx-auto max-w-3xl px-4 py-8'>
			{frontmatter.subtitle ?
				<hgroup>
					<Heading
						level={2}
						size='title'>
						{toTitleCase(title.replace(/-/g, ' '))}
					</Heading>
					<p className='font-serif text-xl font-thin opacity-75'>
						{frontmatter.subtitle}
					</p>
				</hgroup>
			:	<Heading
					level={2}
					size='title'>
					{toTitleCase(title.replace(/-/g, ' '))}
				</Heading>
			}
			<p className='my-6 border-y-2 text-center text-sm text-zinc-500 italic'>
				Written {new Date(frontmatter.date).toDateString()}
			</p>
			<MDXProvider
				components={mdxComponents}
				options={{
					parseFrontmatter: true,
					removeTitle: true,
				}}
				source={data}
			/>
		</div>
	)
}

export default BlogEntry
