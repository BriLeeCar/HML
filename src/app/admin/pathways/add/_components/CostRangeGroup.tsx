import { FormError } from '@/admin/_components'
import { Field, Label, type Input } from '@/admin/_components/catalyst'
import type { ElPrismaProps, FieldElProps } from '@/admin/pathways/_lib/types'
import { zMinMax } from '~/server/api/zod'
import { FieldCost } from '..'

export const CostRangeFieldsGroup = ({ ...props }: FieldElProps & { disabled?: boolean }) => {
	return (
		<Field
			disabled={props.disabled ?? undefined}
			data-invalid={props.errorMessages && props.errorMessages.length > 0 ? true : undefined}>
			<div
				className='grid items-center gap-x-4 gap-y-3 *:first:font-medium md:grid-cols-[0.25fr_1.75fr] md:*:first:text-end'
				data-slot='control'>
				<Label
					required={props.required}
					className='whitespace-nowrap'>
					{props.label}
				</Label>
				{props.children}
				<FormError
					message={props.errorMessages}
					className='col-span-2'
				/>
			</div>
		</Field>
	)
}

export const CostInput = <T extends 'min' | 'max'>({
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
