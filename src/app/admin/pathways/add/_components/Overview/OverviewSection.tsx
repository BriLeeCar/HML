import { FormSection } from '@/admin/_components'
import { FieldGroup } from '@/admin/_components/catalyst'
import { type ElPrismaProps } from '../..'
import { OverviewCountryId } from './CountryId'
import { OverviewDescription } from './Description'
import { OverviewLink } from './Link'
import { OverviewOfficialName } from './Name'

export const OverviewSection = ({
	data,
	handlePrisma,
	countries,
}: ElPrismaProps & {
	countries: Queried.Country.WithRelations[]
}) => {
	return (
		<FormSection
			title='Overview'
			aria-label='Pathway Overview'
			description={
				'This section collects the basic information about the pathway. Please ensure that all information is accurate and corresponds to official sources where applicable.'
			}>
			<FieldGroup className='grid gap-x-8 md:grid-cols-2'>
				{/* ? COUNTRY ID */}
				<OverviewCountryId
					data={data}
					handlePrisma={handlePrisma}
					countries={countries}
				/>
				{/* ? OFFICIAL NAME */}
				<OverviewOfficialName
					data={data}
					handlePrisma={handlePrisma}
				/>
				{/* ? OFFICIAL LINK */}
				<OverviewLink
					data={data}
					handlePrisma={handlePrisma}
				/>
				{/* ? DESCRIPTION */}
				<OverviewDescription
					data={data}
					handlePrisma={handlePrisma}
				/>
			</FieldGroup>
		</FormSection>
	)
}
