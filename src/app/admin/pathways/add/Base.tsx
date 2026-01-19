'use client'

import { Section, SectionHeading } from '@/admin/_components'
import { Button } from '@/admin/_components/'
import { Form } from '@/admin/_components/_form/Form'
import { useState, type SetStateAction } from 'react'
import { useToast, type ToastMessage } from '~/hooks/useToast'
import { api } from '~/lib'
import type { CreatePathwayInput } from '~/server/api/routers'
import { zCreatePathwayInput } from '~/server/api/zod'
import {
	Application,
	CategorySection,
	createTracker,
	Documentation,
	Notes,
	OverviewSection,
	Renewable,
	RestrictionsOpportunities,
} from '.'

const handlePrismaBase = (setData: (value: SetStateAction<Query>) => void, newData: Query) => {
	if (newData.utilities.countryData && !newData.query.currencyCode) {
		if (newData.utilities.countryData.currencies.length == 1) {
			newData.query.currencyCode = newData.utilities.countryData.currencies[0].code
		}
	}

	setData({ ...newData })
}

const handleSubmitBase = async (
	data: Query,
	setData: (value: SetStateAction<Query>) => void,
	mutate: ReturnType<typeof api.dataCollection.CreatePathway.useMutation>['mutate']
) => {
	const submission = { ...data, type: 'VISA' }

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

export const Base = ({
	prisma,
}: {
	prisma: TRPC.RouterOutputs['dataCollection']['PathwayInit']
}) => {
	const { documentTypes, countries, pathwayTypes } = prisma

	const toast = useToast()
	const [data, setData] = useState({
		...createTracker(),
	} as Query)

	const { mutate } = api.dataCollection.CreatePathway.useMutation({
		onSuccess: () => {
			setData({
				...createTracker(),
			} as Query)
			window.scrollTo(0, 0)
			document.forms[0].reset()
			toast.fireToast({
				title: 'Pathway created successfully!',
				status: 'success',
				body:
					data.query.name ? `You have successfully created the pathway: ${data.query.name}` : '',
			} as ToastMessage)
		},
		onError: () => {
			window.scrollTo({
				behavior: 'smooth',
				top: 0,
			})
			toast.fireToast({
				title: 'Error creating pathway',
				status: 'error',
				body: <>There was an error creating the pathway</>,
			} as ToastMessage)
		},
	})

	const handlePrisma = (newData: Query) => handlePrismaBase(setData, newData)

	const handleSubmit = async () => handleSubmitBase(data, setData, mutate)

	return (
		<>
			<toast.El />
			<Section className='w-full md:mx-auto lg:max-w-198'>
				<SectionHeading subtitle='If you have any trouble, please let HML staff members know so that we can either help you, or improve the form!'>
					Pathway Details
				</SectionHeading>
				<Form
					title='New Pathway Form'
					className='mx-auto max-w-3xl'>
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
						className='mx-auto mt-8 w-full max-w-lg rounded-xl text-base'
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
