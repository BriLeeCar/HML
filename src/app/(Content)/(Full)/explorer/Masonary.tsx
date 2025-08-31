'use client'

import { motion } from 'motion/react'
import { RefObject, useContext, useEffect, useState } from 'react'
import { DBContext } from '~/server/db/provider'
import { Country } from './MasonryCountry'

export const Masonry = ({
	columns,
	ref,
}: {
	columns: {
		min: string
		columns: number
		images: ApiData.Country[][]
	}[]
	ref: RefObject<HTMLDivElement | null>
}) => {
	const db = useContext(DBContext)
	const [parsed, setParsed] = useState([] as ApiData.Country[][])

	useEffect(() => {
		const onResize = () => {
			const width = window.innerWidth
			let col = 0
			columns.forEach((bp, i) => {
				if (width >= parseInt(bp.min)) {
					col = i
				}
			})
			setParsed(columns[col].images.filter((c) => c.length > 0))
		}
		onResize()
		window.addEventListener('resize', onResize)
		return () => window.removeEventListener('resize', onResize)
	}, [columns])

	return (
		<motion.div
			layoutRoot
			id='masonaryWrapper'
			key={`masonry`}
			ref={ref}
			style={{
				columnCount: parsed.length,
			}}
			className='w-full px-2 md:justify-between'>
			{parsed.map((col) => {
				return col.map((c: ApiData.Country, i) => {
					const priority = i < 8 ? true : false
					return (
						<motion.div
							key={c.abbr}
							className='bg-background outline-card-foreground/5 relative h-auto w-full max-w-full shrink basis-full flex-col overflow-hidden transition-all has-[*]:hover:grayscale-100'>
							<Country
								country={c}
								key={c.abbr}
								priority={priority}
								db={db}
							/>
						</motion.div>
					)
				})
			})}
		</motion.div>
	)
}
