import type { Metadata } from 'next'
import { Base } from './Base'

export const metadata: Metadata = {
	title: 'Country Pathway Explorer',
	description:
		'Whether you have strict requirements or more flexibility, find your best options for safe countries to go to.',
}

const ExplorerPage = async () => {
	return <Base />
}

export default ExplorerPage
