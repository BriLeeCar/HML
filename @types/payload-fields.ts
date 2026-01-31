export type MinMaxObj = {
	min: { qty: number | null; uom: string | null }
	max: { qty: number | null; uom: string | null }
} | null

export type MinMaxVirtualVirtual = MinMaxObj & {
	na: boolean
	minMaxEqual: boolean
	sameUOM: boolean
}

export type Data<N extends string> = Record<`${N}Virtual`, MinMaxVirtualVirtual>
	& Record<N, MinMaxVirtualVirtual>
