import { Button, Icon } from '~/components/index'

export const Buttons = ({
	handleSaveAction,
	handleCancelAction,
}: {
	handleSaveAction: () => void
	handleCancelAction: () => void
}) => (
	<div className='bg-background fixed right-0 bottom-0 left-0 z-10 flex flex-wrap items-stretch p-2 shadow-[-0px_-2px_8px_rgba(0,0,0,0.1),-0px_0px_6px_rgba(0,0,0,0.05)] md:justify-end md:gap-6 md:py-8 md:pr-8'>
		<Button
			className='w-max'
			onClick={handleSaveAction}>
			<Icon
				IconName='SaveIcon'
				solid
				data-slot='icon'
				className='h-4.5 w-4.5'
			/>
			Save Changes
		</Button>
		<Button
			onClick={handleCancelAction}
			className='w-max'
			variant='muted'>
			<Icon
				IconName='TrashXIcon'
				solid
				data-slot='icon'
				className='h-4.5 w-4.5'
			/>
			Discard Changes
		</Button>
	</div>
)
