import { Input, InputGroup } from '@/admin/_components/catalyst/input'

import z from 'zod'
import { Icon } from '~/components'
import type { NewData } from '..'

type FieldLinkProps = Omit<Props<typeof Input>, 'onBlur'> & {
	errors?: boolean
	onBlur?: (newData: NewData<string[] | null>) => void
}

export const FieldLink = ({ errors, onBlur, ...props }: FieldLinkProps) => {
	const handleBlur = (e: EFocus<HTMLInputElement>) => {
		const parsed = z
			.url('Invalid URL')
			.or(z.literal(''))
			.nullable()
			.safeParse(e.currentTarget.value)
		const newData = {} as NewData<string[] | null>

		if (parsed.success) {
			newData.data = parsed.data
			newData.errors = null
		} else {
			newData.data = null
			newData.errors = parsed.error.issues.map(err => err.message)
		}

		onBlur && onBlur(newData)
	}

	const { className, ...rest } = props

	return (
		<InputGroup className={className}>
			<Icon
				IconName='GlobeAltIcon'
				data-slot='icon'
			/>
			<Input
				onBlur={handleBlur}
				{...rest}
				placeholder='https://'
				invalid={errors ?? undefined}
				type='url'
			/>
		</InputGroup>
	)
}
