import type Link from 'next/link'

export const socials = [
	{
		name: 'Discord',
		type: 'DiscordIcon',
		href: 'https://discord.gg/TcHKRgED6y',
		color: '#7289da',
	},
] as {
	name: string
	type: IconKey
	href: typeof Link.prototype.href
	color: string
}[]
