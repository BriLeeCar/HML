import { Books, Certificate, HeartMap, Mission, Support } from '../_components/SVG'
import { socials } from './socials'

export const links = [
	{
		text: 'Resource Map',
		Icon: HeartMap,
		href: '/map',
	},
	{
		text: 'Visa Explorer',
		Icon: Certificate,
		href: '/explorer',
	},
	{
		text: 'Guides & Resources',
		Icon: Books,
		href: '/guides-resources',
	},
	{
		text: 'Support Team',
		Icon: Support,
		href: '/support',
	},
	{
		text: 'Our Mission',
		Icon: Mission,
		href: '/our-mission',
	},
]

export const linkGroups = [
	{
		title: 'Information',
		links: [
			{
				title: 'Guides & Resources',
				href: '/guides-resources',
			},

			{
				title: 'Visa Explorer',
				href: '/explorer',
			},
			{
				title: 'World Map',
				href: '/map',
			},
		],
	},
	{
		title: 'Community',
		links: [
			{
				title: 'Our Mission',
				href: '/our-mission',
			},
			{
				title: 'Support Team',
				href: '/support',
			},
			{
				title: 'Discord Server',
				href: socials.find(s => s.name === 'Discord')?.href || '',
				target: '_blank',
			},
			{
				title: 'Volunteer Form',
				href: 'https://forms.clickup.com/90151711045/f/2kyqbwa5-2035/V90S8EIQNBHMTKXE4X',
				target: '_blank',
			},
		],
	},
]
