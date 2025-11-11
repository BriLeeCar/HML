import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
} from 'react'
import z from 'zod/v4'
import { cn } from '~/lib/cn'
import { DB } from '~/server/db/db'
import { errors } from '../validation'
import { Fieldset, InputBase, Label, Legend, Select } from './Form'
import { tPathwayForm } from './schema'

// #region ! -------------------- Duration Keys
export type tCurrencyKeys = 'documentCost' | 'applicationCost'

export const costStateInit = {
	applicationCost: {
		min: { value: 0, error: null },
		max: { value: null, error: null },
		uom: { value: null, error: null },
	},
	documentCost: {
		min: { value: 0, error: null },
		max: { value: null, error: null },
		uom: { value: null, error: null },
	},
}
// #endregion ! --------------------

// #region ! -------------------- Zod Schemas
/**
 * Cost Range Schema using non-negative numbers with 2 decimal places
 */
export const zCostRange = z.object({
	min: z.number().nonnegative().multipleOf(0.01),
	max: z.number().nonnegative().multipleOf(0.01).optional(),
	currency: z.string().length(3, errors.strExact(3)).toUpperCase(),
})

const zMinCost = zCostRange.shape.min
const zMaxCost = zCostRange.shape.max
const zCurrency = zCostRange.shape.currency
// #endregion ! --------------------

export const validateCurrency = (
	schemaKey: tCurrencyKeys,
	rangeKey: 'min' | 'max' | 'uom',
	value: string | number | undefined,
	setPathway: Dispatch<SetStateAction<tPathwayForm>>,
	pathway: tPathwayForm,
	customError?: string
) => {
	const parsed =
		rangeKey == 'uom' ? zCurrency.safeParse(value)
		: rangeKey == 'min' ? zMinCost.safeParse(value)
		: zMaxCost.safeParse(value)

	if (value == undefined || value == null || value === '') {
		setPathway(
			Object.assign(
				{},
				{
					...pathway,
					[schemaKey]: {
						...pathway[schemaKey],
						[rangeKey]: {
							value: null,
							error: null,
						},
					},
				}
			)
		)
	} else if (customError) {
		setPathway(
			Object.assign(
				{},
				{
					...pathway,
					[schemaKey]: {
						...pathway[schemaKey],
						[rangeKey]: {
							value: null,
							error: customError,
						},
					},
				}
			)
		)
		return
	} else if (parsed.success) {
		setPathway(
			Object.assign(
				{},
				{
					...pathway,
					[schemaKey]: {
						...pathway[schemaKey],
						[rangeKey]: {
							value: parsed.data,
							error: null,
						},
					},
				}
			)
		)
	} else {
		setPathway(
			Object.assign(
				{},
				{
					...pathway,
					[schemaKey]: {
						...pathway[schemaKey],
						[rangeKey]: {
							value: null,
							error: parsed.error.issues[0].message,
						},
					},
				}
			)
		)
	}
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
	schemaKey: tCurrencyKeys
	innerKey: 'min' | 'max' | 'uom'
	handleChange: (
		schemaKey: tCurrencyKeys,
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
			{...props}
			label={label}
			schemaKey={schemaKey}
			htmlFor={htmlFor}
			onBlur={(e) =>
				handleChange(schemaKey, innerKey, e.target.value)
			}
			type='number'
			min={0}
			error={{
				location: 'after',
				message: pathway[schemaKey][innerKey]?.error,
			}}
		/>
	)
}

export const CurrencyGrp = ({
	countryCode,
	db,
	label,
	schemaKey,
	pathway,
	handleChange,
	children,
	wrapperClassName,
}: {
	countryCode: ApiData.PreCountryApi['abbr']
	db: DB
	label: string
	schemaKey: tCurrencyKeys
	pathway: tPathwayForm
	handleChange: (
		schemaKey: tCurrencyKeys,
		innerKey: 'min' | 'max' | 'uom',
		val: string | undefined
	) => void
	children?: ReactNode
	wrapperClassName?: string
}) => {
	const currencies =
		Object.keys(
			db.getCountryByAbbr(countryCode)?.api.currencies ?? []
		) ?? []

	const defaultValue =
		(pathway[schemaKey].uom.value ?? currencies.length == 1) ?
			currencies[0]
		:	undefined

	console.log(currencies, currencies.length, defaultValue)
	return (
		<Fieldset className='flex flex-col gap-4'>
			<Legend className='text-lg font-medium'>{label}</Legend>
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
					innerKey='min'
					pathway={pathway}
					id={`${schemaKey}Min`}
					htmlFor={`${schemaKey}Min`}
				/>
				<RangeInput
					type='number'
					label='Maximum'
					handleChange={handleChange}
					schemaKey={schemaKey}
					innerKey='max'
					pathway={pathway}
					id={`${schemaKey}Max`}
					htmlFor={`${schemaKey}Max`}
				/>
				<span className='flex basis-full flex-col gap-1'>
					<Label
						htmlFor={`${schemaKey}Uom`}
						label='UOM'
						error={{
							location: 'after',
							message: pathway[schemaKey].uom?.error,
						}}
					/>
					<Select
						value={
							currencies.length == 1 ? currencies[0] : defaultValue
						}
						onChange={(e) => {
							handleChange(schemaKey, 'uom', e.target.value)
						}}
						id={`${schemaKey}Uom`}
						disabled={currencies.length == 0}>
						{currencies.length != 1 && (
							<option value=''>
								{currencies.length == 0 ?
									'Select a Country'
								:	'Select Option'}
							</option>
						)}
						{currencies.map((cur) => (
							<option
								key={cur}
								value={cur}>
								{cur}
							</option>
						))}
					</Select>
				</span>
				<span className='col-span-full'>{children}</span>
			</div>
		</Fieldset>
	)
}
