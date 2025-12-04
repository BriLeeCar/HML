export * from '@/data-collection/_components/Form'
export { Page, PageHeading, Section, SectionHeading, SubSection } from '~/components'

export * from '@/data-collection/_components'

export * from '@/data-collection/pathways/_Form'
export * from '@/data-collection/pathways/constants'
export { Form } from '@/data-collection/pathways/Form'

export const errors = {
	minGtMax: 'Max must be greater than or equal to Min',
	negative: 'Must be a non-negative number',
	noMaxWOutMin: 'Must provide a Min value when Max is provided',
	wholeNumber: 'Must be a whole number',
	stringLength: (max: number) => `Must be ${max} characters or less`,
}
