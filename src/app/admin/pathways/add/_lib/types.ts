export type FieldElProps = {
	label: string
	labelProps?: Props<'label'>
	required?: boolean
	errorMessages?: string[]
	children: ReactNode
	fieldProps?: Props<'div'>
}

export type ElPrismaProps = {
	data: Query
	handlePrisma: (data: ElPrismaProps['data']) => void
}

export type NewData<E extends string[] | null> =
	E extends null ?
		{
			errors: null
			data: string
		}
	:	{
			errors: string[]
			data: null
		}
