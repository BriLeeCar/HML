export const refresh = <K extends keyof Query['query']>(
	workingData: Query,
	field: K,
	newData: Query['query'][K]
) => {
	workingData.query[field] = newData
	return workingData
}

// #region ! ---------- ERROR TYPES ----------
type MinMaxBaseErrorKeys = {
	[key in keyof Query['errors']]: Query['errors'][key] extends (
		{
			min: string[]
			max: string[]
			base: string[]
		}
	) ?
		key
	:	never
}[keyof Query['errors']]

type ErrorKeys = Exclude<keyof Query['errors'], MinMaxBaseErrorKeys>

// #endregion ! --------------------

export const error = <I extends 'min' | 'max' | 'base' | undefined = undefined>(
	workingData: Query,
	field: I extends 'min' | 'max' | 'base' ? MinMaxBaseErrorKeys : ErrorKeys,
	error: string[],
	innerField?: I extends 'min' | 'max' | 'base' ? I : undefined
) => {
	if (innerField != undefined) {
		Object.assign(workingData.errors[field], {
			[innerField]: error,
		})
	} else {
		workingData.errors = {
			...workingData.errors,
			[field]: error,
		}
	}

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

type MissingQueryErrorKeys<E extends true | undefined = undefined> =
	E extends true ? QueryErrorKeys : QueryQueryKeys

type QueryQueryKeys = keyof Query['query']
type QueryErrorKeys = keyof Query['errors'] & keyof Query['query']

export const createMissingQueryKey = <
	K extends keyof Query['query'],
	E extends true | undefined = undefined,
>(
	workingData: Query,
	field: MissingQueryErrorKeys<E>,
	defaultValue: Query['query'][K],
	errorsField?: E
) => {
	if (workingData.query[field] === undefined) {
		Object.assign(workingData.query, {
			[field]: defaultValue,
		})
	}
	if (errorsField && errorsField == true) {
		if (field == 'cost' || field == 'duration' || field == 'processTime') {
			;['min', 'max', 'base'].forEach(key => {
				workingData = error(workingData, field, [], key as 'min' | 'max' | 'base')
			})
		}
	}
	return workingData
}

const trackerDuration = () => ({
	min: 1,
	max: 1,
	separate: false,
})

export const createTracker = (): Omit<Query, 'query'> => ({
	date: new Date(),
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
