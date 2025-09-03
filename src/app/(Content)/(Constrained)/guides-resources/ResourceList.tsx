import { Icon as IconEl, SubSection } from '~/components'
import { cn } from '~/lib/cn'
import { tResource } from './Resources'

export const ResourceLink = ({
	href,
	title,
	subtitle,
}: {
	href: string
	title: string
	subtitle: string
}) => (
	<div>
		<a
			href={href}
			className='text-lg/1 font-semibold text-zinc-900 hover:underline dark:text-zinc-100'>
			{title}
		</a>
		{subtitle && (
			<p className='mt-0 text-sm text-zinc-600 dark:text-zinc-400'>
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
				className='text-brand-bright h-6 w-6'
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
}: {
	href: string
	title: string
	subtitle?: string
	type?: string
	Icon?: tResource[string]['links'][number]['Icon']
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
		<SubSection
			title={sectionTitle}
			className='mb-8'>
			<div className='mx-auto my-10 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 md:mx-0 md:max-w-none md:grid-cols-2'>
				{resourceArray.map((post) => (
					<Resource
						key={post.href}
						href={post.href}
						title={post.title}
						subtitle={post.subtitle}
						type={post.type}
						Icon={post.Icon}
					/>
				))}
			</div>
		</SubSection>
	)
}
