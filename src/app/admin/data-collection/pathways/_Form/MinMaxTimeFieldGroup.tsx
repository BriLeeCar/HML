'use client'
import { Error, errors, Field, FieldGroup, Input, Label, Select } from '@/data-collection/pathways'
import z, { type ZodSafeParseResult } from 'zod'
import { toTitleCase } from '~/lib/text'

const timeOptionEls = [
	{
		label: 'Days',
		value: 1,
		base: 'days',
	},
	{
		label: 'Weeks',
		value: 7,
		base: 'weeks',
	},
	{
		label: 'Months',
		value: 30,
		base: 'months',
	},
	{
		label: 'Years',
		value: 365,
		base: 'years',
	},
]

export const MinMaxTimeFieldGroup = ({
	pathwayData,
	dispatchAction: dispatch,
	field,
	...props
}: ElProps
	& Props & {
		field: Validator.Keys.UOM
	}) => {
	const baseData = {
		...(field == 'renewable' ? pathwayData.renewable.value.duration : pathwayData[field]),
	}

	const handleData = ({
		key,
		value,
		thisData,
	}: MinMaxTimeDispatchProps<
		'max' | 'min' | 'uom',
		'duration' | 'processingTime' | 'renewable'
	>) => {
		const action = dispatchMinMaxTimeData({ key, value, thisData })

		action.error = action.error.filter((i) => ![errors.minGtMax, errors.noMaxWOutMin].includes(i))
		if (thisData.value.max.value > 0 && thisData.value.min.value > action.value.max.value) {
			action.error.push(errors.minGtMax)
		} else if (thisData.value.min.value == 0 && action.value.max.value > 0) {
			action.error.push(errors.noMaxWOutMin)
		}

		let payload: State.Base[typeof field]

		if (field == 'renewable') {
			payload = { ...pathwayData.renewable }
			payload.value.duration = action
		} else {
			payload = {
				...pathwayData[field],
				value: action.value,
				error: action.error,
			}
		}

		dispatch({
			field: field,
			type: `set${field.charAt(0).toUpperCase() + field.slice(1)}` as `set${Capitalize<typeof field>}`,
			payload: payload,
		} as Dispatch.SetterFn[typeof field])
	}

	return (
		<FieldGroup {...props}>
			<Field>
				<div
					className='grid items-center gap-x-4 gap-y-3 *:first:font-medium md:grid-cols-[0.25fr_1.75fr] md:*:first:text-end'
					data-slot='control'>
					<Label>Min</Label>
					<Input
						defaultValue={baseData.value.min.value}
						name={`${field}Min`}
						aria-label={`${toTitleCase(field)} Min`}
						type='number'
						min={0}
						step={1}
						onBlur={(e) => {
							handleData({
								key: 'min',
								value: e.target.value,
								thisData: baseData,
							})
						}}
						placeholder='0'
					/>
					<Error message={baseData.value.min.error} />
				</div>
			</Field>
			<Field>
				<div
					className='grid items-center gap-x-4 gap-y-3 *:first:font-medium md:grid-cols-[0.25fr_1.75fr] md:*:first:text-end'
					data-slot='control'>
					<Label>Max</Label>
					<Input
						defaultValue={baseData.value.max.value}
						name={`${field}Max`}
						aria-label={`${toTitleCase(field)} Max`}
						type='number'
						min={0}
						step={1}
						onBlur={(e) => {
							handleData({
								key: 'max',
								value: e.target.value,
								thisData: baseData,
							})
						}}
						placeholder='0'
					/>
					<Error
						message={baseData.value.max.error}
						className='col-span-2'
					/>
				</div>
			</Field>
			<Field>
				<div
					className='grid items-center gap-x-4 gap-y-3 *:first:font-medium md:grid-cols-[0.25fr_1.75fr] md:*:first:text-end'
					data-slot='control'>
					<Label>UOM</Label>
					<Select
						name={`${field}UOM`}
						aria-label={`${toTitleCase(field)} UOM`}
						className='text-muted-foreground'
						placeholder={{
							label: '----- Select UOM -----',
							value: 0,
							selected: baseData.value.uom.value.value == 0,
						}}
						defaultValue={baseData.value.uom.value.value}
						onChange={(e) => {
							handleData({
								key: 'uom',
								value: e.target.value,
								thisData: baseData,
							})
						}}>
						{timeOptionEls.map((option) => (
							<option
								key={option.base}
								value={option.value}>
								{option.label}
							</option>
						))}
					</Select>
					<Error message={baseData.value.uom.error} />
				</div>
			</Field>
		</FieldGroup>
	)
}

const dispatchMinMaxTimeData = ({
	key,
	value,
	thisData,
}: MinMaxTimeDispatchProps<'max' | 'min' | 'uom', Validator.Keys.UOM>) => {
	let newData = { ...thisData }
	let parsed: ZodSafeParseResult<(typeof newData.value)[typeof key]['value']> | null = null

	if (key == 'min' || key == 'max') {
		newData.value[key].value = Number(value)
	}

	const minMaxParse = z.coerce.number<string | number>().nonnegative(errors.negative)

	const maxParse = minMaxParse.superRefine((val, ctx) => {
		if (val % 1 !== 0) {
			ctx.addIssue(errors.wholeNumber)
		}
	})

	const minParse = minMaxParse.superRefine((val, ctx) => {
		if (val % 1 !== 0) {
			ctx.addIssue(errors.wholeNumber)
		}
	})

	const uomParse = z.coerce.number<string | number>().transform((val) => {
		return (
			timeOptionEls.find((o) => o.value == val) ?? {
				label: '',
				value: 0,
				base: '',
			}
		)
	})

	const keys = Object.keys(newData.value) as ['min', 'max', 'uom']

	keys.forEach((k) => {
		newData.value[k].error = []
		const thisValue = key == k ? value : newData.value[k].value

		if (k == 'max' || k == 'min') {
			parsed = key == 'max' ? maxParse.safeParse(thisValue) : minParse.safeParse(thisValue)
		}
		if (k == 'uom' && k == key) {
			if (thisValue == null) {
				newData.value.uom.value = timeOptionEls[0]
				return
			}
			parsed = uomParse.safeParse(thisValue)
		}
		if (parsed && 'success' in parsed) {
			if (parsed.success) {
				newData.value[k].value = parsed.data
			} else {
				newData.value[k].error = parsed.error.issues.map((i) => i.message)
			}
		}

		parsed = null
	})
	if (newData.value.max.value > 0 && newData.value.min.value > newData.value.max.value) {
		newData.error.push(errors.minGtMax)
	} else {
		newData.error = []
	}
	newData.error.filter((v, i, a) => {
		return a.indexOf(v, i + 1) == -1
	})

	return newData
}

export type MinMaxTimeDispatchProps<
	K extends 'min' | 'max' | 'uom',
	D extends Validator.Keys.UOM,
> = {
	key: K
	value: K extends 'min' | 'max' ? number | string
	:	{
			base: string | null
			value: number
			label: string
		}
	thisData: D extends 'renewable' ? State.Base['renewable']['value']['duration']
	:	State.Base['processingTime' | 'duration']
}
