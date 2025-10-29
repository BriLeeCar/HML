export const resources: tResource = {
	'In The Media': {
		image: '',
		links: [
			{
				title:
					"Netherlands Suspends 'Safe Country' List Ahead of EU Reform",
				subtitle: 'A critical shift in asylum policy',
				href: '/pdf/Netherlands Safe Country Press Release 10-27-25.pdf',
				type: 'press release',
				target: '_blank',
				author: 'HelpMeLeave Team',
				date: 'October 27, 2025',
				Icon: { name: 'GlobeIcon', color: 'text-current' },
			},
			{
				title: '#NoLongerSafe September 22nd - October 24th, 2025',
				href: '/pdf/NoLongerSafe - Sept22-Oct24.pdf',
				subtitle:
					'An Update of Events that Exemplify that the United States No Longer Meets the Criteria to Be Considered a "Safe Country of Origin"',
				type: 'link',
				author: 'D. Jey Poston, Fleurian Ray Filkins, & Qira',
				date: 'October 27th, 2025',
				Icon: { name: 'TransFlag', color: 'text-current' },
				target: '_blank',
			},
			{
				title: '#NoLongerSafe',
				href: '/pdf/NoLongerSafe.pdf',
				subtitle:
					'Why the United States No Longer Qualifies as a "Safe Country of Origin"',
				type: 'link',
				author: 'D. Jey Poston',
				date: 'September 19, 2025',
				Icon: { name: 'TransFlag', color: 'text-current' },
				target: '_blank',
			},
		],
	},
	'Creating Community': {
		image: '',
		links: [
			{
				title: 'Join Our Discord',
				href: 'https://discord.gg/TcHKRgED6y',
				subtitle: 'Connect with others going through this process',
				type: 'link',
				Icon: { name: 'DiscordIcon', color: 'text-indigo-500' },
				target: '_blank',
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
				target: '_self',
			},
			{
				href: '/pdf/EU-Entrance-General-Information.pdf',
				title: 'EU Entrance',
				subtitle: 'General Information',
				type: 'guide',
				target: '_blank',
			},
			{
				href: '/pdf/Asylum-Process-General.pdf',
				title: 'Asylum Process',
				subtitle: 'Overview',
				type: 'guide',
				target: '_blank',
			},
			{
				href: '/pdf/Asylum-The-Criteria-The-Cautions-and-The-Experience.pdf',
				title: 'Asylum',
				subtitle: 'The Criteria, The Cautions, and The Experience',
				type: 'reading',
				target: '_blank',
			},
			{
				href: '/pdf/Visa-or-Asylum-Summary-for-EU-countries.pdf',
				title: 'Visa or Asylum',
				subtitle: 'Summary for EU countries',
				type: 'reading',
				target: '_blank',
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
				target: '_self',
			},
			{
				title: 'Get Your Documents Ready',
				href: '/pdf/Get-Your-Documents-Ready.pdf',
				subtitle: 'Checklist',
				type: 'checklist',
				target: '_blank',
			},
			{
				title: 'First Month',
				href: '/pdf/First-Month-Checklist.pdf',
				subtitle: 'Checklist',
				type: 'checklist',
				target: '_blank',
			},
			{
				title: 'Moving',
				href: '/pdf/Moving-Checklist.pdf',
				subtitle: 'Checklist',
				type: 'checklist',
				target: '_blank',
			},
			{
				title: 'Real ID',
				href: '/pdf/Real-ID-Checklist.pdf',
				subtitle: 'Checklist',
				type: 'checklist',
				target: '_blank',
			},
			{
				title: 'Book a Flight',
				href: '/pdf/How-To-Book-a-Flight.pdf',
				subtitle: 'Checklist',
				type: 'checklist',
				target: '_blank',
			},
			{
				title: 'Passport',
				href: '/pdf/Passport-Checklist.pdf',
				subtitle: 'Checklist',
				type: 'checklist',
				target: '_blank',
			},
			{
				title: 'Replace Birth Certificate',
				href: '/pdf/Replace-Birth-Certificate-Checklist.pdf',
				subtitle: 'Checklist',
				type: 'checklist',
				target: '_blank',
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
			type:
				| 'guide'
				| 'checklist'
				| 'reading'
				| 'link'
				| 'press release'
			Icon?: { name: IconKey; color: string } | undefined
			author?: string
			date?: string
			target: '_blank' | '_self'
		}>
	}
}
