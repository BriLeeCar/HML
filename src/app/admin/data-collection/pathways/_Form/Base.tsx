'use client'

import {
	Button,
	FieldGroup,
	Fieldset,
	Form,
	Legend,
	MOCK_DATA,
	Page,
	PageHeading,
	PATHWAY_BASE,
	pathwayReducer,
	pathwaySubmit,
	Section,
	SectionHeading,
	SubSection,
	Text,
} from '@/data-collection/pathways'
import {
	ApplicationCost,
	Documentation,
	Duration,
	Notes,
	Overview,
	ProcessingTime,
	Renewable,
	RestrictionsOpportunities,
} from '@/data-collection/pathways/_Form'

import { motion, useScroll } from 'motion/react'
import { type ReactNode, useContext, useReducer } from 'react'
import { cn } from '~/lib/cn'
import { DBContext } from '~/server/db/provider'

export const Base = ({ handle }: { handle: string }) => {
	const db = useContext(DBContext)

	const [pathwayData, dispatchPathway] = useReducer(pathwayReducer, {
		...PATHWAY_BASE,
		...MOCK_DATA,
		db: db,
		countriesWithPathways: db.getCountriesWithPathways(),
		discordHandle: {
			value: handle,
			error: [],
		},
	})

	const { scrollYProgress } = useScroll()

	const handleSubmit = async () => {
		console.log(pathwaySubmit({ ...pathwayData }))

		// const response = await fetch(
		// 	`/admin/api/pathwayWrite?handle=${pathwayData.discordHandle.value}`,
		// 	{
		// 		method: 'POST',
		// 		mode: 'same-origin',

		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			Handle: handle,
		// 		},
		// 		body: JSON.stringify(toCSV({ ...pathwayData })),
		// 	}
		// )

		// if (response.ok) {
		// 	alert('Pathway submitted successfully!')
		// 	// window.scrollTo({
		// 	// 	top: 0,
		// 	// 	behavior: 'smooth',
		// 	// })
		// 	// window.location.reload()
		// }
	}

	return (
		<Page className='admin md:px-0'>
			<motion.div
				style={{
					position: 'fixed',
					width: '10px',
					height: '100vh',
					scaleY: scrollYProgress,
					top: 0,
					originY: 0,
					left: 0,
					right: 0,
					backgroundColor: 'light-dark(#7A2235, #47274E)',
				}}
			/>
			<PageHeading
				eyebrow={<span className='text-[#AC162B] dark:text-[#DAE638]'>Beta</span>}
				subtitle={<span>Please let us know of any issues when filling out the form!</span>}>
				Add Pathway Form
			</PageHeading>
			{/* ? DISCORD */}
			{/* <Section>
				<SectionHeading
					eyebrow={
						<span className='text-[#AC162B] dark:text-[#DAE638]'>For Verification Purposes'</span>
					}>
					Discord Handle
				</SectionHeading>
				<form className='admin-mobile-padding my-2'>
					<label
						className='sr-only'
						htmlFor='discord-handle'></label>
					<input
						id='discord-handle'
						defaultValue={pathwayData.discordHandle.value}
						type='text'
						placeholder='Your discord handle'
						className={cn(
							'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-3',
							'bg-background outline-foreground/20',
							'border-foreground/20 border',
							// 'focus-visible:border-foreground/10',
							'rounded-md',
							'px-3 py-1',
							'flex h-9 w-full min-w-0 text-base',
							'disabled:bg-foreground/3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-current/60 disabled:italic md:text-sm',
							'in-[fieldset]:bg-foreground/2',
							'dark:outline-offset-2 dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0 dark:focus-visible:outline-2',
							'bg-foreground/5 max-w-sm rounded-lg'
						)}
						onBlur={e =>
							dispatchPathway({
								field: 'discordHandle',
								payload: e.currentTarget.value,
							})
						}
					/>
				</form>
			</Section> */}
			{/* ? FORM */}

			<Section>
				<SectionHeading subtitle="If you have any trouble, please let the staff know so we can either alter to form, or help explain why there's an issue">
					Pathway Details
				</SectionHeading>
				<Form>
					{/* ? OVERVIEW */}
					<FormSection
						title='Overview'
						aria-label='Pathway Overview'
						description={
							'This section collects the basic information about the pathway. Please ensure that all information is accurate and corresponds to official sources where applicable.'
						}>
						<Overview
							pathwayData={pathwayData}
							dispatchAction={dispatchPathway}
						/>
					</FormSection>
					{/* ? APPLICATION */}
					<FormSection
						description={
							'This section collects information about the application process for the pathway, including processing time, cost, duration, and renewal options.'
						}
						title='Application'
						aria-label='Application Details'>
						{/* ? PROCESSING TIME */}
						<ProcessingTime
							pathwayData={pathwayData}
							dispatchAction={dispatchPathway}
						/>
						{/* ? COST */}
						<ApplicationCost
							pathwayData={pathwayData}
							dispatchAction={dispatchPathway}
						/>
						{/* ? DURATION */}
						<Duration
							pathwayData={pathwayData}
							dispatchAction={dispatchPathway}
						/>
					</FormSection>
					{/* ? DOCUMENTATION */}
					<FormSection
						title='Documentation'
						aria-label='Documentation'
						description={
							'What documentation is needed for the visa application, as well as any other supporting paperwork required for approval?'
						}>
						<Documentation
							pathwayData={pathwayData}
							dispatchAction={dispatchPathway}
						/>
					</FormSection>
					{/* ? RENEWAL */}
					<FormSection
						title='Renewal'
						description={
							<>
								If this pathway is renewable, please provide the renewal duration details below. If
								the renewal duration is the same as the initial duration, please check the below to
								indicate as such.{' '}
								<em>
									Don't worry about the reasons and exceptions, we will cover those in the notes
									section!
								</em>
							</>
						}>
						<Renewable
							pathwayData={pathwayData}
							dispatchAction={dispatchPathway}
						/>
					</FormSection>
					{/* ? Restrictions & Opportunities */}
					<RestrictionsOpportunities
						pathwayData={pathwayData}
						dispatchAction={dispatchPathway}
					/>

					<FormSection
						title='Additional Notes'
						aria-label='Additional Notes'
						description={
							'Please provide any additional notes or important information about the pathway that may not have been covered in the previous sections. This could include special conditions, exceptions, or other relevant details.'
						}>
						<Notes
							pathwayData={pathwayData}
							dispatchAction={dispatchPathway}
						/>
					</FormSection>

					{/* ? BUTTON */}
					<Button
						className='mt-8 rounded-xl text-base'
						type='button'
						variant='ghost'
						onClick={async () => {
							const consoledData = { ...pathwayData } as AnySafe

							delete consoledData.db
							delete consoledData.countriesWithPathways

							await handleSubmit()
						}}>
						Submit Pathway
					</Button>
				</Form>
			</Section>
		</Page>
	)
}

