import { IconLogo } from '@/admin/_components/layout/Logo'
import Link from 'next/link'
import { linkGroups } from 'www/_lib/navLinks'
import { socials } from 'www/_lib/socials'
import { Icon } from '~/components/Icon'
import { InlineLink } from '~/components/Text/Link'
import { cn } from '~/lib/cn'

export const Footer = () => {
	return (
		<FooterWrapper>
			<FooterMainSection>
				<FooterBrand />
				<FooterLinkWrapper>
					{linkGroups.map((grp, index) => (
						<menu
							key={index}
							role='list'
							className='space-y-2'>
							{grp.links.map(item => (
								<li key={item.title}>
									<InlineLink
										target={item.target}
										href={item.href}
										className='decoration-hml-slate-400 text-xs text-current/75 decoration-[1.5px] dark:text-current'>
										{item.title}
									</InlineLink>
								</li>
							))}
						</menu>
					))}
				</FooterLinkWrapper>
			</FooterMainSection>
			<FooterBottom />
		</FooterWrapper>
	)
}

const FooterWrapper = ({ children }: { children: React.ReactNode }) => (
	<footer
		className='bg-card border-t-foreground/5 dark:bg-hml-slate-900 w-full pt-8 dark:border-t'
		style={{
			boxShadow:
				'0px -3px 6px 0px light-dark(rgb(85 85 85 / 4%), rgb(0 0 0 / 4%)), 0px -1px 6px 0px light-dark(rgb(85 85 85 / 6%), rgb(0 0 0 / 6%))',
		}}>
		<div className='mx-auto flex max-w-full flex-col gap-y-8'>{children}</div>
	</footer>
)

const FooterMainSection = ({ children }: { children: ReactNode }) => {
	return (
		<div
			className={cn(
				'mx-auto grid w-full grid-cols-1 items-end space-y-8 px-6 md:max-w-7xl md:grid-cols-[auto_1fr] md:items-center md:space-y-0 md:*:my-0',
				'lg:grid-rows-[auto_1fr] lg:justify-around lg:gap-x-8 lg:px-40'
			)}>
			{children}
		</div>
	)
}

const FooterBrand = () => (
	<div className='flex items-center justify-center gap-8 md:flex-col lg:gap-4'>
		<p
			className={cn(
				'dark:border-b-transparent dark:text-current',
				'text-hml-mulberry border-b-hml-red-400',
				'border-b px-8 text-3xl tracking-tight italic',
				'md:border-b-0 lg:text-center lg:text-2xl'
			)}>
			You are <span className='dark:text-hml-yellow font-bold'>not</span> alone.
		</p>
		<FooterLogo />
	</div>
)

const FooterLogo = () => {
	return <IconLogo className='text-hml-red dark:text-hml-yellow-500 hidden h-auto w-1/3 md:block' />
}

const FooterLinkWrapper = ({ children }: { children: ReactNode }) => {
	return <nav className='flex w-full justify-evenly gap-16 text-center md:mt-16'>{children}</nav>
}

const FooterBottom = () => {
	return (
		<span className='bg-card dark:bg-hml-slate dark:text-hml-yellow text-hml-mulberry flex items-center justify-between p-6 italic'>
			<small className='flex grow flex-wrap justify-center gap-x-2 text-center text-xs/6'>
				<span>&copy; {new Date().getFullYear()} Help Me Leave.</span>{' '}
				<span>All rights reserved.</span>
			</small>
			<span className='flex gap-x-6'>
				{socials.map(item => (
					<Link
						key={item.name}
						href={item.href}>
						<span className='sr-only'>{item.name}</span>
						<Icon
							IconName={item.type as keyof typeof Icon}
							className='size-6'
							style={{
								color: item.color,
							}}
							aria-hidden='true'
						/>
					</Link>
				))}
			</span>
		</span>
	)
}
