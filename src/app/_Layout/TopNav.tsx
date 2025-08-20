import { Icon } from '~/components/Icon'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '~/components/ui'

const navLinks = [
	{
		name: 'Guides & Resources',
		href: '#',
	},
	{
		name: 'Visa & Citizenship Explorer',
		href: '#',
	},
	{
		name: 'Country Profiles',
		href: '#',
	},
]

const NavGroups = [
	{
		name: 'Guides & Resources',
		links: [
			{ name: 'Moving Checklist', href: '#' },
			{ name: 'REAL ID Renewal', href: '#' },
		],
	},
]

export const TopNav = () => {
	return (
		<span className='bg-background/85 fixed top-0 z-50 flex w-full items-center justify-between border-b px-6 backdrop-blur-sm print:hidden'>
			<Menu />

			<Icon
				IconName='MenuIcon'
				className='text-foreground click h-6 w-6'
			/>
		</span>
	)
}

const Menu = () => {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{NavGroups.map((group) => (
					<Group
						key={group.name}
						group={group}
						className='w-max whitespace-nowrap'
					/>
				))}
				<NavigationMenuIndicator />
			</NavigationMenuList>
		</NavigationMenu>
	)
}

const Group = ({
	group,
	...props
}: Props & {
	group: {
		name: string
		links: { name: string; href: string }[]
	}
}) => {
	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger className='click bg-transparent hover:bg-transparent active:bg-transparent'>
				{group.name}
			</NavigationMenuTrigger>
			<NavigationMenuContent {...props}>
				{navLinks.map((link) => (
					<NavigationMenuLink
						key={link.name}
						className='click'
						href={link.href}>
						{link.name}
					</NavigationMenuLink>
				))}
			</NavigationMenuContent>
		</NavigationMenuItem>
	)
}
