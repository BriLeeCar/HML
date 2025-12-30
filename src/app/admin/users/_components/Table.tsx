import { TableBody } from '@/admin/_components/catalyst/client/table'
import type { UserTable } from '../_lib/types'
import { TableCellOptions } from './TableCells'
import { TableHeaderRow, type TableColumn } from './TableHeaders'

const CellComponent = ({
	user,
	column,
}: UserTable & {
	column: TableColumn
}) => {
	const Cell = TableCellOptions[column as keyof typeof TableCellOptions]
	return Cell ? <Cell user={user} /> : <></>
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
						/>
					))
					return columnCells.length ? <tr key={key}>{columnCells}</tr> : null
				})}
			</TableBody>
		</>
	)
}
