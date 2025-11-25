import z from 'zod/v4'
import { errors } from './constants'
import { validate } from './validation'

const getFns = {
	asString: () => '',
	asBool: () => false,
	asMinMaxVal: () => ({
		value: 0,
		error: [] as string[],
	}),
	asMinMax: () => ({
		min: getFns.asMinMaxVal(),
		max: getFns.asMinMaxVal(),
	}),
	asUomVal: () => ({
		value: {
			base: null as string | null,
			value: 0,
			label: '',
		},
		error: [] as string[],
	}),
	asMinMaxUom: () => ({
		...getFns.asMinMax(),
		uom: getFns.asUomVal(),
	}),
	asArray: (counter?: number) => ({
		value: '',
		counter: counter ?? 0,
	}),
	asNote: (counter?: number) => ({
		note: '',
		counter: counter ?? 0,
	}),
}

export const getEmptyEntry = {
	countryId: getFns.asString,
	pathwayId: getFns.asString,
	officialName: getFns.asString,
	officialLink: getFns.asString,
	category: getFns.asString,
	description: getFns.asString,

	costUom: () => ({
		abbr: '',
		currencySymbol: '',
	}),
	duration: getFns.asMinMaxUom,
	cost: getFns.asMinMax,
	notes: getFns.asNote,
	documents: (counter?: number) => ({
		title: '',
		cost: 0,
		note: '',
		counter: counter ?? 0,
		error: [] as string[],
	}),
	requirements: getFns.asArray,

	renewableNotes: getFns.asNote,
	isRenewable: getFns.asBool,
	renewableDuration: getFns.asMinMaxUom,
	renewableSameAsInitial: getFns.asBool,
	discordHandle: getFns.asString,

	hasNationalityRestrictions: getFns.asBool,
	restrictedNationalities: (counter?: number) => ({
		country: '',
		...getFns.asNote(counter),
	}),

	processingTime: getFns.asMinMaxUom,

	reunificationPossible: getFns.asBool,
	reunificationNote: getFns.asString,

	residencyPossible: getFns.asBool,
	residencyNote: getFns.asString,

	citizenshipPossible: getFns.asBool,
	citizenshipNote: getFns.asString,

	limitations: getFns.asArray,
	hasLimitations: getFns.asBool,
}

export const initPathway = () => {
	const keys = Object.keys(getEmptyEntry) as Array<PathwaysKeys>
	const Pathways: Pathways = {} as Pathways

	keys.forEach(key => {
		const returnedData = getEmptyEntry[key]()
		Object.assign(Pathways, {
			[key]: {
				...(typeof returnedData == 'string' || typeof returnedData == 'boolean' ?
					{ value: returnedData }
				:	{ value: undefined }),
			},
		})

		if (getEmptyEntry[key] != getFns.asBool) {
			Object.assign(Pathways[key], {
				error: [] as string[],
			})
			if (
				getEmptyEntry[key] == getFns.asArray
				|| getEmptyEntry[key] == getFns.asNote
				|| key == 'documents'
				|| key == 'restrictedNationalities'
			) {
				Object.assign(Pathways[key], {
					counter: 0,
					value: [returnedData],
				})
			}
		}
		if (Pathways[key].value == undefined) {
			Object.assign(Pathways[key], {
				value: returnedData,
			})
		}
	})

	return Pathways
}

// #region ? ---------- Pathways Reducer ----------
export const pathwayReducer = (
	state: PathwaysWithDB,
	action: PathwaysActions[keyof PathwaysActions]
): PathwaysWithDB => {
	const { field } = action

	switch (field) {
		case 'countryId':
			return handleCountryId({
				state,
				action,
			})
		case 'pathwayId':
		case 'description':
		case 'category':
		case 'discordHandle':
		case 'residencyNote':
		case 'citizenshipNote':
		case 'reunificationNote':
			return handleStringField({
				state,
				action,
			})
		case 'officialName':
			const data = handleStringField({
				state,
				action,
			})
			return {
				...state,
				...data,
				pathwayId: {
					...state.pathwayId,
					value: createPathwayID({
						state,
						action,
					}),
				},
			}
		case 'citizenshipPossible':
		case 'residencyPossible':
		case 'reunificationPossible':
		case 'hasNationalityRestrictions':
		case 'hasLimitations':
		case 'isRenewable':
		case 'renewableSameAsInitial':
			return handleBooleanField({
				state,
				action,
			})
		case 'officialLink':
			return handleLinkField({
				state,
				action,
			})
		case 'documents':
			return handleDocuments({
				state,
				action,
			})
		case 'renewableNotes':
			return handleRenewalDurationNotes({
				state,
				action,
			})
		case 'cost':
		case 'duration':
		case 'processingTime':
		case 'renewableDuration':
			return handleMinMax({
				state,
				action,
			})
	}

	if ('type' in action && typeof action.payload != 'string') {
		return handleNote({
			state,
			action,
		})
	}

	return state
}
// #endregion

