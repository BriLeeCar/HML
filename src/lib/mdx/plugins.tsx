import { mdxAnnotations } from 'mdx-annotations'
import callouts from 'rehype-callouts'
import flexibleMarkers from 'remark-flexible-markers'
import gfm from 'remark-gfm'
import { customCallouts } from '~/lib/mdx'

export const remarkPlugins = [
	mdxAnnotations.remark,
	[
		gfm,
		{
			firstLineBlank: true,
		},
	],
	[
		flexibleMarkers,
		{
			markerClassName: (color: string) => {
				return [
					`bg-transparent decoration-${color ?? 'yellow'}-500/25 text-muted-foreground font-mono text-sm inline underline decoration-3 underline-offset-3 px-2 italic pb-0`,
				]
			},
		},
	],
]

export const rehypePlugins = [
	mdxAnnotations.rehype,
	[
		callouts,
		{
			theme: 'obsidian',
			callouts: customCallouts,
		},
	],
]

export const recmaPlugins = [mdxAnnotations.recma]
