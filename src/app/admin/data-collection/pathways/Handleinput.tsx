'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { Button } from '~/components/Button'
import { Input } from '~/components/Form'

export const GetHandle = () => {
	const router = useRouter()
	const ref = useRef<HTMLInputElement>(null)

	useEffect(() => {
		window.alert('please provide a valid discord handle to proceed')
	})

	const handleSubmit = () => {
		router.push(
			`/admin/data-collection/pathways?handle=${ref.current?.value}`
		)
	}

	return (
		<div className='mx-auto mt-10 flex max-w-sm flex-col gap-4'>
			<Input
				ref={ref}
				type='text'
				placeholder='username#1234'
			/>
			<Button
				className='bg-[#7A2235]'
				type='button'
				onClick={handleSubmit}>
				Submit
			</Button>
		</div>
	)
}
