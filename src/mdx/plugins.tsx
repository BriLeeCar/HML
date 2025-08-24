import { mdxAnnotations } from 'mdx-annotations'
import callouts from 'rehype-callouts'
import gfm from 'remark-gfm'
import { customCallouts } from './callouts'

export const remarkPlugins = [
	// eslint-disable-next-line  @typescript-eslint/unbound-method
	mdxAnnotations.remark,
	[
		gfm,
		{
			firstLineBlank: true,
		},
	],
]

export const rehypePlugins = [
	// eslint-disable-next-line  @typescript-eslint/unbound-method
	mdxAnnotations.rehype,
	[
		callouts,
		{
			theme: 'obsidian',
			callouts: customCallouts,
		},
	],
]

// eslint-disable-next-line  @typescript-eslint/unbound-method
export const recmaPlugins = [mdxAnnotations.recma]
