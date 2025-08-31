// import type { zodCountryRest } from "~/data/baseCountryApi"
import { type MotionProps } from 'motion/react'
import { type DB } from '~/server/db/db'

// #region ! ---------- MAP REDUCER ----------
type tMapState = {
	hovered: string | null
	selected: string | null
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

// #endregion ! --------------------

// #region ! ---------- COMPONENTS ----------
export type tMapSVGProps = {
	className?: string
} & MotionProps

export type tMapPathElProps = Omit<Props<'path'>, 'name'>
	& Partial<DB['countries'][number]> & {
		canClick?: boolean
	}

// #endregion ! --------------------
