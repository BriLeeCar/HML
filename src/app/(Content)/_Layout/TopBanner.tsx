'use client'

import { useState } from 'react'
import { Bold, Icon, InlineLink } from '~/components'

export const AnnouncementBanner = () => {
	const [isVisible, setIsVisible] = useState(true)

	return (
		isVisible && (
			<div className='bg-brand/10 flex w-full items-center gap-6 px-6 py-2.5 sm:px-3.5 sm:before:flex-1'>
				<p className='text-brand-bright flex items-center gap-x-3 text-base/4'>
					<Bold className='font-bold uppercase'>URGENT:</Bold>
					<InlineLink
						className='font-medium'
						href='/pdf/Netherlands Safe Country Press Release 10-27-25.pdf'
						target='_blank'
						rel='noopener noreferrer'>
						Netherlands Suspends "Safe Country" List Ahead of EU
						Reform
					</InlineLink>
				</p>
				<div className='flex flex-1 justify-end'>
					<button
						type='button'
						onClick={() => setIsVisible(false)}
						className='click hover:text-brand-bright -m-3 p-3 focus-visible:-outline-offset-4'>
						<span className='sr-only'>Dismiss</span>
						<Icon
							IconName='XIcon'
							aria-hidden='true'
							className='size-4'
						/>
					</button>
				</div>
			</div>
		)
	)
}
