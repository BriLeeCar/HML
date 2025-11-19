import { ErrorMessage } from '../fieldset'

export const Error = ({
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
