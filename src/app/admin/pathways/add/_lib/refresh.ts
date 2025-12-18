export const refresh = <K extends keyof Query['query']>(
	workingData: Query,
	field: K,
	newData: Query['query'][K]
) => {
	workingData.query[field] = newData
	return workingData
}

type NoteKeys = {
	[key in keyof Query['query']]: Query['query'][key] extends (
		{
			counter: number
			note: string
		}[]
	) ?
		key
	:	never
}[keyof Query['query']]

export const note = <K extends NoteKeys & keyof Query['counters']>(
	workingData: Query,
	field: K,
	type: 'add' | 'update' | 'remove',
	newData?: Query['query'][K][number],
	counter?: number
) => {
	if (type === 'add') {
		const newCounter = workingData.counters[field] + 1
		if (!workingData.query[field]) {
			workingData.query[field] = []
		}
		workingData.query[field].push({
			counter: newCounter,
			note: '',
		})
		workingData.counters[field] = newCounter
	}
	if (counter != undefined) {
		switch (type) {
			case 'remove':
				workingData.query[field] = workingData.query[field].filter(n => n.counter !== counter)
				break
			case 'update':
				const index = workingData.query[field].findIndex(n => n.counter === counter)
				if (index !== -1 && newData) {
					workingData.query[field][index] = {
						...workingData.query[field][index],
						...newData,
					}
				}
				break
		}
	}
	return workingData
}

export const document = (
	workingData: Query,
	type: 'add' | 'update' | 'remove',
	newData?: Query['query']['documents'][number],
	counter?: number
) => {
	if (type === 'add') {
		const newCounter = workingData.counters['documents'] + 1
		if (!workingData.query['documents']) {
			workingData.query['documents'] = []
		}
		workingData.query['documents'].push({
			id: newCounter,
			documentId: 0,
			title: '',
			cost: 0,
			description: '',
			link: null,
			isRequired: false,
			pathwayId: 0,
		})
		workingData.counters['documents'] = newCounter
	}
	if (counter != undefined) {
		switch (type) {
			case 'remove':
				workingData.query['documents'] = workingData.query['documents'].filter(
					n => n.id !== counter
				)
				break
			case 'update':
				const index = workingData.query['documents'].findIndex(n => n.id === counter)
				if (index !== -1 && newData) {
					workingData.query['documents'][index] = {
						...workingData.query['documents'][index],
						...newData,
					}
				}
				break
		}
	}
	return workingData
}

const trackerDuration = () => ({
	min: 1,
	max: 1,
	separate: false,
})

export const createTracker = (): Query => ({
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
})
