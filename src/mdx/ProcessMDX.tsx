import { type MDXRemoteProps } from 'next-mdx-remote-client/rsc';
import { Suspense } from 'react';
import { Loading, mdxComponents } from '~/components';
import { getPrelimSource, getSourceRaw } from './getSource';
import { MDXProvider } from './MDXProvider';

export class MDXProcessor {
	public sourceType: 'path' | 'raw';
	public raw: string;
	title: string = '';
	frontmatter: Record<string, unknown> = {};
	components: MDXRemoteProps['components'] = mdxComponents;

	constructor(public source: MDXRemoteProps['source']) {
		this.sourceType = this.setType(source);
		this.raw = this.setRaw(source);
	}

	removeTitle = () => {
		const titleRegex = /^(#\s+)(.*)$/m; // Matches the first line starting with a single '#'
		this.title = (this.raw as string).match(titleRegex)?.[2] || '';
		this.raw = (this.raw as string).replace(titleRegex, '').replace(/^\n+/, '');
		return this;
	};

	private setType = (source: MDXRemoteProps['source']) => {
		const prelimType =
			Array.isArray(source) || String(source).endsWith('mdx') ? 'path' : 'raw';

		if (prelimType == 'path') {
			return getPrelimSource(prelimType, source as string) as 'path';
		}
		return prelimType;
	};

	private setRaw = (source: MDXRemoteProps['source']) => {
		const { frontmatter, raw } = getSourceRaw(
			this.sourceType,
			source as string,
		);
		this.frontmatter = frontmatter as Record<string, string | string[]>;
		this.processTags();
		this.raw = raw;
		return this.raw;
	};

	setComponents = (components: MDXRemoteProps['components']) => {
		this.components = {
			...this.components,
			...components,
		};
	};

	processTags = () => {
		if (this.frontmatter.tags) {
			this.frontmatter.tags = Array.isArray(this.frontmatter.tags)
				? this.frontmatter.tags
				: typeof this.frontmatter.tags == 'string'
					? this.frontmatter.tags.split(',').map((tag) => tag.trim())
					: this.frontmatter.tags;
			const newBaseTags = [] as Array<string | Record<string, string>>;
			(this.frontmatter.tags as string[]).forEach((tag) => {
				if (tag.includes('/')) {
					const [base, ...rest] = tag.split('/');
					!newBaseTags.includes(base) && newBaseTags.push(base.trim());
					newBaseTags.push({
						[base]: rest.join('/').trim(),
					});
				} else {
					newBaseTags.push(tag);
				}
			});
			this.frontmatter.tags = newBaseTags;
		}
	};

	Provider = () => {
		return (
			<Suspense fallback={<Loading />}>
				<MDXProvider
					source={this.raw}
					options={{ parseFrontmatter: true }}
					components={this.components}
				/>
			</Suspense>
		);
	};
}
