import { Icon } from '@/components/Icon'
import type { AdminViewServerProps } from 'payload'
import ViewWrapper from '../ViewWrapper'

export const CustomAvatar = () => (
	<Icon
		IconName='UserCircleIcon'
		solid
		className='hover:text-hml-slate transition-all dark:hover:text-hml-yellow text-current'
	/>
)

const HubsViewComponent = ({ ...props }: AdminViewServerProps) => {
	return (
		<ViewWrapper
			{...props}
			title='Hubs Overview'>
			Yo
		</ViewWrapper>
	)
}

export default HubsViewComponent
