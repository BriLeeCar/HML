import { type MDXRemoteProps } from 'next-mdx-remote-client/rsc'
import { Suspense } from 'react'
import { Loading, mdxComponents } from '~/components'
import {
	getPrelimSource,
	getSourceRaw,
	MDXProvider,
	recmaPlugins,
	rehypePlugins,
	remarkPlugins,
} from '~/lib/mdx'

interface iMDXProcessor {
	sourceType: 'path' | 'raw'
	raw: string
	title: string
	frontmatter: Record<string, unknown>
	components: MDXRemoteProps['components']
	plugins: Record<PluginKeys, unknown[]>
	removeTitle: () => this
	setComponents: (components: MDXRemoteProps['components']) => this
	processTags: () => void
}

export class MDXProcessor {
	public sourceType
	public raw
	title: iMDXProcessor['title'] = ''
	frontmatter: iMDXProcessor['frontmatter'] = {}
	components: MDXRemoteProps['components'] = mdxComponents
	plugins: iMDXProcessor['plugins'] = {} as iMDXProcessor['plugins']

	constructor(
		public source: MDXRemoteProps['source'],
		type?: 'path' | 'raw'
	) {
		this.sourceType = type ?? setType(source)
		this.raw = setRaw(this, source as string)
	}

	removeTitle = (): this => {
		const titleRegex = /^(#\s+)(.*)$/m // Matches the first line starting with a single '#'

		const title = this.raw.match(titleRegex)?.[2] || ''
		this.title = (this.frontmatter.title as string) || title.trim()

		this.raw = this.raw.replace(titleRegex, '').replace(/^\n+/, '')

		return this
	}

	setComponents = (
		components?: MDXRemoteProps['components']
	): this => {
		if (!components) return this
		this.components = {
			...this.components,
			...components,
		}
		return this
	}

	addPlugin = (
		plugins?: MDXProcessor['plugins'],
		pluginType?: 'recmaPlugins' | 'remarkPlugins' | 'rehypePlugins'
	) => {
		this.plugins = setPlugins(this, plugins, pluginType)
		return this
	}

	processTags = (): void => {
		if (this.frontmatter.tags) {
			this.frontmatter.tags =
				Array.isArray(this.frontmatter.tags) ? this.frontmatter.tags
				: typeof this.frontmatter.tags == 'string' ?
					this.frontmatter.tags.split(',').map((tag) => tag.trim())
				:	this.frontmatter.tags
			const newBaseTags = [] as Array<string | Record<string, string>>
			;(this.frontmatter.tags as string[]).forEach((tag) => {
				if (tag.includes('/')) {
					const [base, ...rest] = tag.split('/')
					!newBaseTags.includes(base) && newBaseTags.push(base.trim())
					newBaseTags.push({
						[base]: rest.join('/').trim(),
					})
				} else {
					newBaseTags.push(tag)
				}
			})
			this.frontmatter.tags = newBaseTags
		}
	}

	Provider = ({
		...props
	}: Omit<MDXRemoteProps, 'source'> & {
		components?: MDXRemoteProps['components']
		plugins?: Record<PluginKeys, unknown[]>
	}) => {
		this.setComponents(props.components)
		this.addPlugin(props.plugins)

		return (
			<Suspense fallback={<Loading />}>
				<MDXProvider
					source={this.raw}
					options={{
						parseFrontmatter: true,
						mdxOptions: {
							...(this.plugins as Record<string, unknown>),
						},
					}}
					components={this.components}
				/>
			</Suspense>
		)
	}
}

const setRaw = (processor: MDXProcessor, source: string): string => {
	const { frontmatter, raw } = getSourceRaw(
		processor.sourceType,
		source
	)

	processor.frontmatter = frontmatter as Record<
		string,
		string | string[]
	>
	processor.processTags()
	processor.raw = raw

	if (processor.frontmatter.title) {
		processor.title = processor.frontmatter.title as string
	}
	return processor.raw
}

const setType = (
	source: MDXRemoteProps['source']
): 'raw' | 'path' => {
	const prelimType =
		Array.isArray(source) || String(source).endsWith('mdx') ?
			'path'
		:	'raw'

	if (prelimType == 'path') {
		return getPrelimSource(prelimType, source as string) as 'path'
	}
	return prelimType
}

const setPlugins = (
	processor: MDXProcessor,
	plugins?: MDXProcessor['plugins'],
	pluginKey?: PluginKeys
) => {
	if (Object.keys(processor.plugins).length <= 0) {
		processor.plugins = {
			remarkPlugins: remarkPlugins,
			rehypePlugins: rehypePlugins,
			recmaPlugins: recmaPlugins,
		} as MDXProcessor['plugins']
	}
	if (!plugins) return processor.plugins

	if (pluginKey) {
		processor.plugins[pluginKey].push(
			...(plugins?.[pluginKey] as unknown[])
		)
		return processor.plugins
	} else {
		const keys = Object.keys(plugins) as PluginKeys[]

		keys.forEach((key) => {
			if (processor.plugins[key]) {
				processor.plugins[key]
					.filter((plug) => plug != plugins[key])
					.push(...(plugins ? (plugins[key] as unknown[]) : []))
			} else {
				processor.plugins[key] = plugins[key] as unknown[]
			}
		})
	}

	return processor.plugins
}

type PluginKeys = 'recmaPlugins' | 'remarkPlugins' | 'rehypePlugins'
