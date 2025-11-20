import z, { type ZodSafeParseResult } from 'zod/v4'

type StateAction<T extends boolean = true> = T extends true ? State.Base.WithUtilities : State.Base

export const initState = () => ({
	countryId: {
		value: null as string | null,
		error: [] as string[],
	},
	pathwayId: {
		value: null as string | null,
		error: [] as string[],
	},
	costUom: {
		value: {
			abbr: '',
			currencySymbol: '',
		},
		error: [] as string[],
	},
	officialName: {
		value: null as string | null,
		error: [] as string[],
	},
	officialLink: {
		value: null as string | null,
		error: [] as string[],
	},
	category: {
		value: null as string | null,
		error: [] as string[],
	},
	description: {
		value: null as string | null,
		error: [] as string[],
	},
	duration: {
		value: {
			min: {
				value: 0,
				error: [] as string[],
			},
			max: {
				value: 0,
				error: [] as string[],
			},
			uom: {
				value: {
					base: null as string | null,
					value: 0,
					label: '',
				},
				error: [] as string[],
			},
		},
		error: [] as string[],
	},
	renewable: {
		value: {
			sameAsInitialDuration: false,
			renewable: true,
			duration: {
				value: {
					min: {
						value: 0,
						error: [] as string[],
					},
					max: {
						value: 0,
						error: [] as string[],
					},
					uom: {
						value: {
							base: null as string | null,
							value: 0,
							label: '',
						},
						error: [] as string[],
					},
				},
				error: [] as string[],
			},
			notes: [
				{
					value: '',
					error: [] as string[],
					counter: 0,
				},
			],
		},
		error: [] as string[],
		counter: 0,
	},
	processingTime: {
		value: {
			min: {
				value: 0,
				error: [] as string[],
			},
			max: {
				value: 0,
				error: [] as string[],
			},
			uom: {
				value: {
					base: null as string | null,
					value: 0,
					label: '',
				},
				error: [] as string[],
			},
		},
		error: [] as string[],
	},
	cost: {
		value: {
			min: {
				value: 0,
				error: [] as string[],
			},
			max: {
				value: 0,
				error: [] as string[],
			},
		},
		error: [] as string[],
	},
	reunification: {
		value: {
			possible: false,
			note: null as string | null,
		},
		error: [] as string[],
	},
	residency: {
		value: {
			possible: false,
			note: null as string | null,
		},
		error: [] as string[],
	},
	citizenship: {
		value: {
			possible: false,
			note: null as string | null,
		},
		error: [] as string[],
	},
	restrictions: {
		value: {
			hasRestrictions: false,
			restrictions: [
				{
					value: '',
					counter: 0,
				},
			],
		},
		error: [] as string[],
		counter: 0,
	},
	requirements: {
		value: [] as {
			value: string
			counter: number
		}[],
		error: [] as string[],
		counter: 0,
	},
	notes: {
		value: [] as {
			note: string
			counter: number
		}[],
		error: [] as string[],
		counter: 0,
	},
	documents: {
		error: [] as string[],
		counter: 0,
		value: [] as {
			title: string
			cost: number
			counter: number
			error: string[]
		}[],
	},
	nationalities: {
		value: {
			restricted: false,
			nationalities: [
				{
					country: '',
					note: '',
					counter: 0,
				},
			],
		},
		error: [] as string[],
		counter: 0,
	},
	discordHandle: {
		value: '',
		error: [] as string[],
	},
})

