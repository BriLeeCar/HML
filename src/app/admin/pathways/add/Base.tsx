'use client'

import { Button, FormSection } from '@/admin/_components/'
import { Form } from '@/admin/_components/_form'
import { motion, useScroll } from 'motion/react'
import { useState } from 'react'
import { Bold, Section, SectionHeading } from '~/components'
import { api, useToast, type RouterOutputs, type ToastMessage } from '~/lib/index'
import type { CreatePathwayInput } from '~/server/api/routers'
import { zCreatePathwayInput } from '~/server/api/zod'
import {
	ApplicationCost,
	CategorySection,
	createTracker,
	Documentation,
	Duration,
	Notes,
	OverviewSection,
	ProcessingTime,
	Renewable,
	RestrictionsOpportunities,
} from '.'

export const Base = ({ prisma }: { prisma: RouterOutputs['dataCollection']['PathwayInit'] }) => {
	const { documentTypes, countries, pathwayTypes } = prisma

	const toast = useToast()
	const [data, setData] = useState({
		query: {
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		...createTracker(),
	} as Query)

	const { mutate } = api.dataCollection.CreatePathway.useMutation({
		onSuccess: () => {
			window.scrollTo(0, 0)
			toast.fireToast({
				title: 'Pathway created successfully!',
				status: 'success',
				body:
					data.query.name ? `You have successfully created the pathway: ${data.query.name}` : '',
			} as ToastMessage)
		},
		onError: data => {
			console.log(data.message)
			window.scrollTo({
				behavior: 'smooth',
				top: 0,
			})
			toast.fireToast({
				title: 'Error creating pathway',
				status: 'error',
				body: <>There was an error creating the pathway. Please verify the following:</>,
			} as ToastMessage)
		},
	})

	const handlePrisma = (newData: Query) => {
		if (newData.utilities.countryData && !newData.query.currencyCode) {
			if (newData.utilities.countryData.currencies.length == 1) {
				newData.query.currencyCode = newData.utilities.countryData.currencies[0].code
			}
		}

		setData({ ...newData })
	}

	const { scrollYProgress } = useScroll()
	const handleSubmit = async () => {
		const submission = { ...data }
		Object.assign(submission, {
			type: 'VISA',
		})

		const validation = zCreatePathwayInput.safeParse(submission)

		validation.success && mutate(submission as CreatePathwayInput)
		if (validation.error) {
			const zodErrors = {
				...data.errors,
				...createTracker().errors,
			}

			validation.error.issues
				.filter(issue => {
					return issue.path.length > 0 && issue.path[0] == 'query'
				})
				.forEach(errPath => {
					const path = errPath.path
					const pathKey = path[1] as keyof Query['errors']
					const dataPath = {
						[pathKey]: data.errors[pathKey],
					}
					if (['cost', 'processTime', 'duration'].includes(pathKey)) {
						const fieldKey = pathKey as 'cost' | 'processTime' | 'duration'
						const lastKey = path[2] as keyof Query['errors'][typeof fieldKey]
						if (lastKey == 'min' || lastKey == 'max') {
							dataPath[fieldKey] = {
								...data.errors[fieldKey],
								[lastKey]: [errPath.message],
							}
						} else {
							dataPath[fieldKey] = {
								...data.errors[fieldKey],
								base: [errPath.message],
							}
						}
					} else if (Array.isArray(dataPath[pathKey])) {
						dataPath[pathKey] = [errPath.message] as string[]
					}

					Object.assign(zodErrors, {
						...dataPath,
					})
				})

			setData({
				...data,
				errors: {
					...createTracker().errors,
					...zodErrors,
				},
			})
		}
	}

	return (
		<>
			<toast.El />
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
					backgroundColor: 'light-dark(var(--color-v2-yellow), #47274E)',
				}}
			/>

			<Section>
				<SectionHeading subtitle="If you have any trouble, please let the staff know so we can either alter to form, or help explain why there's an issue">
					Pathway Details
				</SectionHeading>
				<Form>
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
					<FormSection
						description={
							<>
								This section collects information about the application process for the pathway,
								including processing time, cost, duration, and renewal options.
								<br />
								<br />
								<Bold>
									If it helps, you can provide these in different units of time (ex: minimum in
									days, maximum in months/years).
								</Bold>
							</>
						}
						title='Application'
						aria-label='Application Details'>
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
					</FormSection>
					{/* ? DOCUMENTATION */}
					<FormSection
						title='Documentation'
						aria-label='Documentation'
						description={
							'What documentation is needed for the visa application, as well as any other supporting paperwork required for approval?'
						}>
						<Documentation
							documentTypes={documentTypes}
							data={data}
							handlePrisma={handlePrisma}
						/>
					</FormSection>
					{/* ? RENEWAL */}
					<FormSection
						title='Renewal'
						description={
							<>
								If this pathway is renewable, please provide the renewal duration details below.
								<em>
									Don't worry about the reasons and exceptions, we will cover those in the notes
									section!
								</em>
							</>
						}>
						<Renewable
							data={data}
							handlePrisma={handlePrisma}
						/>
					</FormSection>
					{/* ? RESTRICTIONS & OPPORTUNITIES */}
					<RestrictionsOpportunities
						data={data}
						handlePrisma={handlePrisma}
						countries={countries}
					/>
					{/* ? ADDITIONAL NOTES */}
					<FormSection
						title='Additional Notes'
						aria-label='Additional Notes'
						description={
							'Please provide any additional notes or important information about the pathway that may not have been covered in the previous sections. This could include special conditions, exceptions, or other relevant details.'
						}>
						<Notes
							data={data}
							handlePrisma={handlePrisma}
						/>
					</FormSection>

					{/* ? BUTTON */}
					<Button
						className='mt-8 rounded-xl text-base'
						type='button'
						variant='ghost'
						onClick={async () => {
							await handleSubmit()
						}}>
						Submit Pathway
					</Button>
				</Form>
			</Section>
		</>
	)
}