const createPathwayID = ({
	state,
	action,
}: {
	state: PathwaysWithDB
	action: PathwaysActions[PathwaysKeys]
}) => {
	const { field, payload } = action
	let officialName = state.officialName.value ?? ''
	let countryId = state.countryId.value ?? ''

	switch (field) {
		case 'officialName':
			officialName = payload as string
			break
		case 'countryId':
			countryId = payload as string
			break
	}

	return [countryId, officialName]
		.map(p => p.trim().toLowerCase().replaceAll(/\s+/g, '-'))
		.join('-')
}

const handleCountryId = ({
	state,
	action,
}: {
	state: PathwaysWithDB
	action: PathwaysActions['countryId']
}) => {
	const { field, payload } = handleReturns<'countryId'>({
		state,
		action,
	})

	const currencyField = {
		costUom: {
			...state.costUom,
		},
	}

	const country = state.countriesWithPathways.find(c => c.abbr === payload)

	if (country) {
		const currencies = Object.keys(country.api.currencies)
		currencyField.costUom.value =
			currencies.length == 1 ?
				(currencyField.costUom.value = {
					abbr: currencies[0],
					currencySymbol: country.api.currencies[currencies[0]].symbol,
				})
			:	currencyField.costUom.value
	}

	const pathwayId = state.pathwayId

	return {
		...state,
		[field]: {
			...state[field],
			value: payload,
		},
		...currencyField,
		pathwayId: {
			...pathwayId,
			value: createPathwayID({
				state,
				action,
			}),
		},
	}
}

const handleStringField = ({
	state,
	action,
}: {
	state: PathwaysWithDB
	action: PathwaysActions[PathwaysStringKeys]
}) => {
	const { field, payload, returns } = handleReturns<PathwaysStringKeys>({
		state,
		action,
	})

	const newData = z
		.string()
		.min(10, errors.stringLength(10))
		.trim()
		.or(z.literal(''))
		.safeParse(payload)

	if (returns[field] && typeof returns[field] === 'object' && 'error' in returns[field]) {
		if (!newData.success) returns[field].error = newData.error.issues.map(i => i.message)
		else
			returns[field] = {
				error: [],
				value: newData.data,
			}
	}
	return returns
}

const handleLinkField = ({
	state,
	action,
}: {
	state: PathwaysWithDB
	action: PathwaysStringPayload['officialLink']
}) => {
	const { field, payload, returns } = handleReturns<'officialLink'>({
		state,
		action,
	})

	const newData = z.url().or(z.literal('')).safeParse(payload)
	if (!newData.success) {
		returns[field].error = newData.error.issues.map(i => i.message)
	} else {
		returns[field].value = newData.data
		returns[field].error = []
	}

	return returns
}

const handleBooleanField = ({
	state,
	action,
}: {
	state: PathwaysWithDB
	action: PathwaysActions[PathwaysBooleanKeys]
}) => {
	const { field, payload, returns } = handleReturns<PathwaysBooleanKeys>({
		state,
		action,
	})

	returns[field] = {
		...state[field],
		value: payload,
	}

	if (payload == false) {
		switch (field) {
			case 'hasLimitations':
				returns['limitations'] = {
					...state['limitations'],
					value: [],
				}
				break
			case 'hasNationalityRestrictions':
				returns['restrictedNationalities'] = {
					...state['restrictedNationalities'],
					value: [],
				}
				break
			case 'isRenewable':
				returns['renewableDuration'] = {
					...state['renewableDuration'],
					value: {
						min: { value: 0, error: [] },
						max: { value: 0, error: [] },
						uom: {
							value: {
								base: null,
								value: 0,
								label: '',
							},
							error: [],
						},
					},
				}
				returns['renewableNotes'] = {
					...state['renewableNotes'],
					value: [],
				}
				returns['renewableSameAsInitial'] = {
					...state['renewableSameAsInitial'],
					value: false,
				}
				break
			case 'renewableSameAsInitial':
				returns['renewableDuration'] = {
					...state['renewableDuration'],
					value: state['duration'].value,
				}
				break
			case 'reunificationPossible':
				returns['reunificationNote'] = {
					...state['reunificationNote'],
					value: null,
				}
				break
			case 'citizenshipPossible':
				returns['citizenshipNote'] = {
					...state['citizenshipNote'],
					value: null,
				}
				break
			case 'residencyPossible':
				returns['residencyNote'] = {
					...state['residencyNote'],
					value: null,
				}
				break
		}
	}

	return returns
}

