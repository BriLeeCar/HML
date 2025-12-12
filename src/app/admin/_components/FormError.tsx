import { cn } from '~/lib/cn'
import { ErrorMessage } from './catalyst/'

export const FormError = ({
	message,
	...props
}: Props<typeof ErrorMessage> & {
	message?: string | string[]
	safeNull?: boolean
}) => {
	return (
		message
		&& message.length > 0 && (
			<ErrorMessage
				{...props}
				children={
					Array.isArray(message) ?
						message.map((msg, idx) => (
							<span key={idx}>
								{msg}
								{idx < message.length - 1 && <br />}
							</span>
						))
					:	message
				}
			/>
		)
	)
}

export const FormGroupError = ({
	message,
	...props
}: Props<'span'> & {
	message?: string | string[]
	safeNull?: boolean
}) => {
	return (
		message
		&& message.length > 0 && (
			<span
				data-slot='error'
				{...props}
				className={cn(
					'relative -top-3 h-0 text-base/6 text-red-600 data-disabled:opacity-50 sm:text-sm/6 dark:text-red-500',
					props.className
				)}>
				{message}
			</span>
		)
	)
}
