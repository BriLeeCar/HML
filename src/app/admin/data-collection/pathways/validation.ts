import { z } from 'zod/v4'

// #region ? SUBMISSION
const removeErrorAndCounters = (starterKey: PathwaysKeys, data: AnySafe): AnySafe => {
	if (typeof data == 'string') {
		if (data.trim() == '' || data == null) {
			return null
		}
	}
	if (typeof data == 'number' && data == 0) {
		return null
	}

	if (Array.isArray(data)) {
		switch (starterKey) {
			case 'notes':
				data = (data as Pathways['notes']['value']).filter(n => n.note.trim() != '')
			case 'documents':
				data = (data as Pathways['documents']['value']).filter(n => n.title?.trim() != '')
				break
			case 'requirements':
				data = (data as Pathways['requirements']['value']).filter(n => n.note.trim() != '')
				break
		}
	}

	if (typeof data == 'object') {
		for (const key in data) {
			if (key === 'error' || key === 'counter') {
				continue
			}
			if (Array.isArray(data[key])) {
				if (data[key].length == 0) {
					data[key] = null
					continue
				}
			}
			data[key] = removeErrorAndCounters(starterKey, data[key])
		}
	}

	return data
}

export const cleanPathway = (Pathways: PathwaysWithDB) => {
	const currentState = { ...Pathways }
	const newState = {}

	const keys = Object.keys(currentState) as Array<keyof PathwaysWithDB>

	if (currentState.hasLimitations.value == false) {
		Object.assign(currentState, {
			limitations: [],
		})
	}
	if (currentState.hasNationalityRestrictions.value == false) {
		Object.assign(currentState, {
			restrictedNationalities: [],
		})
	}
	if (currentState.isRenewable.value == false) {
		Object.assign(currentState, {
			renewableDuration: null,
			renewableSameAsInitial: false,
			renewableNotes: [],
		})
	}

	keys.forEach(key => {
		if (key == 'db' || key == 'countriesWithPathways') return

		if (currentState[key] == undefined) {
			return
		}

		Object.assign(newState, {
			[key]: removeErrorAndCounters(key, currentState[key].value),
		})
	})

	return newState
}

export const toCSV = (pathway: PathwaysWithDB) => {
	const cleanedPathway = cleanPathway(pathway) as Pathways
	const flatPathway = {
		base: {},
		renewableNotes: [],
		limitations: [],
		restrictedNationalities: [],
		documents: [],
		notes: [],
		requirements: [],
	}

	Object.keys(cleanedPathway).forEach(key => {
		const value = cleanedPathway[key as keyof typeof cleanedPathway]

		if (Object.keys(flatPathway).includes(key) && Array.isArray(value)) {
			if (key == 'documents') {
				const documents = value.map((v, i) => {
					return {
						id: pathway.pathwayId.value + '_' + i,
						pathwayId: pathway.pathwayId.value,
						title: v.title,
						cost: v.cost,
						note: v.note,
					}
				})
				Object.assign(flatPathway, {
					documents: documents,
				})
			} else if (key == 'restrictedNationalities') {
				const restrictedNationalities = value.map((v, i) => {
					return {
						id: pathway.pathwayId.value + '_' + i,
						pathwayId: pathway.pathwayId.value,
						country: v.country,
						note: v.note,
					}
				})
				Object.assign(flatPathway, {
					restrictedNationalities: restrictedNationalities,
				})
			} else {
				const newValue = value.map((v, i) => {
					if (
						key == 'notes'
						|| key == 'requirements'
						|| key == 'limitations'
						|| key == 'renewableNotes'
					) {
						return {
							id: pathway.pathwayId.value + '_' + i,
							pathwayId: pathway.pathwayId.value,
							note: v.note,
						}
					}
				})
				Object.assign(flatPathway, {
					[key]: newValue,
				})
			}
		} else {
			if (
				typeof value == 'string'
				|| typeof value == 'number'
				|| typeof value == 'boolean'
				|| value == null
			) {
				Object.assign(flatPathway, {
					base: {
						...flatPathway['base'],
						[key]: value,
					},
				})
				return
			} else if (key == 'cost') {
				const thisValue = value as unknown as Pathways['cost']['value']
				Object.assign(flatPathway, {
					base: {
						...flatPathway['base'],
						[`${key}_min`]: thisValue.min.value,
						[`${key}_max`]: thisValue.max.value,
					},
				})
			} else if (key == 'costUom') {
				const thisValue = value as unknown as Pathways['costUom']['value']
				Object.assign(flatPathway, {
					base: {
						...flatPathway['base'],
						[`cost_uom`]: thisValue?.abbr,
					},
				})
			} else {
				const objValue = value as unknown as {
					min: { value: number }
					max: { value: number }
					uom: { value: { value: number } }
				}
				const parsedMin = objValue.uom.value.value * objValue.min.value
				const parsedMax = objValue.uom.value.value * objValue.max.value
				Object.assign(flatPathway, {
					base: {
						...flatPathway['base'],
						[`${key}_min`]: parsedMin,
						[`${key}_max`]: parsedMax,
					},
				})
			}
		}
	})

	const base = flatPathway.base as Pathways & {
		costUom_currencySymbol: string
		costUom_abbr: string
		cost_min: number
		cost_max: number
		duration_min: number
		duration_max: number
		processingTime_min: number
		processingTime_max: number
		renewableDuration_min: number
		renewableDuration_max: number
	}

	let csvBase = [
		base.discordHandle,
		base.countryId,
		base.pathwayId,
		base.officialName,
		base.officialLink,
		base.category,
		base.description,
		base.costUom_currencySymbol,
		base.costUom_abbr,
		base.cost_min,
		base.cost_max,
		base.duration_min,
		base.duration_max,
		base.processingTime_min,
		base.processingTime_max,
		base.isRenewable,
		base.renewableDuration_min,
		base.renewableDuration_max,
		base.renewableSameAsInitial,
		base.hasLimitations,
		base.citizenshipPossible,
		base.citizenshipNote,
		base.hasNationalityRestrictions,
		base.residencyPossible,
		base.residencyNote,
		base.reunificationPossible,
		base.reunificationNote,
	].join(',')

	console.log('hey', csvBase)

	return cleanedPathway
}
// #endregion

