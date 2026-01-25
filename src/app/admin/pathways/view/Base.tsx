'use client'

import { createTracker } from '@/admin/pathways/_lib/createTracker'
import type { User } from 'next-auth'
import { useState, type SetStateAction } from 'react'
import { useToast, type ToastMessage } from '~/hooks/useToast'
import type { CreatePathwayInput } from '~/server/api/routers'
import { zCreatePathwayInput } from '~/server/api/zod'
import { api } from '~/trpc/react'
import { FormBase } from '../_components/FormBase'

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

	validation.success && mutate(submission as unknown as CreatePathwayInput)
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
	pathway,
	user,
	pathwayTypes,
}: {
	user: {
		id: string
		roles: Auth.Role[]
	} & User
	pathway: Exclude<TRPC.RouterOutputs['pathway']['getById']['pathway'], null>
	pathwayTypes: TRPC.RouterOutputs['pathway']['getById']['pathwayTypes']
}) => {
	const toast = useToast()

	const [data, setData] = useState(
		Object.assign({
			...createTracker(),
			createdBy: pathway.CMS_User.id,
			query: {
				id: pathway.id,
				createdAt: pathway.createdAt,
				updatedAt: pathway.updatedAt,
				categories: pathway.categories.map(cat => cat.pathway_categories.id),
				countryCode: pathway.country.code,
				description: pathway.description,
				discordHandle: '',
				link: pathway.link,
				name: pathway.name,
				type: pathway.type,
				citizenship: pathway.pipelines.find(p => p.pipeline == 'CITIZENSHIP')?.note || '',
				residency: pathway.pipelines.find(p => p.pipeline == 'RESIDENCY')?.note || '',
				reunification: pathway.pipelines.find(p => p.pipeline == 'REUNIFICATION')?.note || '',
				cost: {
					min: pathway.cost ? Number(pathway.cost) : 0,
					max: pathway.cost ? Number(pathway.cost) : 0,
					na: pathway.cost ? false : true,
				},
				duration: {
					max: 0,
					min: 0,
					na: true,
					note: '',
				},
				processTime: {
					max: 0,
					min: 0,
					na: true,
					note: '',
				},
				renewal: {
					max: 0,
					min: 0,
					na: true,
					note: '',
				},
				limitations: pathway.limitations.map((limitation, index) => ({
					note: limitation || '',
					counter: index,
				})),
				notes: pathway.notes.map((note, index) => ({
					note: note || '',
					counter: index,
				})),
				requirements: pathway.requirements.map((requirement, index) => ({
					note: requirement || '',
					counter: index,
				})),
				restrictions: pathway.restrictions.map((restriction, index) => ({
					note: restriction || '',
					counter: index,
				})),
				restrictedNationalities: pathway.restrictedNationalities.map(rn => ({
					countryCode: rn.countryCode,
					note: rn.note || '',
					pathwayId: pathway.id,
				})),
				piplines: pathway.pipelines.map(p => ({
					pipeline: p.pipeline,
					note: p.note || '',
					pathwayId: pathway.id,
					id: p.id,
				})),
				currencyCode: pathway.currencyCode || '',
				documents: pathway.documents.map(doc => ({
					id: doc.id,
					description: doc.description || '',
					type: doc.document.type,
					cost: doc.cost ? Number(doc.cost) : 0,
					documentId: doc.documentId,
					isRequired: doc.isRequired,
					link: doc.link,
					title: doc.title,
					pathwayId: pathway.id,
				})),
			},
		}) as Query
	)

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
			<FormBase
				data={data}
				handlePrisma={handlePrisma}
				countries={[]}
				pathwayTypes={pathwayTypes}
				documentTypes={[]}
				handleSubmit={handleSubmit}
				user={user}
			/>
		</>
	)
}
