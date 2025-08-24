'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState } from 'react'
import { Heading } from '~/components/Heading'
import { Icon } from '~/components/Icon'
import { Checkbox, Label } from '~/components/ui'
import { Filter } from './Filter'
import { Masonry } from './Masonary'
import { tPhotoCountry } from './page'

export const Base = ({
	fetchedCountries,
}: {
	fetchedCountries: tPhotoCountry[]
}) => {
	const [drawerOpen, openDrawer] = useState(false)
	const [filters, setFilters] = useState<Array<keyof tPhotoCountry>>(
		[]
	)

	const handleFilterChange = (
		filterKey: keyof tPhotoCountry,
		value: boolean
	) => {
		const newFilters = [...filters.filter((f) => f != filterKey)]
		if (value) {
			newFilters.push(filterKey)
		}
		console.log(newFilters)
		setFilters(newFilters)
	}

	const overlayRef = useRef<HTMLDivElement>(null)

	return (
		<div className='block h-full w-full px-4 pb-8'>
			<div className='relative my-4 flex w-[95%] items-center justify-between rounded-2xl bg-zinc-200 px-4 py-2 dark:bg-zinc-900'>
				<Heading
					size='2xl'
					className='mb-0 pb-0'>
					Explorer
				</Heading>
				<Filter
					count={Object.keys(filters).length}
					onClick={() => openDrawer(!drawerOpen)}
				/>
			</div>
			<Masonry
				countries={handleCountryFilter(fetchedCountries, filters)}
			/>
			<AnimatePresence>
				{drawerOpen && (
					<motion.div
						ref={overlayRef}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={(e) =>
							e.target == overlayRef.current && openDrawer(false)
						}
						className='fixed inset-0 z-40 bg-black/30 backdrop-blur-sm'>
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{
								height: drawerOpen ? '300px' : '0px',
								opacity: 1,
							}}
							exit={{ height: 0, opacity: 0 }}
							transition={{
								type: 'spring',
							}}
							className='bg-card border-muted fixed right-0 bottom-0 left-0 z-50 w-screen rounded-t-2xl border-1 border-b-0 p-8 shadow-[0_-4px_8px_rgba(0,0,0,0.4)] backdrop-blur-md md:top-20 md:right-20 md:bottom-auto md:w-96'>
							<Heading size='lg'>Filter</Heading>
							<form>
								<Label>
									<Checkbox
										id='un'
										defaultChecked={filters.includes('un')}
										onCheckedChange={(checked) =>
											handleFilterChange('un', checked === true)
										}
									/>
									UN Member
								</Label>
								<Label>
									<Checkbox
										id='homophobia'
										defaultChecked={filters.includes('homophobia')}
										onCheckedChange={(checked) =>
											handleFilterChange(
												'homophobia',
												checked === true
											)
										}
									/>
									LGBTQIA+ Friendly
								</Label>
							</form>
							<Icon
								IconName='XIcon'
								className='absolute top-4 right-4 cursor-pointer'
								onClick={() => openDrawer(false)}
							/>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

const handleCountryFilter = (
	countries: tPhotoCountry[],
	filters: Array<keyof tPhotoCountry>
) => {
	const newCountries = countries.filter((c) => {
		const tests = filters.map((key) => {
			if (key == 'homophobia' && c[key] < 0) return false
			if (key == 'un' && !c[key]) return false
			if (key == 'trans' && c[key] != true) return false
		})
		if (tests.includes(false)) return false
		return true
	})

	console.log(newCountries, filters)
	return newCountries
}
