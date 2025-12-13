import { InputGroup } from '@/admin/_components/catalyst'
import {
	Combobox,
	ComboboxDescription,
	ComboboxLabel,
	ComboboxOption,
} from '@/admin/_components/catalyst/client/combobox'
import z from 'zod'
import { Icon } from '~/components/Icon'
import { betaCountries, type ElPrismaProps } from '../../_lib'
import { OverviewField } from './OverviewField'

export const OverviewCountryId = ({
	data,
	handlePrisma,
	countries,
}: ElPrismaProps & {
	countries: Queried.Country.WithRelations[]
}) => {
	return (
		<OverviewField
			label='Country ID'
			required
			errorMessages={data.errors?.countryCode}>
			<InputGroup>
				<Icon
					IconName='GlobeStandIcon'
					data-slot='icon'
				/>
				<Combobox
					invalid={(data.errors?.countryCode.length ?? 0 > 0) ? true : undefined}
					name='countryCode'
					options={countries
						.filter(c => betaCountries.findIndex(b => b.code == c.code) != -1)
						.sort((a, b) => a.code.localeCompare(b.code))
						.map(c => c.code)}
					onChange={val => {
						const parsed = z.string().toUpperCase().length(3, 'Invalid Country ID').safeParse(val)

						if (parsed.success) {
							const newData = { ...data }
							newData.query.countryCode = parsed.data
							const country = countries.find(c => c.code == parsed.data)
							country && Object.assign(newData.utilities, { countryData: country })

							handlePrisma(newData)
						}
					}}
					displayValue={(value: string | null) => value?.toString()}>
					{country => (
						<ComboboxOption
							value={country}
							key={country}>
							<ComboboxLabel>{country}</ComboboxLabel>
							<ComboboxDescription>
								{countries.find(c => c.code == country)?.name ?? country}
							</ComboboxDescription>
						</ComboboxOption>
					)}
				</Combobox>
			</InputGroup>
		</OverviewField>
	)
}
