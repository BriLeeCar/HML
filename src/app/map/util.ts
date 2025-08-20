// import type { zodCountryRest } from "~/data/baseCountryApi"
import { type MotionProps } from 'motion/react'
import countryPaths from '~/data/mapPathData.json'

// #region ! ---------- MAP REDUCER ----------
type tMapState = {
	hovered: string | null
	selected: string | null
	inViewCountries: string[]
	dragging: { first: boolean; current: boolean }
	boundaries: Record<string, number>
	hasVisited: boolean
}

type tMapAction =
	| {
			type: 'visited'
			details: { country: string; inView: boolean }
	  }
	| {
			type: 'set-boundaries'
	  }
	| { type: 'visitCookie' }
	| { type: 'countryHover'; details: string }
	| { type: 'clearHover' }
	| {
			type: 'setDragging'
			details: { first: boolean; current: boolean }
	  }
	| {
			type: 'selected'
			details?: string | null
	  }

export type tMapReducer = {
	state: tMapState
	action: tMapAction
}
// #endregion ! --------------------

// #region ! ---------- PATH JSON ----------
export type tCountryPathData = {
	abbr: string
	path: string
	haveData: boolean
	tier: 0 | 1 | 2 | 3 | 999
}
export type tCountryPathDataWithName = tCountryPathData & {
	name: tCountryKeys
}
export type tCountryKeys = keyof typeof countryPaths
export type tCountryPaths = Record<tCountryKeys, tCountryPathData>
// #endregion ! --------------------

// #region ! ---------- COMPONENTS ----------
export type tMapSVGProps = {
	className?: string
} & MotionProps

export type tMapPathElProps = Omit<Props<'path'>, 'name'>
	& tCountryPathDataWithName & {
		canClick?: boolean
		handleInView?: (country: string, inView: boolean) => void
	}

// #endregion ! --------------------

export const isUS = ({
	tier,
	abbr,
	name,
}: Pick<tCountryPathDataWithName, 'tier' | 'abbr' | 'name'>) => {
	return (
		tier == 999 || abbr == 'US' || name == 'United States of America'
	)
}
