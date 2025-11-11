import type { Dispatch, ReactNode, SetStateAction } from 'react'
import z from 'zod/v4'
import { cn } from '~/lib/cn'
import { Fieldset, InputBase, Label, Legend, Select } from './Form'
import { tPathwayForm } from './schema'

// #region ! -------------------- Duration Keys
export type tDurationKeys =
	| 'processingTime'
	| 'renewalDuration'
	| 'visaDuration'

export const durationStateInit = {
	isRenewable: { value: false, error: null },
	visaDuration: {
		min: { value: 0, error: null },
		max: { value: null, error: null },
		uom: {
			value: {
				label: 'Months',
				value: 30,
			},
			error: null,
		},
	},
	renewalDuration: {
		min: { value: 0, error: null },
		max: { value: null, error: null },
		uom: {
			value: {
				label: 'Months',
				value: 30,
			},
			error: null,
		},
	},
	processingTime: {
		min: { value: 0, error: null },
		max: { value: null, error: null },
		uom: {
			value: {
				label: 'Months',
				value: 30,
			},
			error: null,
		},
	},
}
// #endregion ! --------------------

// #region ! -------------------- Duration UOMs
export const durations = [
	{
		label: 'Hours',
		value: 0.0416666667,
	},
	{
		label: 'Days',
		value: 1,
	},
	{
		label: 'Weeks',
		value: 7,
	},
	{
		label: 'Months',
		value: 30,
	},
	{
		label: 'Years',
		value: 365,
	},
]
// #endregion ! --------------------

// #region ! -------------------- Zod Schemas
export const zDurationUOM = z.object({
	label: z.enum(
		durations.map((d) => d.label) as [string, ...string[]]
	),
	value: z.coerce.number<string | number>().multipleOf(1),
})

export const zDuration = z.coerce
	.number<string | number>()
	.nonnegative('Cannot be negative')
	.multipleOf(1, 'Must be a whole number')

export const zDurationRange = z
	.object({
		min: zDuration,
		max: zDuration.optional(),
		uom: zDurationUOM,
	})
	.transform((val) => {
		if (val.max != undefined && val.max < val.min) {
			throw new Error('Max duration cannot be less than min duration')
		}
		const parseUom = durations.find((d) => d.label === val.uom.label)
		if (!parseUom) {
			throw new Error('Invalid duration UOM')
		}
		return {
			min: val.min * parseUom.value,
			max:
				val.max ? val.max * parseUom.value : val.min * parseUom.value,
		}
	})

export const zDurationProcess = z.transform(
	(val: {
		min: number
		max?: number
		uom: { label: string; value: number }
	}) => {
		if (val.max == undefined) {
			val.max = val.min
		}

		if (val.max < val.min) {
			throw new Error('Max duration cannot be less than min duration')
		}
		const parseUom = durations.find((d) => d.label === val.uom.label)
		if (!parseUom) {
			throw new Error('Invalid duration UOM')
		}
		return {
			min: val.min * parseUom.value,
			max: val.max * parseUom.value,
		}
	}
)
// #endregion ! --------------------

export const validateDuration = (
	schemaKey: tDurationKeys,
	rangeKey: 'min' | 'max' | 'uom',
	value: string | number | undefined,
	setPathway: Dispatch<SetStateAction<tPathwayForm>>,
	pathway: tPathwayForm,
	customError?: string
) => {
	console.log(pathway[schemaKey].uom.value)

	const parsed =
		rangeKey == 'uom' ?
			z
				.object({
					label: z.enum(
						durations.map((d) => d.label) as [string, ...string[]]
					),
					value: z.coerce.number<string | number>().multipleOf(1),
				})
				.safeParse({
					label: durations.find((d) => d.value === Number(value))
						?.label,
					value: Number(value),
				})
		:	zDuration.safeParse(value)

	const currentDuration = {
		[rangeKey]: {},
	}

	if (value == undefined || value == null || value === '') {
		Object.assign(currentDuration[rangeKey], {
			value: null,
			error: null,
		})
	} else if (customError) {
		Object.assign(currentDuration[rangeKey], {
			value: null,
			error: customError,
		})
	} else if (parsed.success) {
		Object.assign(currentDuration[rangeKey], {
			value: parsed.data,
			error: null,
		})
	} else {
		Object.assign(currentDuration[rangeKey], {
			value: null,
			error: parsed.error.issues[0].message,
		})
	}

	// if (rangeKey == 'uom') {
	// 	const maxValue = pathway[schemaKey].max.value ?? 0
	// 	const minValue = pathway[schemaKey].min.value ?? 0
	// 	const oldUom = pathway[schemaKey].uom.value?.value ?? 30
	// 	// @ts-expect-error -- TS cannot infer that currentDuration.uom.value is defined here
	// 	const newUom = currentDuration.uom.value.value ?? 30

	// 	const newMax = maxValue * (oldUom / newUom)
	// 	const newMin = minValue * (oldUom / newUom)

	// 	Object.assign(currentDuration, {
	// 		max: {
	// 			value: maxValue != null ? newMax : null,
	// 			error: pathway[schemaKey].max.error,
	// 		},
	// 		min: {
	// 			value: newMin,
	// 			error: pathway[schemaKey].min.error,
	// 		},
	// 	})
	// 	if (!isNaN(newMax)) {
	// 		const maxEl = document.querySelector(
	// 			`#${schemaKey}Max`
	// 		) as HTMLInputElement
	// 		maxEl.value = maxValue != null ? newMax.toString() : ''
	// 	}
	// 	if (!isNaN(newMin)) {
	// 		const minEl = document.querySelector(
	// 			`#${schemaKey}Min`
	// 		) as HTMLInputElement
	// 		minEl.value = minValue != null ? newMin.toString() : ''
	// 	}

	// 	console.log(document.querySelector(`#${schemaKey}Max`))
	// 	document
	// 		.querySelector(`#${schemaKey}Min`)
	// 		?.setAttribute('value', newMin.toString())
	// }

	setPathway(
		Object.assign(
			{},
			{
				...pathway,
				[schemaKey]: {
					...pathway[schemaKey],
					...currentDuration,
				},
			}
		)
	)
}

