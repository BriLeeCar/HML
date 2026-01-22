import { Button, Form, Section, SectionHeading } from '@/admin/_components'
import { UserRoleContext } from '@/admin/_providers/RoleContext'
import type { User } from 'next-auth'
import { useContext } from 'react'
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
	type,
	data,
	handlePrisma,
	countries,
	pathwayTypes,
	documentTypes,
	handleSubmit,
	user,
}: {
	type: 'add' | 'view'
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
	const { roles } = useContext(UserRoleContext)
	const readOnly = type == 'view' && !roles.includes('admin') && user?.id != data.createdBy
	const showDefaults = type == 'view'

	console.log(data.query)

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
					type={type}
					readOnly={readOnly}
					showDefaults={showDefaults}
				/>
				{/* ? CATEGORIES */}
				<CategorySection
					data={data}
					handlePrisma={handlePrisma}
					pathwayTypes={pathwayTypes}
					type={type}
					readOnly={readOnly}
					showDefaults={showDefaults}
				/>
				{/* ? APPLICATION */}
				<Application
					data={data}
					handlePrisma={handlePrisma}
					countries={countries}
					type={type}
					canEdit={readOnly}
				/>
				{/* ? DOCUMENTATION */}
				<Documentation
					documentTypes={documentTypes}
					data={data}
					handlePrisma={handlePrisma}
					type={type}
					canEdit={readOnly}
				/>
				{/* ? RENEWAL */}
				<Renewable
					data={data}
					handlePrisma={handlePrisma}
					type={type}
					canEdit={readOnly}
				/>
				{/* ? RESTRICTIONS & OPPORTUNITIES */}
				<RestrictionsOpportunities
					data={data}
					handlePrisma={handlePrisma}
					countries={countries}
					type={type}
					canEdit={readOnly}
				/>
				{/* ? ADDITIONAL NOTES */}
				<Notes
					data={data}
					handlePrisma={handlePrisma}
					type={type}
					canEdit={readOnly}
				/>

				{/* ? BUTTON */}
				{readOnly ?
					<Button
						className='mx-auto mt-8 w-full max-w-lg rounded-xl text-base'
						type='button'
						variant='ghost'
						onClick={async () => {
							await handleSubmit()
						}}>
						Submit Pathway
					</Button>
				:	null}
			</Form>
		</Section>
	)
}
