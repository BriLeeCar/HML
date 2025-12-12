import { FormSubSection } from '@/admin/_components'
import { Checkbox, CheckboxField, Label } from '@/admin/_components/catalyst'
import { cn } from '~/lib/cn'
import { handleSeperateUOMChange, MinMaxTimeFieldGroup } from '.'

type Key = keyof Query['durations'] & keyof Query['query'] & keyof Query['errors']

export const TimeFieldGroup = ({
	data,
	handlePrisma,
	field,
}: {
	data: Query
	handlePrisma: (data: Query) => void
	field: Key
}) => (
	<MinMaxTimeFieldGroup
		data={data}
		error={data.errors[field].base?.length > 0}
		handlePrisma={handlePrisma}
		field={field}
		className={cn(
			'grid gap-x-8 sm:grid md:px-16',
			data.durations[field].separate ?
				'mx-auto md:max-w-min md:grid-cols-[200px_200px]'
			:	'md:grid-cols-3'
		)}
	/>
)

export const TimeSubSection = ({
	data,
	handlePrisma,
	field,
	heading,
	children,
}: {
	heading: {
		label: string
		legend: string
		description: React.ReactNode
	}
	data: Query
	handlePrisma: (data: Query) => void
	field: Key
	children: React.ReactNode
}) => {
	return (
		<FormSubSection
			aria-label={heading.label}
			legend={heading.legend}
			asDiv
			tooltip={heading.description as string}>
			<CheckboxField className='mt-1 pl-8 italic [&+div]:mt-2!'>
				<Checkbox
					color='brand'
					onChange={e => {
						handleSeperateUOMChange({
							field: field,
							newStatus: e,
							data,
							handlePrisma,
						})
					}}
				/>
				<Label className='text-interactive ml-2'>Use Separate UOM</Label>
			</CheckboxField>

			{children}
		</FormSubSection>
	)
}