// #region ? VALIDATION

export const validate = {
	officialLink: ({ pathwayFieldData, value }: ValidateProps<'officialLink'>) => {
		return {
			...pathwayFieldData,
			error:
				z
					.url()
					.or(z.literal(''))
					.safeParse(value)
					.error?.issues.map(i => i.message) || [],
		}
	},
	officialName: ({ pathwayFieldData, value }: ValidateProps<'officialName'>) => {
		return {
			...pathwayFieldData,
			error:
				minString(10)
					.safeParse(value)
					.error?.issues.map(i => i.message) ?? [],
		}
	},
	documents: ({
		pathwayFieldData,
		value,
		counter,
	}: ValidateProps<'documents'> & { counter?: number }) => {
		const processDocument = (doc: Pathways['documents']['value'][number]) => {
			const errors: string[] = []
			if (doc.title.trim().length < 5) {
				errors.push(`Title must be at least 5 characters long`)
			}
			if (doc.cost < 0) {
				errors.push(`Cost cannot be negative`)
			}
			return {
				...doc,
				error: errors,
			}
		}

		return {
			...pathwayFieldData,
			value: pathwayFieldData.value.map(doc =>
				doc.counter === counter ? processDocument(value) : doc
			),
		}
	},
	renewableNotes: ({
		pathwayFieldData,
		value,
		counter,
	}: ValidateProps<'renewableNotes'> & { counter?: number }) => {
		const processDocument = (note: Pathways['renewableNotes']['value'][number]) => {
			const parsed = minString(10).safeParse(note.note)
			return {
				...note,
				note: note.note,
				error: parsed.success ? [] : parsed.error.issues.map(i => i.message),
			}
		}

		return {
			...pathwayFieldData,
			value: pathwayFieldData.value.map(note =>
				note.counter === counter ? processDocument(value) : note
			),
		}
	},
}
type ValidateProps<K extends keyof Pathways> = {
	pathwayFieldData: Pathways[K]
	value: NonNullable<Pathways[K]['value']> extends Array<infer U> ? U
	:	NonNullable<Pathways[K]['value']>
	counter?: number
}

const minString = (min: number) => {
	return z.string().trim().min(min, `Must be at least ${min} characters long`)
}
// #endregion

