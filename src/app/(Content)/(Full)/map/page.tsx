import { Metadata } from 'next'
import { WorldMap } from './Base'

export const metadata: Metadata = {
	title: 'Map',
	description: 'Interactive map to explore country profiles.',
}

const Map = () => {
	return <WorldMap />
}

export default Map
