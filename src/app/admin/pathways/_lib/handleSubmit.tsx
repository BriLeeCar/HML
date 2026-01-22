import { createTracker } from '@/admin/pathways/_lib/createTracker'
import type { SetStateAction } from 'react'
import type { useToast } from '~/hooks/useToast'
import type { api } from '~/lib/api'
import type { CreatePathwayInput } from '~/server/api/routers'
import { zCreatePathwayInput } from '~/server/api/zod'

export const handleSubmitBase = async (
	toast: ReturnType<typeof useToast>,
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

		const newData = {
			...data,
			errors: {
				...createTracker().errors,
				...zodErrors,
			},
		}

		console.warn(newData)
		window.scrollTo(0, 0)
		toast.fireToast({
			title: 'Error creating pathway',
			status: 'error',
			body: <>Your pathway entry contained errors. Please check your fields.</>,
		})
		setData(newData)
	}
}
