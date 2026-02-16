type Announcement = {
	message: string
	type: {
		full: string
		abbreviated: string
		icon: IconKey
	}
	link: {
		folder: string
		fileName: string
		ext: string
		target: '_blank' | '_self'
	}
	isActive: boolean
}

export const topBarAnnouncement: Announcement = {
	message: 'International Support Needed Against Escalation of Violence from Federal Agents',
	type: {
		full: 'call to action',
		abbreviated: 'cta',
		icon: 'AnnouncementIcon',
	},
	link: {
		folder: 'pdf',
		fileName:
			'Coordinated-International-Action-Can-Help-More-People-Escape-Persecution-by-US-Federal-Agents',
		ext: 'pdf',
		target: '_blank',
	},
	isActive: true,
}
