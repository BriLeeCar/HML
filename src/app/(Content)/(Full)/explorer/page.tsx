import countries from '~/data/countries.json'
import { tCountry } from '~/data/stores/countryStore'
import { getUnsplashPhoto } from '~/data/unsplashApi'
import { getBaseUrl } from '~/util/baseUrl'
import { Base } from './Base'

export type tPhotoCountry = tCountry & {
	image: { id: string }
	unsplash: NonNullable<Awaited<ReturnType<typeof getUnsplashPhoto>>>
	un: boolean
	trans: boolean
}

const ExplorerPage = async () => {
	const photoCountries = countries
		.filter((c) => c.image)
		.sort((a, b) => a.name.localeCompare(b.name)) as tPhotoCountry[]

	await Promise.all(
		photoCountries.map(async (country) => {
			const photo = await fetch(
				getBaseUrl('api/unsplash?id=' + country.image?.id)
			).then((res) => res.json())

			const isUN = await fetch(
				'https://restcountries.com/v3.1/alpha/'
					+ country.abbr
					+ '?fields=unMember'
			).then((res) => {
				return res.json()
			})

			Object.assign(country, {
				unsplash: photo,
				un: isUN?.unMember,
			})
		})
	)

	return <Base fetchedCountries={photoCountries} />
}

export default ExplorerPage
