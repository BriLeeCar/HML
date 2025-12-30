import { Text } from '@/admin/_components/catalyst'
import * as Headless from '@headlessui/react'
import { cn } from '~/lib/cn'

const sizes = {
	xs: 'sm:max-w-xs',
	sm: 'sm:max-w-sm',
	md: 'sm:max-w-md',
	lg: 'sm:max-w-lg',
	xl: 'sm:max-w-xl',
	'2xl': 'sm:max-w-2xl',
	'3xl': 'sm:max-w-3xl',
	'4xl': 'sm:max-w-4xl',
	'5xl': 'sm:max-w-5xl',
}

type types = ['info', 'warning', 'danger', 'success', '']

export function Alert({
	size = 'md',
	type = '',
	className,
	children,
	...props
}: {
	type?: types[number]
	size?: keyof typeof sizes
	className?: string
	children: ReactNode
} & Omit<Headless.DialogProps, 'as' | 'className'>) {
	return (
		<Headless.Dialog {...props}>
			<Headless.DialogBackdrop
				transition
				className='bg-foreground/25 fixed inset-0 z-998 flex w-screen justify-center overflow-y-auto px-2 py-2 transition duration-100 focus:outline-0 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in sm:px-6 sm:py-8 lg:px-8 lg:py-16 dark:bg-zinc-950/50'
			/>

			<div
				className='fixed inset-0 z-999 w-screen overflow-y-auto pt-6 sm:pt-0'
				data-type={type || undefined}>
				<div className='grid min-h-full grid-rows-[1fr_auto_1fr] justify-items-center p-8 sm:grid-rows-[1fr_auto_3fr] sm:p-4'>
					<Headless.DialogPanel
						transition
						className={cn(
							className,
							sizes[size],
							'bg-background ring-hml-slate-700/10 row-start-2 w-full rounded-2xl p-8 shadow-lg ring-1 sm:rounded-2xl sm:p-6 forced-colors:outline',
							'transition duration-100 will-change-transform data-closed:opacity-0 data-enter:ease-out data-closed:data-enter:scale-95 data-leave:ease-in'
						)}>
						{children}
					</Headless.DialogPanel>
				</div>
			</div>
		</Headless.Dialog>
	)
}

export function AlertTitle({
	className,
	...props
}: { className?: string } & Omit<Headless.DialogTitleProps, 'as' | 'className'>) {
	return (
		<Headless.DialogTitle
			{...props}
			className={cn(
				'text-foreground text-center text-base/6 font-semibold text-balance sm:text-left sm:text-lg/6 sm:text-wrap',
				'in-data-[type=danger]:text-interactive',
				className
			)}
		/>
	)
}

export function AlertDescription({
	className,
	...props
}: { className?: string } & Omit<Headless.DescriptionProps<typeof Text>, 'as' | 'className'>) {
	return (
		<Headless.Description
			as={Text}
			{...props}
			className={cn('mt-2 text-center font-medium text-pretty sm:text-left', className)}
		/>
	)
}

export function AlertBody({ className, ...props }: Props<'div'>) {
	return (
		<div
			{...props}
			className={cn(className, 'mt-4')}
		/>
	)
}

export function AlertActions({ className, ...props }: Props<'div'>) {
	return (
		<div
			{...props}
			className={cn(
				'mt-6 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:mt-4 sm:flex-row sm:*:w-auto',
				'*:data-[type=danger]:bg-hml-red-500 *:data-[type=danger]:hover:bg-hml-red-700',
				'dark:*:data-[type=danger]:hover:bg-hml-red-700 dark:*:data-[type=danger]:bg-hml-red-500',
				className
			)}
		/>
	)
}
