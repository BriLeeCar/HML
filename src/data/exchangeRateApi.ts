import z from 'zod/v4'

export const exhcangeRate = async (currency: string) => {
	const data = async () => {
		const apiCDN = await fetch(
			`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`
		)
		if (!apiCDN.ok) {
			console.warn(
				`Failed to fetch exchange rate for currency: ${currency}`
			)
			const apiFallback = await fetch(
				`https://latest.currency-api.pages.dev/v1/currencies/usd.json`
			)
			if (!apiFallback.ok) {
				console.warn(
					`Failed to fetch exchange rate from fallback for currency: ${currency}`
				)
				return null
			} else {
				return await apiFallback.json()
			}
		} else {
			console.log('Fetching exchange rate from CDN')
			return await apiCDN.json()
		}
	}
	return (await data())['usd'][currency]
}

export const getExchangeRate = async () => {
	const cdnString =
		'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/'
	const fallbackString =
		'https://latest.currency-api.pages.dev/v1/currencies/'

	const fetchData = async (url: string) => {
		const response = await fetch(url)
		if (!response.ok) {
			console.warn(`Failed to fetch exchange rate from ${url}`)
			return null
		}
		return await response.json()
	}

	const rates =
		(await fetchData(`${cdnString}usd.json`))
		|| (await fetchData(`${fallbackString}usd.json`))

	return z
		.record(z.string().toUpperCase(), z.number())
		.parse(rates['usd'])
}
