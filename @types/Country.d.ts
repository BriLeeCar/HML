import db from '~/server/db/db'
declare global {
	namespace ApiData {
		export type DB = ReturnType<typeof db>

		// #region ? TYPES

		type tCountryETCData = {
			climate: tClimate
			health: tHealth
			communities: tCommunities & { isUn: boolean }
			images: tImages
			economy: tEconomy
			quality: tQuality
			crime: tCrime
		} & { api: tCountryApi }

		type tCountryKeys = keyof tCountryETCData

		type tClimate = {
			abbr: string
			pollution: number
			climate: number
		}

		type tHealth = {
			abbr: string
			rank: number | null
			cost: number | null
			index: number | null
		}

		type tCommunities = {
			abbr: string
			prideScore: number | null
			racismRank: number | null
			transSafety: boolean
		}

		type tImages = {
			abbr: string
			name: string | null
			handle: string | null
			havePhoto: boolean
			width: number | null
			height: number | null
		}

		type tEconomy = {
			abbr: string
			col: number | null
			purchasingPower: number | null
			propertyToIncome: number | null
		}

		type tQuality = {
			abbr: string
			index: number | null
			rank: number | null
		}

		type tCrime = {
			abbr: string
			index: number | null
			safety: number | null
		}

		type tCountryBase = {
			abbr: string
			name: string
			svgPath: string | null
			tier: string | null
		}

		type tPreCountryApi = {
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

		type tCountryApi = Omit<
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

		export type tExplorerFilters = {
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
