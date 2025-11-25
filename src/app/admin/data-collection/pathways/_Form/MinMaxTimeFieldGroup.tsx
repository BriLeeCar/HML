'use client'
import { Error, Field, FieldGroup, Input, Label, Select } from '@/data-collection/pathways'
import z from 'zod/v4'
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
		field: 'renewableDuration' | 'duration' | ('processingTime' & keyof Pathways)
	}) => {
	const parseNumber = (val: string) => {
		const parsedNumber = z.coerce
			.number()
			.nonnegative("Negative time spans don't exist")
			.refine(num => num % 1 == 0, 'Must be a whole number')
			.safeParse(val)

		return {
			value: parsedNumber.success ? parsedNumber.data : parseInt(val),
			error: parsedNumber.success ? [] : parsedNumber.error.issues.map(issue => issue.message),
		}
	}

	return (
		<FieldGroup {...props}>
			<Field>
				<div
					className='grid items-center gap-x-4 *:first:font-medium md:grid-cols-[0.25fr_1.75fr] md:*:first:text-end'
					data-slot='control'>
					<Label>Min</Label>
					<Input
						defaultValue={pathwayData[field].value.min.value}
						name={`${field}Min`}
						aria-label={`${toTitleCase(field)} Min`}
						type='number'
						min={0}
						step={1}
						onBlur={e => {
							dispatch({
								field: field,
								payload: {
									...pathwayData[field],
									value: {
										...pathwayData[field].value,
										min: {
											...parseNumber(e.target.value),
										},
									},
								},
							})
						}}
						placeholder='0'
					/>
					<Error
						className='col-start-2 px-2 text-xs italic'
						message={pathwayData[field].value.min.error}
					/>
				</div>
			</Field>
			<Field>
				<div
					className='grid items-center gap-x-4 *:first:font-medium md:grid-cols-[0.25fr_1.75fr] md:*:first:text-end'
					data-slot='control'>
					<Label>Max</Label>
					<Input
						defaultValue={pathwayData[field].value.max.value}
						name={`${field}Max`}
						aria-label={`${toTitleCase(field)} Max`}
						type='number'
						min={0}
						step={1}
						onBlur={e => {
							dispatch({
								field: field,
								payload: {
									...pathwayData[field],
									value: {
										...pathwayData[field].value,
										max: {
											...parseNumber(e.target.value),
										},
									},
								},
							})
						}}
						placeholder='0'
					/>
					<Error
						message={pathwayData[field].value.max.error}
						className='col-start-2 px-2 text-xs italic'
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
							selected: true,
						}}
						defaultValue={pathwayData[field].value.uom.value.value}
						onChange={e => {
							dispatch({
								field: field,
								payload: {
									...pathwayData[field],
									value: {
										...pathwayData[field].value,
										uom: {
											value: {
												base: timeOptionEls[e.target.selectedIndex - 1].base,
												value: parseInt(e.target.value),
												label: timeOptionEls[e.target.selectedIndex - 1].label,
											},
											error: [],
										},
									},
								},
							})
						}}>
						{timeOptionEls.map(option => (
							<option
								key={option.base}
								value={option.value}>
								{option.label}
							</option>
						))}
					</Select>
					<Error message={pathwayData[field].value.uom.error} />
				</div>
			</Field>
		</FieldGroup>
	)
}

export type MinMaxTimeDispatchProps<
	K extends 'min' | 'max' | 'uom',
	D extends 'renewableDuration' | 'duration' | 'processingTime',
> = {
	key: K
	value: K extends 'min' | 'max' ? number | string
	:	{
			base: string | null
			value: number
			label: string
		}
	thisData: D extends 'renewableDuration' ? Pathways['renewableDuration']
	: D extends 'duration' ? Pathways['duration']
	: D extends Pathways['processingTime'] ? Pathways['processingTime']
	: never
}
