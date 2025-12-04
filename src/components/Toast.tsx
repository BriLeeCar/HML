import { AnimatePresence, motion } from 'motion/react'

import { type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { Icon } from '~/components'
import { cn } from '~/lib/cn'
import type { ToastTypes } from '~/lib/useToast'

type UniversalProps = {
	type: ToastTypes
}

export const Toast = ({
	title,
	body,
	type,
	show,
	closeNotify,
	...props
}: Props<'div'> & {
	title?: string
	body: ReactNode
	show: boolean
	closeNotify: () => void
} & UniversalProps) => {
	return (
		<AnimatePresence>
			<OuterWrapper
				{...props}
				className={cn(
					// ! ERROR
					type == 'error'
						&& cn(
							'**:[*:is([data-toast="container"])]:bg-red-50',
							'**:[*:is([data-toast="container"])]:outline-red-500/30',
							'**:[*:is([data-toast="container"])]:text-red-800',
							'**:[*:is([data-toast="icon"])]:text-red-500',
							'**:[*:is([data-toast="closeIcon"])]:text-red-700',
							'**:[*:is([data-toast="closeIcon"])]:hover:text-red-500'
						),
					// ! WARNING
					type == 'warning'
						&& cn(
							'**:[*:is([data-toast="container"])]:bg-orange-50',
							'**:[*:is([data-toast="container"])]:outline-orange-600/30',
							'**:[*:is([data-toast="container"])]:text-orange-800',
							'**:[*:is([data-toast="icon"])]:text-orange-400',
							'**:[*:is([data-toast="closeIcon"])]:text-orange-700',
							'**:[*:is([data-toast="closeIcon"])]:hover:text-orange-400'
						),
					// ! SUCCESS
					type == 'success'
						&& cn(
							'**:[*:is([data-toast="container"])]:bg-emerald-50',
							'**:[*:is([data-toast="container"])]:outline-emerald-500/30',
							'**:[*:is([data-toast="container"])]:text-emerald-800',
							'**:[*:is([data-toast="icon"])]:text-emerald-500',
							'**:[*:is([data-toast="closeIcon"])]:text-emerald-700',
							'**:[*:is([data-toast="closeIcon"])]:hover:text-emerald-500'
						),
					// ! INFO
					type == 'info'
						&& cn(
							'**:[*:is([data-toast="container"])]:bg-neutral-50',
							'**:[*:is([data-toast="container"])]:outline-neutral-500/30',
							'**:[*:is([data-toast="container"])]:text-neutral-800',
							'**:[*:is([data-toast="icon"])]:text-neutral-500',
							'**:[*:is([data-toast="closeIcon"])]:text-neutral-700',
							'**:[*:is([data-toast="closeIcon"])]:hover:text-neutral-500'
						),
					props.className
				)}>
				{show && (
					<motion.div
						key={'toast'}
						className='w-full max-w-sm transition-transform'
						style={{
							opacity: 0,
							x: 20,
						}}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 20 }}>
						<InnerWrapper>
							<IconBlock type={type} />
							<ContentWrapper
								body={body}
								title={title}
							/>
							<CloseBtn setShow={() => closeNotify()} />
						</InnerWrapper>
					</motion.div>
				)}
			</OuterWrapper>
		</AnimatePresence>
	)
}

const IconBlock = ({ type }: UniversalProps) => {
	const iconInfo: {
		[key in UniversalProps['type']]: {
			IconName: IconKey
			solid: boolean
		}
	} = {
		success: {
			IconName: 'CheckCircleIcon',
			solid: true,
		},
		error: {
			IconName: 'BlockIcon',
			solid: true,
		},
		warning: {
			IconName: 'AlertTriangleIcon',
			solid: true,
		},
		info: {
			IconName: 'InfoCircleIcon',
			solid: true,
		},
	}

	return (
		<div className='shrink-0'>
			<Icon
				IconName={iconInfo[type].IconName as IconKey}
				aria-hidden='true'
				{...(iconInfo[type].solid ? { solid: true } : {})}
				data-toast='icon'
				data-type={type}
			/>
		</div>
	)
}

const OuterWrapper = ({ ...props }: Props) => (
	<div
		{...props}
		aria-live='assertive'
		className={cn(
			'pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6',
			props.className
		)}>
		<div className='flex w-full flex-col items-center space-y-4 sm:items-end'>{props.children}</div>
	</div>
)

const InnerWrapper = ({ children }: { children: ReactNode }) => (
	<div
		data-toast='container'
		className={cn('pointer-events-auto w-full max-w-sm rounded-lg shadow-lg outline-1')}>
		<div className='p-4 pb-6'>
			<div className='flex items-start'>{children}</div>
		</div>
	</div>
)

const CloseBtn = ({ setShow }: { setShow: Dispatch<SetStateAction<boolean>> }) => {
	return (
		<div className='ml-4 flex shrink-0'>
			<button
				type='button'
				onClick={() => {
					setShow(false)
				}}
				className='click inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600'
				data-toast='closeIcon'>
				<span className='sr-only'>Close</span>
				<Icon
					IconName='XIcon'
					aria-hidden='true'
					className='size-5'
				/>
			</button>
		</div>
	)
}

const ContentWrapper = ({ body, title }: { body: ReactNode; title?: string }) => (
	<div className='ml-3 w-0 flex-1'>
		{title && <NotifyTitle>{title}</NotifyTitle>}
		<NotifyBody>{body}</NotifyBody>
	</div>
)

const NotifyTitle = ({ children }: { children: ReactNode }) => (
	<p
		className='mb-1 text-base font-medium'
		data-toast='title'>
		{children}
	</p>
)

const NotifyBody = ({ children }: { children: ReactNode }) => (
	<p
		className='text-sm italic'
		data-toast='body'>
		{children}
	</p>
)
