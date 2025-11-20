export const APPROVED_HANDLES = {
	jojoandmaple: 'admin',
	brileec: 'admin',
	jeyposton: 'admin',
	howtotoppletyrants: 'admin',
	thenotorioushlb: 'admin',
	chaoticpluto366: 'admin',
	repairedbutton: 'admin',
	'elizabeth.the.3rd': 'admin',
}

export const MOCK_DATA = {
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
	renewable: {
		value: {
			sameAsInitialDuration: false,
			renewable: true,
			duration: {
				value: {
					min: {
						value: 12,
						error: [],
					},
					max: {
						value: 24,
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
			notes: [
				{
					value: 'Renewal is possible with additional documentation.',
					counter: 0,
					error: [],
				},
			],
		},
		error: [],
		counter: 1,
	},
	processingTime: {
		value: {
			min: {
				value: 6,
				error: [],
			},
			max: {
				value: 8,
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
	reunification: {
		value: {
			possible: true,
			note: 'Family reunification is allowed under this visa.',
		},
		error: [],
	},
	residency: {
		value: {
			possible: true,
			note: 'Pathway to permanent residency after 2 years.',
		},
		error: [],
	},
	citizenship: {
		value: {
			possible: true,
			note: 'Eligible for citizenship after 5 years of residency.',
		},
		error: [],
	},
	restrictions: {
		value: {
			hasRestrictions: true,
			restrictions: [
				{
					value: 'Applicants must be in the tech industry.',
					counter: 0,
				},
			],
		},
		error: [],
		counter: 1,
	},
	requirements: {
		value: [
			{
				value: 'Valid job offer from a Canadian employer.',
				counter: 0,
			},
		],
		error: [],
		counter: 1,
	},
	notes: {
		value: [
			{
				note: 'This is a mock note regarding the Canada Work Visa pathway.',
				counter: 0,
			},
		],
		error: [],
		counter: 1,
	},
	documents: {
		error: [],
		counter: 1,
		value: [
			{
				title: 'Valid passport',
				cost: 180,
				counter: 0,
				error: [],
			},
		],
	},
	nationalities: {
		value: {
			restricted: true,
			nationalities: [
				{
					country: 'USA',
					note: 'Citizens of the USA require additional documentation.',
					counter: 0,
				},
			],
		},
		error: [],
		counter: 1,
	},
	discordHandle: {
		value: 'brileec',
		error: [],
	},
} as State.Base
