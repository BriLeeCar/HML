import { Field, Input, InputGroup } from '@/admin/_components/catalyst'
import { api } from '~/clientQuery'
import { Icon } from '~/components/Icon'
import { ThisLabelEl } from './LabelEl'

export const CheckSecretInput = ({
	handleSecretCheck,
	userId,
}: {
	handleSecretCheck: (canEdit: boolean) => void
	userId: string
}) => {
	const hey = api.useUtils()

	const checkSecret = async (inpt: string) =>
		await hey.user.checkSecret.fetch({
			secret: inpt,
			userId: userId,
		})

	return (
		<Field className='col-span-full lg:col-span-1'>
			<ThisLabelEl>Current Password</ThisLabelEl>
			<InputGroup>
				<Icon
					IconName='KeyIcon'
					data-slot='icon'
				/>
				<Input
					type='password'
					name='secret'
					autoComplete='current-password'
					onChange={async e => handleSecretCheck(await checkSecret(e.currentTarget.value))}
				/>
			</InputGroup>
		</Field>
	)
}
