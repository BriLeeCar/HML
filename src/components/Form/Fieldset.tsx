import { cn } from '~/lib/cn'

export const Fieldset = ({
	legend,
	desc,
	...props
}: Props<'fieldset'> & {
	legend?: React.ReactNode
	desc?: React.ReactNode
}) => {
	return (
		<fieldset
			{...props}
			className={cn(
				'border-border/30 flex w-full gap-4 rounded-md border-1'
			)}>
			<LegendAndDesc
				legend={legend}
				desc={desc}
			/>

			<div
				className={cn(
					'm-4 mt-0 flex w-full flex-col gap-4',
					'*:w-full',

					// ! LABELS
					'*:data-[slot="label"]:w-32 *:data-[slot="label"]:justify-end *:data-[slot="label"]:font-semibold'
				)}>
				{props.children}
			</div>
		</fieldset>
	)
}

export const Legend = ({ ...props }) => {
	return (
		<legend
			{...props}
			data-slot='legend'
			className='ml-8 px-4 text-lg font-bold'
		/>
	)
}

export const FieldsetDesc = ({ ...props }) => {
	return (
		<span
			className='text-muted-foreground mt-2 ml-12 block w-md text-sm italic'
			{...props}
			data-slot='fieldset-desc'
		/>
	)
}

const LegendAndDesc = ({
	legend,
	desc,
}: {
	legend?: React.ReactNode
	desc?: React.ReactNode
}) => {
	if (legend && desc)
		return (
			<>
				<Legend>{legend}</Legend>
				<FieldsetDesc>{desc}</FieldsetDesc>
			</>
		)
	if (legend) return <Legend>{legend}</Legend>
	if (desc) return <FieldsetDesc>{desc}</FieldsetDesc>
	return <></>
}

export const FormField = ({ ...props }) => {
	return (
		<span
			{...props}
			data-slot='field'
			className={cn(
				'grid grid-cols-[100px_auto] items-baseline',
				'gap-4 *:data-[slot="label"]:w-[100px] *:data-[slot="label"]:justify-end *:data-[slot="label"]:font-semibold'
			)}
		/>
	)
}

export const FormRow = ({ ...props }: Props<'span'>) => {
	return (
		<span
			{...props}
			className={cn('mt-4 flex w-full gap-x-8', props.className)}
		/>
	)
}