// #region ? ---------- Pathway Reducer ----------
export const pathwayReducer = (state: StateAction, action: Dispatch.Fn) => {
	let newState = { ...state }
	const { field, payload, type } = action

	// @ts-expect-error Mocking data - special case
	if (type == 'mockData' && field == 'all') {
		newState = { ...newState, ...(payload as unknown as State.Base) }
		return newState
	}

	if (type.startsWith('delete')) {
		let newData: State.Base[typeof field] = { ...newState[field] }
		switch (field) {
			case 'nationalities':
				{
					newData = newData as State.Base['nationalities']
					newData.value.nationalities = newState['nationalities'].value.nationalities.filter(
						n => n.counter != payload
					)
				}
				break
			case 'restrictions':
				{
					newData = newData as State.Base['restrictions']
					newData.value.restrictions = newState['restrictions'].value.restrictions.filter(
						r => r.counter != payload
					)
				}
				break
			case 'notes':
			case 'documents':
			case 'requirements':
				newData = newData as State.Base[typeof field]
				newData.value = newState[field].value.filter(
					n => n.counter != payload
				) as typeof newData.value

				break
		}
		newState = { ...newState, [field]: newData }
	}

	if (!type.startsWith('set')) {
		switch (type) {
			case 'checkRenewable':
				{
					newState.renewable.value.renewable = payload as boolean
					if (payload == false) {
						newState.renewable.value.sameAsInitialDuration = false
					}
				}
				break
			case 'checkRenewableSameAsInitialDuration':
				{
					newState.renewable.value.sameAsInitialDuration = payload as boolean
				}
				break
			case 'deleteRenewableNote':
				{
					const updatedNotes = newState.renewable.value.notes.filter(
						note => note.counter !== (payload as number)
					)
					newState.renewable.value.notes = updatedNotes
				}
				break
		}
	} else if (
		['countryId', 'officialName', 'officialLink', 'category', 'description'].includes(field)
	) {
		const parsed = parse(state, action) as ZodSafeParseResult<StateAction[typeof field]>

		Object.assign(newState[field], payload)

		if (parsed && !parsed.success) {
			newState[field].error = parsed.error?.issues.map((i: { message: string }) => i.message)
		}
	} else {
		Object.assign(newState, {
			[field]: payload,
		})

		console.log('SET ACTION FOR', field, payload)
	}

	if (field == 'countryId') {
		const currencies = state.countriesWithPathways.find(c => c.abbr == payload.value)?.api
			.currencies

		if (currencies && Object.keys(currencies).length == 1) {
			newState.costUom.value = Object.keys(currencies).map(k => {
				return {
					abbr: k,
					currencySymbol: currencies[k].symbol,
				}
			})[0]
		}
	}

	return newState
}
// #endregion

const parse = (state: StateAction, dispatch: Dispatch.Fn) => {
	const { field, payload } = dispatch

	switch (field) {
		case 'countryId': {
			return parseCountryId(state, payload)
		}
		case 'pathwayId':
		case 'officialName':
		case 'officialLink':
		case 'description':
		case 'category': {
			return parseStringFields(payload, field)
		}

		default: {
			return validator[field]().safeParse(payload)
		}
	}
}

const parseCountryId = (state: StateAction, payload: Dispatch.Fn['payload']) => {
	return validator
		.countryId(state.countriesWithPathways.map(c => c.abbr))
		.or(z.object({ value: z.literal(''), error: zErrorObj() }))
		.safeParse(payload)
}

const parseStringFields = <K extends State.Base.Keys>(
	payload: State.Base[K],
	field: K extends 'category' | 'officialLink' | 'officialName' | 'pathwayId' | 'description' ? K
	:	never
) => {
	return validator[field]().or(zEmptyString()).safeParse(payload)
}

// #endregion -------------------------------------------------------

// #region ? VALIDATION

const zErrorObj = () => z.string().array()

const zCounterObj = () =>
	z.coerce.number<string | number>().nonnegative('Must be 0 or greater').prefault(0)

const zMinStringObj = (num: number) =>
	z
		.string()
		.trim()
		.min(num, {
			error: iss => {
				return `${iss.path?.join('.')}: Must be at least ${num} characters`
			},
		})

const zRangeMinMaxObj = () =>
	z.object({
		value: z.coerce.number<string | number>().nonnegative().default(0),
		error: zErrorObj(),
	})

const zRangeUomObj = () =>
	z.object({
		value: z.object({
			base: z.string().trim().or(z.null()),
			value: z.coerce.number<string | number>().nonnegative(),
			label: z.string().trim(),
		}),
		error: zErrorObj(),
	})

const zStringArray = () =>
	z
		.object({
			value: zMinStringObj(10),
			counter: zCounterObj(),
		})
		.array()

const zStringArrayWithError = () => {
	return zStringArray()
		.unwrap()
		.extend({
			error: zErrorObj(),
		})
		.array()
}

const zEmptyString = () =>
	z.object({
		value: z.literal(''),
		error: zErrorObj(),
	})

