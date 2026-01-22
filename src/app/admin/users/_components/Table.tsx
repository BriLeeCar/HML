import { TableBody } from '@/admin/_components/catalyst/client/table'
import type { UserTable } from '../_lib/types'
import { TableCellOptions } from './TableCells'
import { TableHeaderRow, type TableColumn } from './TableHeaders'

const CellComponent = <C extends TableColumn>({
	column,
	...props
}: UserTable & {
	column: C
	fn?: (user: UserTable['user']) => string
}) => {
	if (typeof column == 'string' && column == 'array') {
		const Cell = TableCellOptions['array']
		return props.fn ?
				<Cell
					fn={props.fn}
					user={props.user}
				/>
			:	<></>
	} else if (typeof column == 'string' && column != 'array') {
		const Cell = TableCellOptions[column as Exclude<keyof typeof TableCellOptions, 'array'>]
		return Cell ? <Cell user={props.user} /> : <></>
	}
}

export const TableDetails = ({
	columns,
	rows,
}: {
	columns: TableColumn[]
	rows: UserTable['user'][]
}) => {
	return (
		<>
			<TableHeaderRow rows={columns} />
			<TableBody>
				{rows.map(user => {
					const key = typeof user.id === 'string' ? user.id : JSON.stringify(user.id)
					const columnCells = columns.map((column, index) => (
						<CellComponent
							key={`${key}-cell-${index}`}
							user={user}
							column={column}
							fn={
								typeof column !== 'string' && column.key === 'array' ?
									// @ts-expect-error mistyped
									user => user.roles.join(', ')
								:	undefined
							}
						/>
					))
					return columnCells.length ? <tr key={key}>{columnCells}</tr> : null
				})}
			</TableBody>
		</>
	)
}
