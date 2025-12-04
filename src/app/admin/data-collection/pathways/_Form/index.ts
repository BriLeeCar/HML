import type { ReactNode } from 'react'

export * from './ApplicationCost'
export * from './Base'
export * from './Documentation'
export * from './Duration'
export * from './MinMaxCostFieldGroup'
export * from './MinMaxTimeFieldGroup'
export * from './Notes'
export * from './Renewable'
export * from './RestrictionsOpportunities'

export type FieldElProps = {
	label: string
	labelProps?: Props<'label'>
	required?: boolean
	errorMessages?: string[]
	children: ReactNode
	fieldProps?: Props<'div'>
}
