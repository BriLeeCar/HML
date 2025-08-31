import db from '~/server/db/db'
declare global {
	namespace ApiData {
		export type DB = ReturnType<typeof db>

		// #region ? TYPES

		type CountryETCData = {
			climate: Climate
			health: Health
			communities: Communities & { isUn: boolean }
			images: Images
			economy: Economy
			quality: Quality
			crime: Crime
			api: CountryApi
			pathways?: Pathway[]
		}

		type CountryKeys = keyof tCountryETCData

		type Climate = {
			abbr: string
			pollution: number
			climate: number
		}

		type Health = {
			abbr: string
			rank: number | null
			cost: number | null
			index: number | null
		}

		type Communities = {
			abbr: string
			prideScore: number | null
			racismRank: number | null
			transSafety: boolean
		}

		type Images = {
			abbr: string
			name: string | null
			handle: string | null
			havePhoto: boolean
			width: number | null
			height: number | null
		}

		type Economy = {
			abbr: string
			col: number | null
			purchasingPower: number | null
			propertyToIncome: number | null
		}

		type Quality = {
			abbr: string
			index: number | null
			rank: number | null
		}

		type Crime = {
			abbr: string
			index: number | null
			safety: number | null
		}

		type CountryBase = {
			abbr: string
			name: string
			svgPath: string | null
			tier: string | null
		}

		type PreCountryApi = {
			unMember: boolean
			abbr: string
			name: string
			flag: string
			population: number
			region: string
			subregion: string
			languages: Record<string, string>
			currencies: Record<string, { name: string; symbol: string }>
		}

		type Pathway = {
			id: number
			abbr: string
			name?: string
			description?: string
			official_link?: string
			digital_worker: boolean
			monthly_income: boolean
			job_required: boolean
			age_18_30: boolean
			age_60_plus: boolean
			travelling_with_kids: boolean
			entrepreneur: boolean
			study: boolean
		}

		type CountryApi = Omit<
			tPreCountryApi,
			'languages' | 'currencies' | 'abbr' | 'isUn'
		> & {
			languages: Array<{
				abbr: string
				name: string
			}>
			currencies: Array<{
				abbr: string
				name: string
				symbol: string
			}>
		}

		export type ExplorerFilters = {
			abbr: string
			name: string
			unMember: boolean
			prideScore: boolean | 0 | null
			transSafety: boolean
		}
		export type Country = DB['countries'][number]
		// #endregion ?
	}
}
