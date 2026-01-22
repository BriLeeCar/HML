'use client'

import { FormBase } from '@/admin/pathways/_components/FormBase'
import { createTracker } from '@/admin/pathways/_lib/createTracker'
import { handleSubmitBase } from '@/admin/pathways/_lib/handleSubmit'
import type { User } from 'next-auth'
import { useState, type SetStateAction } from 'react'
import { useToast, type ToastMessage } from '~/hooks/useToast'
import { api } from '~/lib/api'

export const handlePrismaBase = (
	setData: (value: SetStateAction<Query>) => void,
	newData: Query
) => {
	if (newData.utilities.countryData && !newData.query.currencyCode) {
		if (newData.utilities.countryData.currencies.length == 1) {
			newData.query.currencyCode = newData.utilities.countryData.currencies[0].code
		}
	}

	setData({ ...newData })
}

export const Base = ({
	prisma,
	user,
}: {
	prisma: TRPC.RouterOutputs['dataCollection']['PathwayInit']
	user: {
		id: string
		roles: Auth.Role[]
	} & User
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

	const handleSubmit = async () => handleSubmitBase(toast, data, setData, mutate)

	return (
		<>
			<toast.El />
			<FormBase
				data={data}
				handlePrisma={handlePrisma}
				countries={countries}
				pathwayTypes={pathwayTypes}
				documentTypes={documentTypes}
				handleSubmit={handleSubmit}
				type='add'
				user={user}
			/>
		</>
	)
}