export const validator = {
	countryId: (validAbbr: string[]) => {
		return z.object({
			value: zMinStringObj(3)
				.length(3, '3 character exact')
				.toUpperCase()
				.refine(val => validAbbr.includes(val), {
					message: 'Not a valid country code',
				}),
			error: zErrorObj(),
		})
	},
	pathwayId: () => {
		return z.object({
			value: zMinStringObj(5).catch(''),
			error: zErrorObj(),
		})
	},
	costUom: () => {
		return z.object({
			value: z.object({
				abbr: zMinStringObj(3).length(3, '3 character exact').toUpperCase(),
				currencySymbol: z.string().trim(),
			}),
			error: zErrorObj(),
		})
	},
	officialName: () => {
		return z.object({
			value: zMinStringObj(5),
			error: zErrorObj(),
		})
	},
	officialLink: () => {
		return z.object({
			value: z.url('Not a valid link').trim(),
			error: zErrorObj(),
		})
	},
	category: () => {
		return z.object({
			value: zMinStringObj(3).or(z.literal('')),
			error: zErrorObj(),
		})
	},
	description: () => {
		return z.object({
			value: zMinStringObj(10).or(z.literal('')),
			error: zErrorObj(),
		})
	},
	duration: () => {
		return z.object({
			value: z.object({
				min: zRangeMinMaxObj(),
				max: zRangeMinMaxObj(),
				uom: zRangeUomObj(),
			}),
			error: zErrorObj(),
		})
	},
	renewable: () => {
		return z.object({
			value: z.object({
				renewable: z.boolean().default(false),
				sameAsInitialDuration: z.boolean().default(false),
				duration: z.object({
					min: zRangeMinMaxObj(),
					max: zRangeMinMaxObj(),
					uom: zRangeUomObj(),
				}),
				notes: zStringArrayWithError(),
			}),
			counter: zCounterObj(),
			error: zErrorObj(),
		})
	},
	cost: () => {
		return z.object({
			value: z.object({
				min: zRangeMinMaxObj(),
				max: zRangeMinMaxObj(),
			}),
			error: zErrorObj(),
		})
	},
	processingTime: () => {
		return z.object({
			value: z.object({
				min: zRangeMinMaxObj(),
				max: zRangeMinMaxObj(),
				uom: zRangeUomObj(),
			}),
			error: zErrorObj(),
		})
	},
	documents: () => {
		return z.object({
			value: z
				.object({
					cost: z.coerce.number<string | number>().nonnegative(),
					title: zMinStringObj(5),
					counter: zCounterObj(),
					error: zErrorObj(),
				})
				.array(),
			error: zErrorObj(),
			counter: zCounterObj(),
		})
	},
	reunification: () => {
		return z.object({
			value: z.object({
				possible: z.boolean(),
				notes: zStringArray(),
			}),
			counter: zCounterObj(),
			error: zErrorObj(),
		})
	},
	citizenship: () => {
		return z.object({
			value: z.object({
				possible: z.boolean(),
				notes: zStringArray(),
			}),
			counter: zCounterObj(),
			error: zErrorObj(),
		})
	},
	residency: () => {
		return z.object({
			value: z.object({
				possible: z.boolean(),
				notes: zStringArray(),
			}),
			counter: zCounterObj(),
			error: zErrorObj(),
		})
	},
	requirements: () => {
		return z.object({
			value: zStringArray(),
			error: zErrorObj(),
			counter: zCounterObj(),
		})
	},
	restrictions: () => {
		return z.object({
			value: z.object({
				hasRestrictions: z.boolean().default(false),
				restrictions: zStringArray(),
			}),
			error: zErrorObj(),
			counter: zCounterObj(),
		})
	},
	notes: () => {
		return z.object({
			value: zStringArray(),
			error: zErrorObj(),
			counter: zCounterObj(),
		})
	},
	nationalities: () => {
		return z.object({
			value: z.object({
				restricted: z.boolean().prefault(false),
				nationalities: z
					.object({
						counter: zCounterObj(),
						value: zMinStringObj(3),
					})
					.array(),
				notes: zStringArray(),
			}),
			error: zErrorObj(),
			counter: zCounterObj(),
		})
	},
	discordHandle: () => {
		return z.object({
			value: z.string().trim(),
			error: zErrorObj(),
		})
	},
}
// #endregion ?