export const pathwaySubmit = (pathway: PathwaysWithDB) => {
	const pathwayId = pathway.pathwayId.value?.toLowerCase() as string
	const parsedPathway = { ...pathway }

	const parsed = z
		.object({
			countryId: z
				.object({
					value: z.string().min(3),
					error: z.array(z.string()),
				})
				.transform(val => val.value),
			pathwayId: z
				.object({
					value: z.string().min(3),
					error: z.array(z.string()),
				})
				.transform(val => val.value.toLowerCase()),
			discordHandle: z
				.object({
					value: z.string().min(3),
					error: z.array(z.string()),
				})
				.transform(val => val.value),
			officialName: z
				.object({
					value: z.string().min(10),
					error: z.array(z.string()),
				})
				.transform(val => val.value),
			officialLink: z
				.object({
					value: z.url(),
					error: z.array(z.string()),
				})
				.transform(val => val.value),
			category: z
				.object({
					value: z.string().min(3),
					error: z.array(z.string()),
				})
				.transform(val => val.value),
			description: z
				.object({
					value: z.string().min(10),
					error: z.array(z.string()),
				})
				.transform(val => val.value),
			citizenshipPossible: z
				.object({
					value: z.boolean(),
				})
				.transform(val => val.value),
			citizenshipNote: z
				.object({
					value: z.string().nullable(),
					error: z.array(z.string()),
				})
				.transform(val => val.value),
			reunificationPossible: z
				.object({
					value: z.boolean(),
				})
				.transform(val => val.value),
			reunificationNote: z
				.object({
					value: z.string().nullable(),
					error: z.array(z.string()),
				})
				.transform(val => val.value),
			residencyPossible: z
				.object({
					value: z.boolean(),
				})
				.transform(val => val.value),
			residencyNote: z
				.object({
					value: z.string().nullable(),
					error: z.array(z.string()),
				})
				.transform(val => val.value),
			costUom: z
				.object({
					value: z
						.object({
							abbr: z.string().nullable(),
							currencySymbol: z.string().nullable(),
						})
						.nullable(),
					error: z.array(z.string()),
				})
				.transform(val => val.value?.abbr),
			duration: z
				.object({
					value: z.object({
						min: z.object({
							value: z.number().min(0),
							error: z.array(z.string()),
						}),
						max: z.object({
							value: z.number().min(0),
							error: z.array(z.string()),
						}),
						uom: z.object({
							value: z.object({
								base: z.string().nullable(),
								value: z.number().min(1),
								label: z.string().nullable(),
							}),
							error: z.array(z.string()),
						}),
					}),
					error: z.array(z.string()),
				})
				.transform(val => {
					return {
						min: val.value.min.value * val.value.uom.value.value,
						max: val.value.max.value * val.value.uom.value.value,
					}
				}),
			processingTime: z
				.object({
					value: z.object({
						min: z.object({
							value: z.number().min(0),
							error: z.array(z.string()),
						}),
						max: z.object({
							value: z.number().min(0),
							error: z.array(z.string()),
						}),
						uom: z.object({
							value: z.object({
								base: z.string().nullable(),
								value: z.number().min(1),
								label: z.string().nullable(),
							}),
							error: z.array(z.string()),
						}),
					}),
					error: z.array(z.string()),
				})
				.transform(val => {
					return {
						min: val.value.min.value * val.value.uom.value.value,
						max: val.value.max.value * val.value.uom.value.value,
					}
				}),
			cost: z
				.object({
					value: z.object({
						min: z.object({
							value: z.number().min(0),
							error: z.array(z.string()),
						}),
						max: z.object({
							value: z.number().min(0),
							error: z.array(z.string()),
						}),
					}),
					error: z.array(z.string()),
				})
				.transform(val => ({
					min: val.value.min.value,
					max: val.value.max.value,
				})),
			isRenewable: z
				.object({
					value: z.boolean(),
				})
				.transform(val => val.value),
			renewableDuration: z
				.object({
					value: z
						.object({
							min: z.object({
								value: z.number().min(0),
								error: z.array(z.string()),
							}),
							max: z.object({
								value: z.number().min(0),
								error: z.array(z.string()),
							}),
							uom: z.object({
								value: z.object({
									base: z.string().nullable(),
									value: z.number().min(1),
									label: z.string().nullable(),
								}),
								error: z.array(z.string()),
							}),
						})
						.nullable(),
					error: z.array(z.string()),
				})
				.transform(val => {
					if (val.value == null) {
						return {
							min: null,
							max: null,
						}
					}
					return {
						min: val.value.min.value * val.value.uom.value.value,
						max: val.value.max.value * val.value.uom.value.value,
					}
				}),
			renewableSameAsInitial: z
				.object({
					value: z.boolean(),
				})
				.transform(val => val.value),
			hasLimitations: z
				.object({
					value: z.boolean(),
				})
				.transform(val => val.value),
			limitations: z
				.object({
					value: z.array(
						z.object({
							note: z.string().min(10),
							error: z.array(z.string()),
							counter: z.number(),
						})
					),
				})
				.transform(val => val.value.map(n => n.note)),
			hasNationalityRestrictions: z
				.object({
					value: z.boolean(),
				})
				.transform(val => val.value),
			restrictedNationalities: z
				.object({
					value: z.array(
						z.object({
							country: z.string().min(3),
							note: z.string().min(10),
							error: z.array(z.string()),
							counter: z.number(),
						})
					),
				})
				.transform(val => val.value.map(n => ({ country: n.country, note: n.note }))),
			documents: z
				.object({
					value: z.array(
						z.object({
							title: z.string().min(5),
							cost: z.number().min(0),
							note: z.string().nullable(),
							error: z.array(z.string()),
							counter: z.number(),
						})
					),
				})
				.transform(val => val.value.map(d => ({ title: d.title, cost: d.cost, note: d.note }))),
			notes: z
				.object({
					value: z.array(
						z.object({
							note: z.string().min(10),
							error: z.array(z.string()),
							counter: z.number(),
						})
					),
				})
				.transform(val => val.value.map(n => n.note)),
			requirements: z
				.object({
					value: z.array(
						z.object({
							note: z.string().min(10),
							error: z.array(z.string()),
							counter: z.number(),
						})
					),
				})
				.transform(val => val.value.map(n => n.note)),
		})
		.transform(val => {
			return {
				base: {
					['Country Id']: val.countryId,
					['Pathway Id']: val.pathwayId,
					['Discord Handle']: val.discordHandle,
					['Official Name']: val.officialName,
					['Official Link']: val.officialLink,
					['Category']: val.category,
					['Description']: val.description,

					['Citizenship Possible']: val.citizenshipPossible,
					['Citizenship Note']: val.citizenshipPossible ? val.citizenshipNote : null,

					['Reunification Possible']: val.reunificationPossible,
					['Reunification Note']: val.reunificationPossible ? val.reunificationNote : null,

					['Residency Possible']: val.residencyPossible,
					['Residency Note']: val.residencyPossible ? val.residencyNote : null,

					['Cost UoM']: val.costUom,

					['Duration Min (in days)']: val.duration.min,
					['Duration Max (in days)']: val.duration.max,

					['Processing Time Min (in days)']: val.processingTime.min,
					['Processing Time Max (in days)']: val.processingTime.max,

					['Cost Min']: val.cost.min,
					['Cost Max']: val.cost.max,

					['Is Renewable']: val.isRenewable,
					['Renewable Duration Min (in days)']: val.isRenewable ? val.renewableDuration.min : null,
					['Renewable Duration Max (in days)']: val.isRenewable ? val.renewableDuration.max : null,
					['Renewable Same As Initial']: val.isRenewable ? val.renewableSameAsInitial : null,

					['Has Limitations']: val.hasLimitations,
				},
				...(val.hasLimitations && {
					limitations: val.limitations.map((limitation, index) => ({
						['Country Id']: val.countryId,
						['Pathway Id']: pathwayId,
						['Limitation Id']: `${pathwayId}_limitation_${index + 1}`,
						['Note']: limitation,
					})),
				}),
				...(val.hasNationalityRestrictions && {
					restrictedNationalities: val.restrictedNationalities.map((restriction, index) => ({
						['Country Id']: val.countryId,
						['Pathway Id']: pathwayId,
						['Restriction Id']: `${pathwayId}_restriction_${index + 1}`,
						['Country']: restriction.country,
						['Note']: restriction.note,
					})),
				}),
				...(val.documents.length > 0 && {
					documents: val.documents.map((document, index) => ({
						['Country Id']: val.countryId,
						['Pathway Id']: pathwayId,
						['Document Id']: `${pathwayId}_document_${index + 1}`,
						['Title']: document.title,
						['Cost']: document.cost,
						['Note']: document.note,
					})),
				}),
				...(val.notes.length > 0 && {
					notes: val.notes.map((note, index) => ({
						['Country Id']: val.countryId,
						['Pathway Id']: pathwayId,
						['Note Id']: `${pathwayId}_note_${index + 1}`,
						['Note']: note,
					})),
				}),
				...(val.requirements.length > 0 && {
					requirements: val.requirements.map((requirement, index) => ({
						['Country Id']: val.countryId,
						['Pathway Id']: pathwayId,
						['Requirement Id']: `${pathwayId}_requirement_${index + 1}`,
						['Note']: requirement,
					})),
				}),
			}
		})
		.safeParse(parsedPathway)

	return parsed
}
