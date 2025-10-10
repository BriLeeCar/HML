'use client'
import type { ComponentPropsWithRef } from 'react'
import { cn } from '~/lib/cn'
import { Icon } from '../Icon'

const css = {
	withWrapper: {
		wrapper: cn(
			'border-input/20 focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
			'[*:has(input:disabled)]:bg-current/25 [*:has(input:disabled)]:opacity-50'
		),
		base: cn(
			'border-0 px-0 outline-none focus:ring-0 disabled:bg-transparent'
		),
	},
	wrapper: cn('border-input/20'),
	base: cn(
		'selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md border-[1.5px] bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none',
		'file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
		'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-current/25 disabled:opacity-50 md:text-sm'
	),
	focusInput: cn(
		'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
		'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
	),
	inputOnly: cn('placeholder:text-muted-foreground border-input/20'),
}

export const Input = ({
	className,
	type,
	text,
	icon,
	...props
}: ComponentPropsWithRef<'input'> & {
	type?: string
	text?: {
		before?: string
		after?: string
	}
	icon?: {
		before?: IconKey
		after?: IconKey
	} & Props<'svg'>
}) => {
	if (text) {
		return (
			<WithText
				text={text}
				{...props}
				type={type}
			/>
		)
	}
	if (icon) {
		return (
			<WithIcon
				icon={icon}
				{...props}
				type={type}
			/>
		)
	}
	return (
		<BaseInput
			{...props}
			type={type}
			className={cn(css.focusInput, css.inputOnly, className)}
		/>
	)
}

const BaseInput = ({ ...props }) => (
	<input
		{...props}
		id={
			props.id ? props.id
			: props.name ?
				props.name
			:	undefined
		}
		name={
			props.name ? props.name
			: props.id ?
				props.id
			:	undefined
		}
		autoComplete={props.autoComplete ?? 'off'}
		data-slot='input'
		className={cn(css.base, props.className)}
	/>
)

const InputWithBeforeWrapper = ({ ...props }) => {
	return (
		<div
			{...props}
			className={cn(
				css.withWrapper.wrapper,
				'relative flex items-center',
				css.base
			)}
		/>
	)
}

const WithText = ({
	text,
	...props
}: ComponentPropsWithRef<'input'> & {
	text: { before?: string; after?: string }
}) => (
	<InputWithBeforeWrapper className='gap-2'>
		{text.before && (
			<BeforeAfterWrapper className='pr-1'>
				{text.before}
			</BeforeAfterWrapper>
		)}
		<BaseInput
			{...props}
			type={props.type}
			className={cn(css.withWrapper.base, props.className)}
		/>
		{text.after && (
			<BeforeAfterWrapper>{text.after}</BeforeAfterWrapper>
		)}
	</InputWithBeforeWrapper>
)

const WithIcon = ({
	icon,
	...props
}: Props<'input'> & {
	icon: { before?: IconKey; after?: IconKey } & Props<'svg'>
}) => {
	const { before, after, ...rest } = icon

	return (
		<InputWithBeforeWrapper className='gap-2'>
			{before && (
				<BeforeAfterWrapper className='pr-1'>
					<Icon
						{...rest}
						IconName={before}
						className='h-4 w-4'
					/>
				</BeforeAfterWrapper>
			)}
			<BaseInput
				{...props}
				type={props.type}
				className={cn(css.withWrapper.base, props.className)}
			/>
			{after && (
				<BeforeAfterWrapper>
					<Icon
						{...rest}
						IconName={after}
						className='h-4 w-4'
					/>
				</BeforeAfterWrapper>
			)}
		</InputWithBeforeWrapper>
	)
}

const BeforeAfterWrapper = ({ ...props }: Props<'span'>) => (
	<span
		{...props}
		className={cn('text-muted-foreground text-sm', props.className)}>
		{props.children}
	</span>
)
