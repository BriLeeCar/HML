import { Button, Form, Section, SectionHeading } from '@/admin/_components'
import type { User } from 'next-auth'
import type { Country, Currency, DocumentType } from '~/server/prisma/generated/browser'
import {
	type Categories,
	Application,
	CategorySection,
	Documentation,
	Notes,
	Renewable,
	RestrictionsOpportunities,
} from '../add/_components'
import { OverviewSection } from '../add/_components/OverviewSection'

export const FormBase = ({
	data,
	handlePrisma,
	countries,
	pathwayTypes,
	documentTypes,
	handleSubmit,
}: {
	data: Query
	handlePrisma: (newData: Query) => void
	// !! CORRECT
	countries: Array<
		Country & {
			currencies: Currency[]
		}
	>

	pathwayTypes: Categories[]
	documentTypes: {
		name: string
		id: number
		description: string | null
		type: DocumentType[]
	}[]
	handleSubmit: () => Promise<void>
	user: {
		id: string
		roles: Auth.Role[]
	} & User
}) => {
	return (
		<Section className='w-full md:mx-auto lg:max-w-198'>
			<SectionHeading subtitle='If you have any trouble, please let HML staff members know so that we can either help you, or improve the form!'>
				Pathway Details
			</SectionHeading>
			<Form className='mx-auto max-w-3xl'>
				{/* ? OVERVIEW */}
				<OverviewSection
					data={data}
					handlePrisma={handlePrisma}
					countries={countries}
				/>
				{/* ? CATEGORIES */}
				<CategorySection
					data={data}
					handlePrisma={handlePrisma}
					pathwayTypes={pathwayTypes}
				/>
				{/* ? APPLICATION */}
				<Application
					data={data}
					handlePrisma={handlePrisma}
					countries={countries}
				/>
				{/* ? DOCUMENTATION */}
				<Documentation
					documentTypes={documentTypes}
					data={data}
					handlePrisma={handlePrisma}
				/>
				{/* ? RENEWAL */}
				<Renewable
					data={data}
					handlePrisma={handlePrisma}
				/>
				{/* ? RESTRICTIONS & OPPORTUNITIES */}
				<RestrictionsOpportunities
					data={data}
					handlePrisma={handlePrisma}
					countries={countries}
				/>
				{/* ? ADDITIONAL NOTES */}
				<Notes
					data={data}
					handlePrisma={handlePrisma}
				/>

				{/* ? BUTTON */}
				<Button
					className='mx-auto mt-8 w-full max-w-lg items-center justify-center rounded-xl text-base'
					type='button'
					variant='ghost'
					onClick={async () => {
						await handleSubmit()
					}}>
					Submit Pathway
				</Button>
			</Form>
		</Section>
	)
}
