import { cn } from '~/lib/cn'
import { Fieldset, Legend } from './fieldset'

export const FieldsetGroup = ({
	legendEl,
	...props
}: Props<'fieldset'> & {
	legendEl?: Props<'legend'> & { size?: 'sm' | 'lg' }
}) => {
	return (
		<Fieldset {...props}>
			<Legend
				{...legendEl}
				className={cn(
					'text-mulberry md:text-lg dark:text-[#E9EDF3]',
					legendEl?.size == 'lg' && 'md:text-2xl',
					legendEl?.className
				)}>
				{legendEl?.children}
			</Legend>
			{props.children}
		</Fieldset>
	)
}
