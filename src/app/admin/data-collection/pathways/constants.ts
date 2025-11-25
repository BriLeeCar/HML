export const APPROVED_HANDLES = {
	jojoandmaple: 'admin',
	brileec: 'admin',
	jeyposton: 'admin',
	howtotoppletyrants: 'admin',
	thenotorioushlb: 'admin',
	chaoticpluto366: 'admin',
	repairedbutton: 'admin',
}

export const MOCK_DATA: Pathways = {
	countryId: {
		value: 'CAN',
		error: [],
	},
	pathwayId: {
		value: 'CAN-CANADA-WORK-VISA',
		error: [],
	},
	costUom: {
		value: {
			abbr: 'CAD',
			currencySymbol: '$',
		},
		error: [],
	},
	officialName: {
		value: 'Canada Work Visa',
		error: [],
	},
	officialLink: {
		value: 'https://www.canada.ca',
		error: [],
	},
	category: {
		value: 'Random Work Visa Category',
		error: [],
	},
	description: {
		value: 'This is a mock description for the Canada Work Visa pathway.',
		error: [],
	},
	duration: {
		value: {
			min: {
				value: 12,
				error: [],
			},
			max: {
				value: 18,
				error: [],
			},
			uom: {
				value: {
					base: 'months',
					value: 30,
					label: 'Months',
				},
				error: [],
			},
		},
		error: [],
	},
	isRenewable: {
		value: true,
	},
	renewableDuration: {
		value: {
			min: {
				value: 6,
				error: [],
			},
			max: {
				value: 12,
				error: [],
			},
			uom: {
				value: {
					base: 'months',
					value: 30,
					label: 'Months',
				},
				error: [],
			},
		},
		error: [],
	},
	renewableSameAsInitial: {
		value: false,
	},
	renewableNotes: {
		value: [
			{
				note: 'Renewal is possible with additional documentation.',
				counter: 0,
				error: [],
			},
		],
		counter: 1,
	},
	processingTime: {
		value: {
			min: {
				value: 4,
				error: [],
			},
			max: {
				value: 6,
				error: [],
			},
			uom: {
				value: {
					base: 'weeks',
					value: 7,
					label: 'Weeks',
				},
				error: [],
			},
		},
		error: [],
	},
	cost: {
		value: {
			min: {
				value: 100,
				error: [],
			},
			max: {
				value: 300,
				error: [],
			},
		},
		error: [],
	},
	limitations: {
		value: [
			{
				note: 'Applicants must be under 35 years old.',
				counter: 0,
				error: [],
			},
		],
		counter: 1,
	},
	hasLimitations: {
		value: true,
	},
	restrictedNationalities: {
		value: [
			{
				country: 'CAN',
				note: 'Citizens of CAN are not eligible for this visa.',
				error: [],
				counter: 0,
			},
		],
		counter: 1,
	},
	hasNationalityRestrictions: {
		value: true,
	},
	notes: {
		value: [
			{
				note: 'This is a mock note regarding the Canada Work Visa pathway.',
				counter: 0,
				error: [],
			},
		],
		counter: 1,
	},
	documents: {
		counter: 1,
		value: [
			{
				title: 'Valid passport',
				cost: 180,
				counter: 0,
				note: 'A passport valid for at least six months beyond the intended stay.',
				error: [],
			},
		],
	},
	discordHandle: {
		value: 'brileec',
		error: [],
	},
	citizenshipPossible: {
		value: false,
	},
	citizenshipNote: {
		value: null,
		error: [],
	},
	residencyPossible: {
		value: true,
	},
	residencyNote: {
		value: 'Residency can be obtained after 2 years of continuous stay.',
		error: [],
	},
	reunificationPossible: {
		value: true,
	},
	reunificationNote: {
		value: 'Family reunification is allowed under certain conditions.',
		error: [],
	},
	requirements: {
		value: [
			{
				note: 'Proof of employment offer in Canada.',
				error: [],
				counter: 0,
			},
		],
		counter: 1,
	},
}

export const PATHWAY_BASE: Omit<Pathways, 'discordHandle'> & {
	discordHandle: { value: string | null; error: string[] }
} = {
	countryId: {
		value: null,
		error: [],
	},
	pathwayId: {
		value: null,
		error: [],
	},
	costUom: {
		value: {
			abbr: null,
			currencySymbol: null,
		},
		error: [],
	},
	officialName: {
		value: null,
		error: [],
	},
	officialLink: {
		value: null,
		error: [],
	},
	category: {
		value: null,
		error: [],
	},
	description: {
		value: null,
		error: [],
	},
	duration: {
		value: {
			min: {
				value: 0,
				error: [],
			},
			max: {
				value: 0,
				error: [],
			},
			uom: {
				value: {
					base: null,
					value: 0,
					label: null,
				},
				error: [],
			},
		},
		error: [],
	},
	isRenewable: {
		value: false,
	},
	renewableDuration: {
		value: {
			min: {
				value: 0,
				error: [],
			},
			max: {
				value: 0,
				error: [],
			},
			uom: {
				value: {
					base: null,
					value: 0,
					label: null,
				},
				error: [],
			},
		},
		error: [],
	},
	renewableSameAsInitial: {
		value: false,
	},
	renewableNotes: {
		value: [],
		counter: 0,
	},
	processingTime: {
		value: {
			min: {
				value: 0,
				error: [],
			},
			max: {
				value: 0,
				error: [],
			},
			uom: {
				value: {
					base: null,
					value: 0,
					label: null,
				},
				error: [],
			},
		},
		error: [],
	},
	cost: {
		value: {
			min: {
				value: 0,
				error: [],
			},
			max: {
				value: 0,
				error: [],
			},
		},
		error: [],
	},
	limitations: {
		value: [],
		counter: 0,
	},
	hasLimitations: {
		value: false,
	},
	restrictedNationalities: {
		value: [],
		counter: 0,
	},
	hasNationalityRestrictions: {
		value: false,
	},
	notes: {
		value: [],
		counter: 0,
	},
	documents: {
		counter: 0,
		value: [],
	},
	discordHandle: {
		value: null,
		error: [],
	},
	citizenshipPossible: {
		value: false,
	},
	citizenshipNote: {
		value: null,
		error: [],
	},
	residencyPossible: {
		value: false,
	},
	residencyNote: {
		value: null,
		error: [],
	},
	reunificationPossible: {
		value: false,
	},
	reunificationNote: {
		value: null,
		error: [],
	},
	requirements: {
		value: [],
		counter: 0,
	},
}

export const errors = {
	minGtMax: 'Max must be greater than or equal to Min',
	negative: 'Must be a non-negative number',
	noMaxWOutMin: 'Must provide a Min value when Max is provided',
	wholeNumber: 'Must be a whole number',
	stringLength: (min: number) => `Must be ${min} characters or more`,
}
