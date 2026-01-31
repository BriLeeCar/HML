import { cn } from './cn'

export const cls = (...classes: (string | string[])[]) => {
	if (typeof classes === 'string') {
		return classes
	}
	return cn(classes)
}
