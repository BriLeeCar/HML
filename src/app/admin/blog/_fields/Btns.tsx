import { Button, Icon } from '~/components'

const PublishBtn = () => (
	<BlogBtn
		icon='ArrowInUpRightStrokeSquareIcon'
		text='Publish'
		type='submit'
	/>
)

const DeleteBtn = () => (
	<BlogBtn
		icon='TrashXIcon'
		text='Delete'
		variant='bright'
		iconSolid
	/>
)

const SaveBtn = () => (
	<BlogBtn
		icon='SaveIcon'
		text='Save Draft'
		iconSolid
	/>
)

const PreviewBtn = () => (
	<BlogBtn
		icon='EyeIcon'
		text='Preview'
	/>
)

const BlogBtn = ({
	icon,
	text,
	iconSolid,
	type = 'button',
	variant,
}: {
	icon: IconKey
	iconSolid?: boolean
	text: string
	type?: 'button' | 'submit' | 'reset'
	variant?: 'default' | 'bright' | 'muted' | 'ghost'
}) => {
	return (
		<Button
			className='mb-2'
			type={type}
			variant={variant}>
			<Icon
				IconName={icon}
				solid={iconSolid}
				className='h-4.5 w-4.5'
				data-slot='icon'
			/>
			<span className='hidden md:block'>{text}</span>
		</Button>
	)
}

export const BlogBtns = () => {
	return (
		<>
			<div className='bg-background fixed right-0 bottom-0 left-0 z-10 flex flex-wrap items-stretch p-2 shadow-[-0px_-2px_8px_rgba(0,0,0,0.1),-0px_0px_6px_rgba(0,0,0,0.05)] md:justify-center md:gap-12 md:py-4'>
				<span className='flex grow justify-center gap-4 md:justify-end'>
					<PublishBtn />
					<SaveBtn />
					<PreviewBtn />
				</span>
				<span className='flex grow justify-center md:grow-0 md:pr-4'>
					<DeleteBtn />
				</span>
			</div>
		</>
	)
}
