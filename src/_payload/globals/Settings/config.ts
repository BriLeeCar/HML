import type { GlobalConfig } from 'payload'
import { UserSettings } from './UserSettings'

const SettingsGlobalConfig: GlobalConfig = {
	slug: 'settings',
	admin: {
		group: 'Admin',
	},

	fields: [
		{
			type: 'tabs',
			tabs: [UserSettings],
		},
	],
}

export default SettingsGlobalConfig
