import {
	Basics,
	Briefcase,
	Confetti,
	Home,
	Medical,
	Pathways,
	PiggyBank,
} from '@/(Content)/_Layout/SVG'
import Link from 'next/link'
import { ReactNode } from 'react'
import { cn } from '~/lib/cn'

export const SubMenu = ({
	country,
	active,
}: {
	country: string
	active?: string
}) => {
	const links = [
		{
			text: 'Basics',
			link: `${country}`,
			icon: Basics,
		},
		{
			text: 'Pathways',
			link: `${country}?section=pathways`,
			icon: Pathways,
		},
		{
			text: 'Economy',
			link: `${country}?section=economy`,
			icon: PiggyBank,
		},
		{
			text: 'Social',
			link: `${country}?section=social`,
			icon: Confetti,
		},
		{
			text: 'Employment',
			link: `${country}?section=employment`,
			icon: Briefcase,
		},
		{
			text: 'Housing',
			link: `${country}?section=housing`,
			icon: Home,
		},
		{
			text: 'Medical',
			link: `${country}?section=medical`,
			icon: Medical,
		},
	]

	return (
		<div className='inline-flex w-full flex-wrap items-center justify-evenly'>
			{links.map((item) => (
				<SubMenuItem
					key={item.text}
					text={item.text}
					link={item.link}
					Icon={item.icon}
					active={active == item.link.split('=')[1]}
				/>
			))}
		</div>
	)
}

const SubMenuItem = ({
	text,
	link,
	Icon,
	active = false,
}: {
	text: string
	link: string
	Icon: ({ ...props }) => ReactNode
	active?: boolean
}) => {
	return (
		<Link
			href={link}
			className={cn(
				'bg-card text-card-foreground border-border hover:bg-background hover:text-foreground flex items-center gap-1 rounded-md border-1 px-2 py-1 shadow-xs transition-all',
				active
					&& 'text-background bg-zinc-700 italic hover:bg-zinc-700 hover:text-white dark:bg-red-900 dark:text-white hover:dark:bg-red-900'
			)}>
			<Icon
				className={cn(
					'in-[a:hover]:text-foreground in-[a:hover]:fill-foreground text-zinc-400 transition-all dark:text-zinc-400',
					active
						&& 'text-white in-[a:hover]:text-white dark:text-white'
				)}
			/>
			<div className='justify-center text-xs font-semibold uppercase'>
				{text}
			</div>
		</Link>
	)
}
