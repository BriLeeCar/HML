'use client'

import {
	Error,
	Field,
	FieldGroup,
	Input,
	Label,
	Select,
	Strong,
	type ElPrismaProps,
	type FieldElProps,
} from '@/data-collection/pathways'
import { zMinMax } from '~/server/api/routers/clientConstants'
import { FieldCost } from './CostField'
import { refresh } from './refresh'

export const MinMaxCostFieldGroup = ({
	error,
	data,
	handlePrisma,
	countries,
}: ElPrismaProps & {
	error?: boolean
	countries: Array<Queried.Country.WithRelations>
}) => {
	const currencyOptions = countries
		.filter(c => c.code === data.query.countryCode)
		.flatMap(c => c.currencies)

	const currencyOptionEls = () => {
		const currencies: {
			value: string
			label: string
			base: string
		}[] = []

		for (const currency of currencyOptions) {
			currencies.push({
				value: currency.code,
				label: `${currency.code} - ${currency.symbol}`,
				base: currency.code,
			})
		}

		return currencies
	}

	const currencies = currencyOptionEls()

	return (
		<FieldGroup
			data-invalid={error == true ? true : undefined}
			className='grid gap-x-8 md:grid-cols-[1fr_1fr_auto] md:*:[div]:mb-0'>
			<MinMaxCostField
				required
				label='Min'
				errorMessages={data.errors.cost.min}>
				<MinMaxInput
					data={data}
					keyMinMax='min'
					handlePrisma={handlePrisma}
				/>
			</MinMaxCostField>
			<MinMaxCostField
				label='Max'
				errorMessages={data.errors.cost.max}>
				<MinMaxInput
					data={data}
					keyMinMax='max'
					handlePrisma={handlePrisma}
				/>
			</MinMaxCostField>
			<MinMaxCostField
				required
				label='Currency'
				errorMessages={[]}>
				<Select
					defaultValue={data.query.currencyCode || ''}
					disabled={currencies.length === 0}
					name={`costUOM`}
					aria-label={`Cost UOM`}
					className='has-data-disabled:italic *:data-disabled:text-xs/loose'
					onChange={e => {
						const selectedCurrency = currencyOptions[e.target.selectedIndex]

						handlePrisma(refresh(data, 'currencyCode', selectedCurrency.code))
					}}>
					{currencies.length > 0 ?
						currencies.map(option => (
							<option
								key={option.base}
								value={option.value}>
								{option.label}
							</option>
						))
					:	<option
							key={''}
							value={''}>
							{'Select a Country'}
						</option>
					}
				</Select>
			</MinMaxCostField>
			<span className='row-start-3 mb-8 text-center italic opacity-65 md:col-span-full md:row-start-auto md:mb-0 md:text-xs/10'>
				If the <Strong>Max</Strong> cost is left blank, it will be assumed that the cost is a fixed
				value (<Strong>Min Value</Strong>).
			</span>
		</FieldGroup>
	)
}

const MinMaxCostField = ({ ...props }: FieldElProps) => {
	return (
		<Field data-invalid={props.errorMessages && props.errorMessages.length > 0 ? true : undefined}>
			<div
				className='grid items-center gap-x-4 gap-y-3 *:first:font-medium md:grid-cols-[0.25fr_1.75fr] md:*:first:text-end'
				data-slot='control'>
				<Label required={props.required}>{props.label}</Label>
				{props.children}
				<Error
					message={props.errorMessages}
					className='col-span-2'
				/>
			</div>
		</Field>
	)
}

const MinMaxInput = <T extends 'min' | 'max'>({
	data,
	keyMinMax,
	handlePrisma,
	...props
}: {
	data: Query
	keyMinMax: T
	handlePrisma: ElPrismaProps['handlePrisma']
} & Props<typeof Input>) => {
	const keyCasing = keyMinMax.charAt(0).toUpperCase() + keyMinMax.slice(1)

	return (
		<FieldCost
			data={data}
			cost={data.query.cost?.[keyMinMax] || 0}
			name={`cost${keyCasing}`}
			aria-label={`Cost ${keyCasing}`}
			{...props}
			onBlur={e => {
				const newData = { ...data }
				const parsed = zMinMax({}).safeParse({
					...newData.query.cost,
					[keyMinMax]: Number(e.target.value),
				})
				const fieldErrors = {
					min: [] as string[],
					max: [] as string[],
					base: [] as string[],
				}
				if (!parsed.success) {
					parsed.error.issues.forEach(issue => {
						const pathKey = issue.path[0] as keyof typeof fieldErrors
						if (pathKey == 'min' || pathKey == 'max') {
							fieldErrors[pathKey].push(issue.message)
						} else {
							fieldErrors['base'].push(issue.message)
						}
					})
				}
				newData.query.cost = {
					...newData.query.cost,
					[keyMinMax]: Number(e.target.value),
				}
				newData.errors.cost = fieldErrors
				handlePrisma(newData)
			}}
		/>
	)
}
