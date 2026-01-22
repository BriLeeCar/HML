import { TableHead, TableHeader, TableRow } from '@/admin/_components/catalyst/client/table'
import type { UserTable } from '../_lib/types'

const HeaderOptions = {
	name: () => <TableHeader>Name</TableHeader>,
	handle: () => <TableHeader>Handle</TableHeader>,
	edit: () => <TableHeader className='w-px'></TableHeader>,
	date: () => <TableHeader>Created</TableHeader>,
	custom: (label: string) => <TableHeader>{label}</TableHeader>,
	array: (label: string) => <TableHeader>{label}</TableHeader>,
}

type TableColumnKeys = Exclude<keyof typeof HeaderOptions, 'custom' | 'array'>
export type TableColumn =
	| TableColumnKeys
	| { key: 'custom'; label: string }
	| { key: 'array'; label: string; fn: (user: UserTable['user']) => string }

export const TableHeaderRow = ({
	rows,
	...props
}: Props<'tr'> & {
	rows: TableColumn[]
}) => {
	return (
		<TableHead>
			<TableRow {...props}>
				{rows.map(rowKey => {
					if (typeof rowKey === 'string') {
						const HeaderComponent = HeaderOptions[rowKey as TableColumnKeys]
						return <HeaderComponent key={rowKey} />
					} else if (rowKey.key === 'custom') {
						return (
							<CustomColumn
								key={rowKey.label}
								label={rowKey.label}
							/>
						)
					} else if (rowKey.key === 'array') {
						return (
							<CustomColumn
								key={rowKey.label}
								label={rowKey.label}
							/>
						)
					}
					return null
				})}
			</TableRow>
		</TableHead>
	)
}

const CustomColumn = ({ label }: { label: string }) => {
	return <TableHeader>{label}</TableHeader>
}
