export type FieldElProps = {
	label: string
	labelProps?: Props<'label'>
	required?: boolean
	errorMessages?: string[]
	children: ReactNode
	fieldProps?: Props<'div'>
	type?: 'add' | 'view'
	userId?: string | undefined
	currentId?: string | undefined
	currentRole?: string[] | undefined
	canEdit?: boolean
	readOnly?: boolean
}

export type ElPrismaProps = {
	data: Query
	handlePrisma: (data: ElPrismaProps['data']) => void
	type?: 'add' | 'view'
	canEdit?: boolean
	readOnly?: boolean
	defaultValue?: string | number
	showDefaults?: boolean
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

export type NoteKeys = {
	[key in keyof Query['query']]: Query['query'][key] extends (
		{
			counter: number
			note: string
		}[]
	) ?
		key
	:	never
}[keyof Query['query']]
