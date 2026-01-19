import { InlineLink } from '@/admin/_components/Link'
import { Icon as IconEl } from '~/components/Icon'
import { Subsection, SubsectionContent, SubsectionHeading } from '~/components/Structure/Subsection'
import { cn } from '~/lib/cn'
import type { tResource } from '..'

export const ResourceLink = ({
	href,
	title,
	subtitle,
	author,
	date,
	target,
}: {
	href: string
	title: string
	subtitle: string
	author?: string
	date?: string
	target?: string
}) => (
	<div>
		<InlineLink
			href={href}
			className='text-foreground text-lg/1 font-semibold hover:underline dark:text-zinc-100'
			target={target}>
			{title}
		</InlineLink>
		{subtitle && (
			<p className='mt-0 text-sm text-zinc-600 dark:text-zinc-400'>
				{author || date ?
					<span className='block font-semibold text-balance italic dark:text-zinc-200'>
						{author && author}
						{date && author && ' • '}
						{date && date}
					</span>
				:	<></>}
				{subtitle}
			</p>
		)}
	</div>
)

export const ResourceIcon = ({ type }: { type: string }) => (
	<div className='mt-1'>
		{type === 'checklist' ?
			<IconEl
				IconName='CheckIcon'
				className='h-6 w-6 text-green-600'
			/>
		: type === 'guide' ?
			<IconEl
				IconName='BookLibraryIcon'
				className='text-hml-red h-6 w-6'
			/>
		:	<IconEl
				IconName='InfoCircleIcon'
				className='h-6 w-6 text-zinc-600'
			/>
		}
	</div>
)

export const Resource = ({
	href,
	title,
	subtitle,
	type,
	Icon,
	author,
	date,
	target,
}: {
	href: string
	title: string
	subtitle?: string
	type?: string
	date?: string
	author?: string
	Icon?: tResource[string]['links'][number]['Icon']
	target: string
}) => {
	return (
		<div
			key={href}
			className='grid grid-cols-[auto_1fr] items-start gap-4'>
			{Icon ?
				<IconEl
					IconName={Icon.name}
					className={cn('size-6', Icon.color)}
				/>
			:	<ResourceIcon type={type || ''} />}
			<ResourceLink
				href={href}
				title={title}
				subtitle={subtitle || ''}
				author={author}
				date={date}
				target={target}
			/>
		</div>
	)
}

export const ResourceSection = ({
	resourceArray,
	sectionTitle,
}: {
	sectionTitle: string
	resourceArray: tResource[string]['links']
}) => {
	return (
		<Subsection>
			<SubsectionHeading>{sectionTitle}</SubsectionHeading>
			<SubsectionContent className='grid auto-rows-fr grid-cols-1 gap-8 md:mx-0 md:max-w-none md:grid-cols-2'>
				{resourceArray.map(post => (
					<Resource
						key={post.href}
						href={post.href}
						title={post.title}
						subtitle={post.subtitle}
						type={post.type}
						Icon={post.Icon}
						author={post.author}
						date={post.date}
						target={post.target || '_self'}
					/>
				))}
			</SubsectionContent>
		</Subsection>
	)
}
