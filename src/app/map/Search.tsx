import { useState } from 'react'
import { Icon } from '~/components'
import { Button } from '~/components/ui/Button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '~/components/ui/Command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '~/components/ui/Popover'
import { tCountryRest } from '~/data/baseCountryApi'

export const SearchBox = ({
	countriesWithData,
	setSearch,
}: {
	countriesWithData: { [key: string]: tCountryRest }
	setSearch: (country: tCountryRest | null) => void
}) => {
	const [open, setOpen] = useState(false)
	return (
		<div className='flex items-center space-x-4'>
			<Popover
				open={open}
				onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant='ghost'
						className='click justify-start'>
						<Icon
							key={'search'}
							IconName='SearchIcon'
							className='size-8'
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className='p-0'
					side='top'
					align='start'
					sideOffset={8}>
					<Command>
						<CommandInput placeholder='Search for Countries with Data' />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup>
								{Object.keys(countriesWithData).map((country) => (
									<CommandItem
										key={country}
										value={country}
										onSelect={(value) => {
											const selectedCountry =
												countriesWithData[
													value as keyof typeof countriesWithData
												]
											if (!selectedCountry) return
											setSearch(selectedCountry)
											setOpen(false)
										}}>
										{country}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)
}
