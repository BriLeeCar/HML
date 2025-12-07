import { FormError } from '@/admin/_components'
import { Field, FieldGroup, Input, InputGroup, Label, Select } from '@/admin/_components/catalyst'
import { Icon } from '~/components'
import { toTitleCase } from '~/lib/text'
import { zMinMax } from '~/server/api/zod'
import type { ElPrismaProps, FieldElProps, PrismaQuery } from '..'

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
	error,
	data,
	handlePrisma,
	field,
	...props
}: ElPrismaProps
	& Props & {
		error: boolean
		field: 'processTime' | 'duration'
	}) => {
	const handleUOM = (value: string | number, key: 'min' | 'max' | 'uom') => {
		const newData = { ...data }
		if (!newData.query[field] || !newData.durations[field]) {
			newData.query[field] = {
				min: 0,
				max: 0,
				note: '',
			}
			newData.durations[field] = 1
		}

		const base = newData.durations[field]

		if (key == 'uom') {
			newData.durations[field] = Number(value)
		} else {
			newData.query[field][key] = Number(value)
		}

		newData.query[field].max = (newData.query[field].max / base) * newData.durations[field]
		newData.query[field].min = (newData.query[field].min / base) * newData.durations[field]

		const parsed = zMinMax({
			wholeNumberOnly: true,
		}).safeParse(newData.query[field])
		if (parsed.success) {
			newData.errors[field] = { min: [], max: [], base: [] }
		} else {
			const fieldErrors = { min: [], max: [], base: [] } as {
				min: string[]
				max: string[]
				base: string[]
			}
			parsed.error.issues.forEach(issue => {
				const pathKey = issue.path[0] as keyof typeof fieldErrors
				if (pathKey == 'min' || pathKey == 'max') {
					fieldErrors[pathKey].push(issue.message)
				} else {
					fieldErrors['base'].push(issue.message)
				}
			})
			newData.errors[field] = fieldErrors
		}

		return newData
	}

	return (
		<FieldGroup
			{...props}
			data-invalid={error == true ? true : undefined}>
			<MinMaxTimeField
				required
				label='Min'
				errorMessages={data.errors[field].min}>
				<MinMaxInput
					field={field}
					keyMinMax='min'
					data={data}
					handleData={(value: string) => {
						handlePrisma(handleUOM(value, 'min'))
					}}
				/>
			</MinMaxTimeField>
			<MinMaxTimeField
				required
				label='Max'
				errorMessages={data.errors[field].max}>
				<MinMaxInput
					field={field}
					keyMinMax='max'
					data={data}
					handleData={value => {
						handlePrisma(handleUOM(value, 'max'))
					}}
				/>
			</MinMaxTimeField>
			<Field>
				<div
					className='grid items-center gap-x-4 gap-y-3 *:first:font-medium md:grid-cols-[0.25fr_1.75fr] md:*:first:text-end'
					data-slot='control'>
					<Label required>UOM</Label>
					<Select
						name={`${field}UOM`}
						aria-label={`${toTitleCase(field)} UOM`}
						className='text-muted-foreground'
						placeholder={{
							label: '----- Select UOM -----',
							value: 0,
							selected: true,
						}}
						defaultValue={data.durations[field] ?? undefined}
						onChange={e => {
							handlePrisma(handleUOM(e.currentTarget.value, 'uom'))
						}}>
						{timeOptionEls.map(option => (
							<option
								key={option.base}
								value={option.value}>
								{option.label}
							</option>
						))}
					</Select>
				</div>
			</Field>

			{data.errors[field].base?.length > 0 && (
				<Field className='col-span-3 mt-0 text-center font-medium italic *:text-sm/12'>
					<FormError message={data.errors[field].base} />
				</Field>
			)}
		</FieldGroup>
	)
}

const MinMaxTimeField = ({ ...props }: FieldElProps) => {
	return (
		<Field>
			<div
				className='grid items-center gap-x-4 gap-y-3 *:first:font-medium md:grid-cols-[0.25fr_1.75fr] md:*:first:text-end'
				data-slot='control'>
				<Label required={props.required}>{props.label}</Label>
				{props.children}
				<FormError
					message={props.errorMessages}
					className='col-span-2'
				/>
			</div>
		</Field>
	)
}

const MinMaxInput = <K extends 'processTime' | 'duration' | 'cost', T extends 'min' | 'max'>({
	keyMinMax,
	handleData,
	data,
	field,
	...props
}: {
	field: K
	keyMinMax: T
	handleData: (value: string) => void
	data: PrismaQuery
} & Props<typeof Input>) => {
	const keyCasing = keyMinMax.charAt(0).toUpperCase() + keyMinMax.slice(1)

	const fieldCasing = field
		.replaceAll(/([A-Z])/g, ' $1')
		.split(' ')
		.map(c => c[0].toUpperCase() + c.slice(1))
		.join(' ')

	return (
		<InputGroup>
			<Icon
				IconName='CalendarAltIcon'
				data-slot='icon'
			/>
			<Input
				invalid={data.errors[field][keyMinMax]?.length > 0 ? true : undefined}
				{...props}
				placeholder='0'
				defaultValue={data.query[field] && data.query[field][keyMinMax]}
				name={`${field}${keyCasing}`}
				aria-label={`${fieldCasing} ${keyCasing}`}
				type='number'
				min={0}
				step={1}
				onBlur={e => {
					handleData(e.target.value)
				}}
			/>
		</InputGroup>
	)
}
