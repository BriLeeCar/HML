'use client'

import { Error, errors, Field, FieldGroup, Input, Label, Select } from '@/data-collection/pathways'
import z from 'zod/v4'

export const MinMaxCostFieldGroup = ({ pathwayData, dispatchAction }: ElProps) => {
	const baseData = pathwayData['cost']

	const handleData = ({ key, value }: { key: 'min' | 'max'; value: number | string }) => {
		const newData = { ...baseData }
		newData.value[key].value = Number(value)
		newData.value[key].error = []
		newData.error = []

		const parsed = z
			.preprocess(val => {
				return parseFloat(typeof val === 'string' ? val : String(val)).toFixed(2)
			}, z.coerce.number().nonnegative(errors.negative))
			.safeParse(newData.value[key].value)

		if (parsed.success) {
			newData.value[key].value = parsed.data
		} else {
			newData.value[key].error = parsed.error.issues.map(i => i.message)
		}

		if (newData.value.max.value > 0 && newData.value.min.value > newData.value.max.value) {
			newData.error.push(errors.minGtMax)
		} else {
			newData.error = []
		}

		dispatchAction({
			field: 'cost',
			payload: {
				...pathwayData.cost,
				value: newData.value,
				error: newData.error,
			},
		})
	}

	const currencyOptions = (pathwayData.countryId.value != null
		&& pathwayData.countryId.value != ''
		&& pathwayData.countriesWithPathways.find(c => c.abbr === pathwayData.countryId.value)?.api
			.currencies) || {
		'': { symbol: '', name: 'Select Currency', abbr: '' },
	}

	const currencyOptionEls = () => {
		const currencies = []
		for (const [key, cur] of Object.entries(
			pathwayData.countriesWithPathways.find(c => c.abbr === pathwayData.countryId.value)?.api
				.currencies || {}
		)) {
			currencies.push({
				value: key,
				label: `${key} (${cur.symbol})`,
				base: key,
			})
		}
		return currencies
	}

	const currencies = currencyOptionEls()

	return (
		<FieldGroup className='grid gap-x-8 md:grid-cols-3'>
			<Field>
				<div
					className='grid items-center gap-x-4 gap-y-3 *:first:font-medium md:grid-cols-[0.25fr_1.75fr] md:*:first:text-end'
					data-slot='control'>
					<Label>Min</Label>
					<Input
						defaultValue={baseData.value.min.value}
						name={`costMin`}
						aria-label={`Cost Min`}
						type='number'
						min={0.01}
						step={0.01}
						onBlur={e => {
							handleData({
								key: 'min',
								value: e.target.value,
							})
						}}
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
						name={`costMax`}
						aria-label={`Cost Max`}
						type='number'
						min={0.01}
						step={0.01}
						onBlur={e => {
							handleData({
								key: 'max',
								value: e.target.value,
							})
						}}
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
					<Label>Currency</Label>
					<Select
						defaultValue={pathwayData.costUom.value?.abbr || ''}
						disabled={currencies.length === 0}
						name={`costUOM`}
						aria-label={`Cost UOM`}
						onChange={e => {
							const selectedCurrency = currencyOptions[e.target.selectedIndex]

							dispatchAction({
								field: 'costUom',
								payload: {
									value: {
										abbr: selectedCurrency.abbr,
										currencySymbol: selectedCurrency.symbol,
									},
									error: [],
								},
							})
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
				</div>
			</Field>
		</FieldGroup>
	)
}
