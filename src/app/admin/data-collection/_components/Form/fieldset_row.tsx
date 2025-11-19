import { cn } from '~/lib/cn'
import { Description, Field, Label } from './fieldset'

export const FieldRow = ({
	children,
	columns,
	...props
}: Props & { columns?: number }) => {
	if (columns) {
	}

	return (
		<div
			{...props}
			className={cn(props.className)}>
			{children}
		</div>
	)
}

/* 
export const FieldRow = ({
    children,
    columns,
    ...props
}: Props & { columns?: number }) => {
    return (
        <div
            data-form='field-row'
            data-type='layout'
            data-level='row'
            {...props}
            className={cn(
                'grid gap-8',
                'grid-cols-1',
                'max-sm:*:col-span-1',
                `md:grid-cols-${columns ?? 2}`,
                props.className
            )}>
            {children}
        </div>
    )
}
*/

export const FieldRowHeading = ({
	children,
	description,
	...props
}: Props<'label'> & {
	description?: string
}) => {
	return (
		<div>
			<Label
				data-type='heading'
				data-level='row'
				{...props}
				className={cn(
					'flex items-center gap-x-4',
					'text-lg/6',
					'md:text-sm/6 md:font-medium md:tracking-wider md:uppercase md:italic',
					'font-semibold',
					'mt-4',
					'[&~[data-level="fieldset"]>[data-level="field"]>label]:md:text-xs',
					'[&~[data-level="fieldset"]>[data-level="field"]>label]:font-bold',
					'[&~[data-level="fieldset"]>[data-level="field"]>label]:max-md:pl-2',
					'md:[&~[data-level="fieldset"]>[data-level="field"]]:flex',
					'[&~[data-level="fieldset"]>[data-level="field"]]:gap-x-2',
					'[&~[data-level="fieldset"]>[data-level="field"]]:items-baseline',
					'max-md:[&~[data-level="fieldset"]>[data-level="field"]]:mb-0',
					'[&~[data-level="fieldset"]:has(>[data-level="field"])]:mt-0',
					'[&>div+[data-level="fieldset"]:has(>[data-level="field"])]:md:mt-2',
					props.className
				)}>
				{children}
			</Label>
			{description && (
				<FieldRowDescription className='text-balance'>
					{description}
				</FieldRowDescription>
			)}
		</div>
	)
}

export const FieldRowDescription = ({
	children,
	...props
}: Props<'p'>) => {
	return (
		<Field
			{...props}
			className={cn(
				'mt-0 *:italic md:*:text-center',
				props.className
			)}>
			<Description>{children}</Description>
		</Field>
	)
}
