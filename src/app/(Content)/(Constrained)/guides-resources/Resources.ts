export const resources: tResource = {
	'Creating Community': {
		image: '',
		links: [
			{
				title: 'Join Our Discord',
				href: 'https://discord.gg/3UHPXjKs',
				subtitle: 'Connect with others going through this process',
				type: 'link',
				Icon: { name: 'DiscordIcon', color: 'text-indigo-500' },
			},
		],
	},
	'Asylum Information': {
		image: '',
		links: [
			{
				href: '/claiming-asylum',
				title: 'Claiming Asylum',
				subtitle: 'What It Means and Where to Start',
				type: 'reading',
			},
			{
				href: '/pdf/EU-Entrance-General-Information.pdf',
				title: 'EU Entrance',
				subtitle: 'General Information',
				type: 'guide',
			},
			{
				href: '/pdf/Asylum-Process-General.pdf',
				title: 'Asylum Process',
				subtitle: 'Overview',
				type: 'guide',
			},
			{
				href: '/pdf/Asylum-The-Criteria-The-Cautions-and-The-Experience.pdf',
				title: 'Asylum',
				subtitle: 'The Criteria, The Cautions, and The Experience',
				type: 'reading',
			},
			{
				href: '/pdf/Visa-or-Asylum-Summary-for-EU-countries.pdf',
				title: 'Visa or Asylum',
				subtitle: 'Summary for EU countries',
				type: 'reading',
			},
		],
	},
	'General Information': {
		image: '',
		links: [
			{
				title: 'Get Ready to Leave',
				href: '/get-ready-to-leave',
				subtitle: 'Essential Steps from Planning to Packing',
				type: 'guide',
			},
			{
				title: 'Get Your Documents Ready',
				href: '/pdf/Get-Your-Documents-Ready.pdf',
				subtitle: 'Checklist',
				type: 'checklist',
			},
			{
				title: 'First Month',
				href: '/pdf/First-Month-Checklist.pdf',
				subtitle: 'Checklist',
				type: 'checklist',
			},
			{
				title: 'Moving',
				href: '/pdf/Moving-Checklist.pdf',
				subtitle: 'Checklist',
				type: 'checklist',
			},
			{
				title: 'Real ID',
				href: '/pdf/Real-ID-Checklist.pdf',
				subtitle: 'Checklist',
				type: 'checklist',
			},
			{
				title: 'Book a Flight',
				href: '/pdf/How-To-Book-a-Flight.pdf',
				subtitle: 'Checklist',
				type: 'checklist',
			},
			{
				title: 'Passport',
				href: '/pdf/Passport-Checklist.pdf',
				subtitle: 'Checklist',
				type: 'checklist',
			},
			{
				title: 'Replace Birth Certificate',
				href: '/pdf/Replace-Birth-Certificate-Checklist.pdf',
				subtitle: 'Checklist',
				type: 'checklist',
			},
		],
	},
}

export type tResource = {
	[key: string]: {
		image: string
		links: Array<{
			href: string
			title: string
			subtitle?: string
			type: 'guide' | 'checklist' | 'reading' | 'link'
			Icon?: { name: IconKey; color: string } | undefined
		}>
	}
}
