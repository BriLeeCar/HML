'use client'

import { Button } from '@/admin/_components'
import type { FormEvent } from 'react'
import { cn } from '~/lib'

export const SubmitButton = ({ ...props }) => {
	const handleSubmit = (e: FormEvent) => {
		console.log(e)
		e.preventDefault()
		const form = document.forms[0]
		const data = new FormData(form)
		if (data.entries.length > 0) console.log([...data.keys()].map(k => k))
		else {
			;[...form.elements].forEach(x => {
				if (
					x instanceof HTMLInputElement
					|| x instanceof HTMLSelectElement
					|| x instanceof HTMLTextAreaElement
				) {
					let value: string | boolean

					switch (x.type) {
						case 'checkbox':
							value = (x as HTMLInputElement).checked
							break
						case 'radio':
							value = (x as HTMLInputElement).value == 'Yes'
							break
						default:
							value = x.value
					}

					x.name && console.log({ name: x.name, value: value })
				}
			})
		}
	}

	return (
		<Button
			{...props}
			onClick={handleSubmit}
			type='submit'
			className={cn('mt-8', props.className)}>
			Submit Assessment
		</Button>
	)
}
