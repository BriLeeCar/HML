export const APPROVED_HANDLES = {
	jojoandmaple: 'admin',
	brileec: 'admin',
	jeyposton: 'admin',
	howtotoppletyrants: 'admin',
	thenotorioushlb: 'admin',
	chaoticpluto366: 'admin',
	repairedbutton: 'admin',
}

/* 
	
	*/

export const MOCK_DATA = {
	countryCode: {
		value: 'CAN',
		error: [],
		visited: true,
	},
	categories: {
		value: [1, 8],
	},
	costUom: {
		value: {
			abbr: 'CAD',
			currencySymbol: '$',
		},
		error: [],
	},
	name: {
		value: 'Canada Work Visa',
		error: [],
		visited: true,
	},
	link: {
		value: 'https://www.canada.ca',
		error: [],
		visited: true,
	},
	category: {
		value: 'Random Work Visa Category',
		error: [],
		visited: true,
	},
	description: {
		value: 'This is a mock description for the Canada Work Visa pathway.',
		error: [],
		visited: true,
	},
	duration: {
		value: {
			min: {
				value: 12,
				error: [],
				visited: true,
			},
			max: {
				value: 18,
				error: [],
				visited: true,
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
				visited: true,
			},
			max: {
				value: 12,
				error: [],
				visited: true,
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
				visited: true,
			},
			max: {
				value: 6,
				error: [],
				visited: true,
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
				visited: true,
			},
			max: {
				value: 300,
				error: [],
				visited: true,
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
			} as unknown as string,
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
			} as unknown as string,
		],
		counter: 1,
	},
	documents: {
		counter: 1,
		value: [
			{
				title: 'Valid passport',
				cost: 180,
				type: 0,
				counter: 0,
				note: 'A passport valid for at least six months beyond the intended stay.',
				error: [],
			},
		],
	},
	citizenshipPossible: {
		value: false,
	},
	citizenshipNote: {
		value: null,
		visited: false,
		error: [],
	},
	residencyPossible: {
		value: true,
	},
	residencyNote: {
		value: 'Residency can be obtained after 2 years of continuous stay.',
		visited: true,
		error: [],
	},
	reunificationPossible: {
		value: true,
	},
	reunificationNote: {
		value: 'Family reunification is allowed under certain conditions.',
		visited: true,
		error: [],
	},
	requirements: {
		value: [
			{
				note: 'Proof of employment offer in Canada.',
				error: [],
				counter: 0,
			} as unknown as string,
		],
		counter: 1,
	},
}

export const PATHWAY_BASE = {
	countryCode: {
		value: null,
		error: [],
		visited: false,
	},
	id: {
		value: null,
		error: [],
		visited: false,
	},
	costUom: {
		value: {
			abbr: null,
			currencySymbol: null,
		},
		error: [],
	},
	name: {
		value: null,
		error: [],
		visited: false,
	},
	link: {
		value: null,
		error: [],
		visited: false,
	},
	categories: {
		value: [] as number[],
	},
	category: {
		value: null,
		error: [],
		visited: false,
	},
	description: {
		value: null,
		error: [],
		visited: false,
	},
	duration: {
		value: {
			min: {
				value: 0,
				error: [],
				visited: false,
			},
			max: {
				value: 0,
				error: [],
				visited: false,
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
				visited: false,
			},
			max: {
				value: 0,
				error: [],
				visited: false,
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
	processTime: {
		min: 0,
		max: 0,
	},
	cost: {
		min: 0,
		max: 0,
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
	citizenshipPossible: {
		value: false,
	},
	citizenshipNote: {
		value: null,
		visited: false,
		error: [],
	},
	residencyPossible: {
		value: false,
	},
	residencyNote: {
		value: null,
		visited: false,
		error: [],
	},
	reunificationPossible: {
		value: false,
	},
	reunificationNote: {
		value: null,
		visited: false,
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

export const betaCountries = [
	{ name: 'Albania', code: 'ALB' },
	{ name: 'Brazil', code: 'BRA' },
	{ name: 'Canada', code: 'CAN' },
	{ name: 'Costa Rica', code: 'CRI' },
	{ name: 'Estonia', code: 'EST' },
	{ name: 'Spain', code: 'ESP' },
	{ name: 'Finland', code: 'FIN' },
	{ name: 'France', code: 'FRA' },
	{ name: 'Ireland', code: 'IRL' },
	{ name: 'Italy', code: 'ITA' },
	{ name: 'Mexico', code: 'MEX' },
	{ name: 'Norway', code: 'NOR' },
	{ name: 'Portugal', code: 'PRT' },
	{ name: 'Uruguay', code: 'URY' },
]
