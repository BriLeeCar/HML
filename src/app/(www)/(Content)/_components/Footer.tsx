import { IconLogo } from '@/admin/_components/layout/Logo'
import { linkGroups } from 'www/_lib/navLinks'
import { socials } from 'www/_lib/socials'
import { Bold, Icon } from '~/components'
import { cn } from '~/lib'

const NavSection = ({
	linkGroup,
	...props
}: Props & { linkGroup: (typeof linkGroups)[number] }) => {
	return (
		<div {...props}>
			<h3 className='text-sm/6 font-semibold text-gray-900 dark:text-white'>{linkGroup.title}</h3>
			<ul
				style={{
					marginTop: 'calc(var(--spacing) * 6) !important',
				}}
				role='list'
				className='mt-6! space-y-4'>
				{linkGroup.links.map(item => (
					<li key={item.title}>
						<a
							target={item.target}
							href={item.href}
							className='text-foreground/75 hover:text-foreground px-4 py-2 text-sm/6 underline decoration-current/25 underline-offset-2 hover:no-underline'>
							{item.title}
						</a>
					</li>
				))}
			</ul>
		</div>
	)
}

export const Footer = () => {
	return (
		<footer className='bg-hml-grey/20 dark:bg-black/7'>
			<div className='mx-auto flex max-w-7xl flex-col gap-y-0 px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-14'>
				<FooterLogoLinks />
				<FooterBottom />
			</div>
		</footer>
	)
}

const FooterLogoLinks = () => {
	const joinedGroups = linkGroups.reduce(
		(resultArray, item, index) => {
			const chunkIndex = Math.floor(index / 2)

			if (!resultArray[chunkIndex]) {
				resultArray[chunkIndex] = [] // start a new chunk
			}

			resultArray[chunkIndex].push(item)

			return resultArray
		},
		[] as Array<typeof linkGroups>
	)

	return (
		<div className='grid grid-cols-1 items-end space-y-8 md:grid-cols-[auto_1fr] lg:grid-rows-1 lg:justify-around lg:gap-x-8 lg:px-40'>
			<FooterLogo />

			<FooterLinks joinedGroups={joinedGroups} />
		</div>
	)
}

const FooterLogo = () => (
	<div className='flex items-center justify-center gap-8 md:flex-col lg:max-w-40 lg:grow lg:justify-end lg:gap-2'>
		<IconLogo className='text-hml-red dark:text-hml-mulberry h-auto w-fit max-w-1/5 md:max-w-32' />
		<p className='text-hml-mulberry text-2xl text-balance lg:text-lg lg:font-normal lg:italic dark:text-current'>
			You are <Bold className='dark:text-hml-red-300 underline decoration-current/50'>not</Bold>{' '}
			alone.
		</p>
	</div>
)

const FooterLinks = ({ joinedGroups }: { joinedGroups: (typeof linkGroups)[] }) => {
	return (
		<div className='flex justify-center gap-16 text-center md:mt-16 lg:mt-0 lg:grid lg:grow lg:gap-8'>
			{joinedGroups.map(group => (
				<div
					key={group[0].title}
					className={cn('flex', 'md:gap-8')}>
					{group.map((grp, i) =>
						i % 2 === 0 ?
							<NavSection
								key={grp.title}
								linkGroup={grp}
							/>
						:	<NavSection
								key={grp.title}
								linkGroup={grp}
							/>
					)}
				</div>
			))}
		</div>
	)
}

const FooterBottom = () => {
	return (
		<span className='border-foreground/10 mt-16 flex items-center justify-between border-t pt-8 sm:mt-20 lg:mt-24'>
			<small className='text-foreground/75 text-sm/6'>
				&copy; {new Date().getFullYear()} Help Me Leave. All rights reserved.
			</small>
			<span className='flex gap-x-6'>
				{socials.map(item => (
					<a
						key={item.name}
						href={item.href}
						className='text-foreground/75 hover:text-foreground'>
						<span className='sr-only'>{item.name}</span>
						<Icon
							IconName={item.type as keyof typeof Icon}
							className='size-6'
							style={{
								color: item.color,
							}}
							aria-hidden='true'
						/>
					</a>
				))}
			</span>
		</span>
	)
}
