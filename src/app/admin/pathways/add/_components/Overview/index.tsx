import { FormSection } from '@/admin/_components/_form/clientFieldset'
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
			aria-label='Pathway Overview'>
			<FormSection.Legend description='This section collects the basic information about the pathway. Please ensure that all information is accurate and corresponds to official sources where applicable.'>
				Overview
			</FormSection.Legend>
			<FormSection.Details className='gap-x-8 sm:grid-cols-2'>
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
			</FormSection.Details>
		</FormSection>
	)
}