export const FormSection = ({
	'aria-label': ariaLabel,
	description,
	...props
}: Props<typeof SubSection> & {
	description: ReactNode
	title: ReactNode
}) => {
	return (
		<SubSection
			{...props}
			aria-label={ariaLabel}
			role='group'
			title={props.title}
			className={cn(
				'from-background dark:text-foreground sticky top-0 z-10 bg-linear-to-b from-50% to-transparent to-100% text-[#AC162B] max-md:pt-4 max-md:pb-8 md:static',
				props.className
			)}
			innerProps={{
				...props.innerProps,
				className: cn('-mt-6 pl-0 md:mt-0 md:pl-6', props.innerProps?.className),
			}}>
			<Text
				data-slot='description'
				className='mb-10 text-balance'>
				{description}
			</Text>
			<FieldGroup>{props.children}</FieldGroup>
		</SubSection>
	)
}

export const FormSubSection = ({
	description,
	legend,
	'aria-label': ariaLabel,
	...props
}: Props<'fieldset'> & {
	legend: ReactNode
	description?: ReactNode
}) => {
	return (
		<Fieldset
			{...props}
			aria-label={ariaLabel}>
			<Legend className='max-sm:text-base'>{legend}</Legend>
			{description && (
				<Text
					className='text-balance'
					data-slot='description'>
					{description}
				</Text>
			)}
			{props.children}
		</Fieldset>
	)
}
