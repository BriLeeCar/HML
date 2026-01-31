import type { Data } from 'payload'

export const def = {
	min: { qty: 0, uom: '1' },
	max: { qty: 0, uom: '1' },
	na: false,
	minMaxEqual: false,
	sameUOM: false,
}
export const labelComponent = '@/collections/Pathways/Label#default'

export const minMaxEqualCondition = (data: Data): boolean => {
	const { minMaxEqual } = data.processingTimeVirtual
	if (minMaxEqual && minMaxEqual == true) {
		return false
	}
	return true
}

export const sameUOMCondition = (data: Data): boolean => {
	const { sameUOM } = data.processingTimeVirtual
	return sameUOM && sameUOM == true ? false : true
}