export const RangeInput = ({
	label,
	schemaKey,
	innerKey,
	pathway,
	handleChange,
	htmlFor,
	...props
}: {
	label: string
	schemaKey: tDurationKeys
	innerKey: 'min' | 'max' | 'uom'
	handleChange: (
		schemaKey: tDurationKeys,
		innerKey: 'min' | 'max' | 'uom',
		val: string | undefined,
		customError?: string
	) => void
	pathway: tPathwayForm
	htmlFor?: string
} & Props.WithRef<'input'>) => {
	return (
		<InputBase
			defaultValue={undefined}
			id={props.id ?? schemaKey}
			{...props}
			label={label}
			schemaKey={schemaKey}
			onBlur={(e) =>
				handleChange(schemaKey, innerKey, e.target.value)
			}
			type='number'
			min={0}
			htmlFor={htmlFor}
			error={{
				location: 'after',
				message: pathway[schemaKey][innerKey]?.error,
			}}
		/>
	)
}

export const DurationGrp = ({
	label,
	schemaKey,
	pathway,
	handleChange,
	children,
	wrapperClassName,
}: {
	label: string
	schemaKey: tDurationKeys
	pathway: tPathwayForm
	handleChange: (
		schemaKey: tDurationKeys,
		innerKey: 'min' | 'max' | 'uom',
		val: string | undefined
	) => void
	children?: ReactNode

	wrapperClassName?: string
}) => {
	const uomValue = pathway[schemaKey].uom as {
		value: { label: string; value: number }
		error: string | null
	}

	return (
		<Fieldset className='grow basis-1/2'>
			<Legend>{label}</Legend>
			<div
				className={cn(
					'mt-2 flex basis-1/2 flex-wrap items-start gap-4 px-4 *:grow',
					wrapperClassName
				)}>
				<RangeInput
					label='Minimum'
					required
					handleChange={handleChange}
					schemaKey={schemaKey}
					id={`${schemaKey}Min`}
					htmlFor={`${schemaKey}Min`}
					innerKey='min'
					pathway={pathway}
				/>
				<RangeInput
					htmlFor={`${schemaKey}Max`}
					type='number'
					label='Maximum'
					handleChange={handleChange}
					schemaKey={schemaKey}
					innerKey='max'
					pathway={pathway}
					id={`${schemaKey}Max`}
				/>
				<span className='flex flex-col'>
					<Label
						htmlFor={`${schemaKey}Uom`}
						label='UOM'
						error={{
							location: 'after',
							message: uomValue.error,
						}}
					/>
					<Select
						id={`${schemaKey}Uom`}
						defaultValue={uomValue.value?.value ?? '30'}
						current={uomValue.value?.value ?? '30'}
						onChange={(e) => {
							handleChange(schemaKey, 'uom', e.target.value)
						}}>
						<option value=''>Select Option</option>
						<option value={1}>Days</option>
						<option value={7}>Weeks</option>
						<option value={30}>Months</option>
						<option value={365}>Years</option>
					</Select>
				</span>
				<span className='basis-full'>{children}</span>
			</div>
		</Fieldset>
	)
}
