import * as barrel from '@/collection/barrel'
import type { CollectionConfig } from 'payload'

export const allCollections = Object.values(barrel).reduce((acc, current) => {
	if (typeof current != 'string') {
		acc.push(current)
	}
	return acc
}, [] as CollectionConfig[])
