import { mdxAnnotations } from 'mdx-annotations'
import callouts from 'rehype-callouts'
import gfm from 'remark-gfm'
import { customCallouts } from './callouts'

export const remarkPlugins = [
	mdxAnnotations.remark,
	[
		gfm,
		{
			firstLineBlank: true,
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
