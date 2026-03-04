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
	message: 'Transgender, Gender-expansive, and Intersex to Prison Torture Pipeline',
	type: {
		full: 'Report Released',
		abbreviated: 'Report',
		icon: 'AnnouncementIcon',
	},
	link: {
		folder: 'pdf',
		fileName: 'TGI Persecution Report Feb 2026',
		ext: 'pdf',
		target: '_blank',
	},
	isActive: true,
}