const handleDocuments = ({
	state,
	action,
}: {
	state: PathwaysWithDB
	action: PathwaysActions['documents']
}): PathwaysWithDB => {
	const { type, field, returns, payload } = handleReturns<'documents'>({
		state,
		action,
	})

	const payloadIsObject = (payload: unknown) => typeof payload == 'object' && payload != null

	switch (type) {
		case 'add':
			{
				console.log('Adding document')
				const newCounter = state[field].counter + 1
				returns[field] = {
					...state[field],
					counter: newCounter,
					value: [...state[field].value, getEmptyEntry[field](newCounter)],
				}
			}
			break
		case 'delete':
			returns[field] = {
				...state[field],
				value: state[field].value.filter(n => n.counter != payload),
			}
			break
		case 'update': {
			if (payloadIsObject(payload)) {
				const { counter, value } = payload
				returns[field] = {
					...state[field],
					value: state[field].value.map(n =>
						n.counter == counter ?
							{
								...n,
								...value,
							}
						:	n
					),
				}
			}
		}
	}
	return returns
}

const handleNote = <K extends PathwaysArrayKeys>({
	state,
	action,
}: {
	state: PathwaysWithDB
	action: PathwaysActions[K]
}) => {
	const { type, field, returns, payload } = handleReturns<K>({
		state,
		action,
	})

	const payloadIsObject = (payload: unknown) => typeof payload == 'object' && payload != null

	switch (type) {
		case 'add':
			{
				console.log('Adding note')
				const newCounter = state[field].counter + 1
				returns[field] = {
					...state[field],
					counter: newCounter,
					value: [...state[field].value, getEmptyEntry[field](newCounter)],
				}
			}
			break
		case 'delete':
			returns[field] = {
				...state[field],
				value: state[field].value.filter(n => n.counter != payload),
			}
			break
		case 'update':
			{
				if (payloadIsObject(payload)) {
					const { counter, value } = payload
					returns[field] = {
						...state[field],
						value: state[field].value.map(n =>
							n.counter == counter ?
								{
									...n,
									...value,
								}
							:	n
						),
					}
				}
			}
			break
	}

	return returns
}

const addNote = <K extends PathwaysArrayKeys>({
	data,
	field,
	counter,
}: {
	data: PathwaysWithDB[K]
	field: K
	counter: number
}) => {
	// ? -------------- ADD --------------
	const newCounter = counter + 1

	return {
		...data,
		counter: newCounter,
		value: [...data.value, getEmptyEntry[field](newCounter)],
	}
}

const removeNote = <K extends PathwaysArrayKeys>({
	data,
	counter,
}: {
	data: PathwaysWithDB[K]
	counter: number
}) => {
	return {
		...data,
		value: data.value.filter(n => n.counter != counter),
	}
}

const handleRenewalDurationNotes = ({
	state,
	action,
}: {
	state: PathwaysWithDB
	action: PathwaysActions['renewableNotes']
}) => {
	const { type, field, payload } = action
	switch (type) {
		case 'add':
			return {
				...state,
				renewableNotes: addNote<'renewableNotes'>({
					data: state[field],
					field,
					counter: state[field].counter,
				}),
			}
		case 'delete':
			return {
				...state,
				renewableNotes: removeNote<'renewableNotes'>({
					data: state.renewableNotes,
					counter: payload,
				}),
			}
		case 'update': {
			const { counter, value } = payload

			const updatedNote = validate.renewableNotes({
				pathwayFieldData: state.renewableNotes,
				value: value as Pathways['renewableNotes']['value'][number],
				counter: counter,
			})
			return {
				...state,
				renewableNotes: {
					...state.renewableNotes,
					...updatedNote,
				},
			}
		}
	}
}

const handleMinMax = <K extends PathwaysMinMaxKeys>({
	state,
	action,
}: {
	state: PathwaysWithDB
	action: PathwaysActions[K]
}) => {
	const { field, payload, returns } = handleReturns<K>({
		state,
		action,
	})

	if (typeof payload == 'object' && 'error' in payload) {
		if (payload.value.max.value != 0 && payload.value.min.value > payload.value.max.value) {
			// hasError = true
			payload.error = ['Ensure your minimum value is less than your maximum value']
		} else {
			payload.error = []
		}

		returns[field] = {
			...state[field],
			...payload,
		}

		return returns
	}
	return returns
}

const handleReturns = <K extends PathwaysKeys>({
	state,
	action,
}: {
	state: PathwaysWithDB
	action: PathwaysActions[K]
}): {
	field: K
	payload: PathwaysPayload[K]['payload']
	returns: PathwaysWithDB
	type?: 'add' | 'delete' | 'update'
} => {
	const { field, payload } = action as {
		field: K
		payload: PathwaysPayload[K]['payload']
	}

	if ('type' in action) {
		return {
			field,
			payload,
			returns: {
				...state,
				[field]: {
					...state[field],
				},
			},
			type: action.type,
		}
	}

	return {
		field,
		payload,
		returns: {
			...state,
			[field]: {
				...state[field],
			},
		},
	}
}
