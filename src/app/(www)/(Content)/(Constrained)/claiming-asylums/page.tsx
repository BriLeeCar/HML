import { cn } from '~/lib'
import { currentPath } from '../_lib/cwd'

const meta = {
	title: 'Claiming Asylum',
	subtitle: 'What It Means and Where to Start',
	path: currentPath() + 'claiming-asylums',
}

const ClaimingAsylumPage = () => {
	return (
		<main className='mx-auto my-6 flex max-w-3xl flex-col gap-8 rounded-xl bg-black/8 px-12 pt-6 pb-12'>
			<Heading
				level={1}
				heading={meta.title}
				subtitle={meta.subtitle}
			/>
			<Heading
				level={2}
				heading={"What Asylum is...and what it isn't"}
				subtitle={
					'If your main concern is safety from persecution or harm, asylum may be the right pathway.'
				}
			/>
		</main>
	)
}

const Heading = ({
	heading,
	subtitle,
	level,
}: {
	level: 1 | 2 | 3 | 4
	heading: ReactNode
	subtitle: ReactNode
}) => {
	return (
		<hgroup
			className={cn(
				'flex flex-col gap-2',
				'has-data-[level="1"]:*:data-[slot="subtitle"]:text-xl/relaxed',
				'has-data-[level="2"]:*:data-[slot="subtitle"]:text-lg/relaxed'
			)}>
			<div
				data-slot='heading'
				data-level={level}
				aria-level={level}
				aria-roledescription='Heading'
				className={cn(
					'text-foreground mt-2 font-semibold text-pretty capitalize italic',
					'data-[level="1"]:text-7xl data-[level="1"]:[font-variant:petite-caps]',
					'data-[level="2"]:text-4xl data-[level="2"]:font-normal data-[level="2"]:not-italic',
					'data-[level="3"]:text-2xl',
					'data-[level="4"]:text-lg'
				)}>
				{heading}
			</div>
			<Subtitle>{subtitle}</Subtitle>
		</hgroup>
	)
}

const Subtitle = ({ children }: Props) => {
	return (
		<p
			data-slot='subtitle'
			className={cn('text-hml-grey-300 pl-8 font-light text-balance italic')}>
			{children}
		</p>
	)
}

export default ClaimingAsylumPage
