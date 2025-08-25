import { createContext } from 'react'
import db from './db'

export const DBContext = createContext<ReturnType<typeof db>>(
	null as unknown as ReturnType<typeof db>
)

export const DBProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const database = db()

	return (
		<DBContext.Provider value={database}>
			{children}
		</DBContext.Provider>
	)
}
