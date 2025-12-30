import flexibleMarkers from 'remark-flexible-markers'
import gfm from 'remark-gfm'

export const remarkPlugins = [
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

export const rehypePlugins = []

export const recmaPlugins = []
