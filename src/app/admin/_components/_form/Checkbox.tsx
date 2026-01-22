import * as CatalystCheckbox from '@/admin/_components/catalyst/checkbox'

// const noClick = (e: React.MouseEvent) => {
// 	e.preventDefault()
// }

type AdminCheckboxProps<T extends keyof typeof CatalystCheckbox> = Props<
	(typeof CatalystCheckbox)[T]
> & {
	readOnly?: boolean
}

export const Checkbox = ({ readOnly, ...props }: AdminCheckboxProps<'Checkbox'>) => {
	return (
		<CatalystCheckbox.Checkbox
			data-disabled={readOnly == true ? '' : undefined}
			{...props}
			aria-readonly={readOnly == true ? 'true' : undefined}
			data-readonly={readOnly == true ? '' : undefined}
		/>
	)
}

export const CheckboxField = ({ ...props }: AdminCheckboxProps<'CheckboxField'>) => {
	return <CatalystCheckbox.CheckboxField {...props} />
}

export const CheckboxGroup = ({ ...props }: AdminCheckboxProps<'CheckboxGroup'>) => {
	return <CatalystCheckbox.CheckboxGroup {...props} />
}
