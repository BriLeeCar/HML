import { FormSection } from '@/admin/_components/_form/clientFieldset'
import { ApplicationCost } from '@/admin/pathways/add/_components/Application/_components/Cost'
import type { ElPrismaProps } from '../../_lib'
import { Duration } from './_components/Duration'
import { ProcessingTime } from './ProcessingTime'

export const Application = ({
	data,
	handlePrisma,
	countries,
}: ElPrismaProps & {
	countries: Array<Queried.Country.WithRelations>
}) => {
	return (
		<FormSection aria-label='Application Details'>
			<FormSection.Legend description='This section collects information about the application process for the pathway, including processing time, cost, duration, and renewal options.'>
				Application
			</FormSection.Legend>
			<FormSection.Details>
				{/* ? PROCESSING TIME */}
				<ProcessingTime
					data={data}
					handlePrisma={handlePrisma}
				/>
				{/* ? COST */}
				<ApplicationCost
					data={data}
					handlePrisma={handlePrisma}
					countries={countries}
				/>
				{/* ? DURATION */}
				<Duration
					data={data}
					handlePrisma={handlePrisma}
				/>
			</FormSection.Details>
		</FormSection>
	)
}
