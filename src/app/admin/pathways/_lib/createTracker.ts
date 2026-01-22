const trackerDuration = () => ({
	min: 1,
	max: 1,
	separate: false,
})

export const createTracker = (): Query =>
	({
		date: new Date(),
		query: {
			createdAt: new Date(),
			updatedAt: new Date(),
			documents: [] as Query['query']['documents'],
			categories: [] as number[],
			piplines: [] as Query['query']['piplines'],
			restrictedNationalities: [] as Query['query']['restrictedNationalities'],
			processTime: {
				min: 0,
				max: 0,
				note: '',
				na: false,
			},
			duration: {
				min: 0,
				max: 0,
				note: '',
				na: false,
			},
			renewal: {
				min: 0,
				max: 0,
				note: '',
				na: false,
			},
			cost: {
				min: 0,
				max: 0,
				na: false,
			},
		} as PrismaPathway,
		errors: {
			countryCode: [],
			name: [],
			link: [],
			description: [],
			cost: {
				min: [],
				max: [],
				base: [],
			},
			duration: {
				min: [],
				max: [],
				base: [],
			},
			processTime: {
				min: [],
				max: [],
				base: [],
			},
			renewal: {
				min: [],
				max: [],
				base: [],
			},
			categories: [],
			notes: [],
			limitations: [],
			requirements: [],
			restrictions: [],
			documents: [],
		},
		counters: {
			notes: 0,
			limitations: 0,
			requirements: 0,
			restrictions: 0,
			documents: 0,
		},
		durations: {
			duration: trackerDuration(),
			processTime: trackerDuration(),
			renewal: trackerDuration(),
		},
		piplines: {
			residency: false,
			citizenship: false,
			reunification: false,
			renewal: false,
		},
		utilities: {
			countryData: null,
		},
	}) as unknown as Query
