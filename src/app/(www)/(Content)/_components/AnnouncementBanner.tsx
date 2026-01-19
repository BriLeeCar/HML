'use client'

import { useState } from 'react'
import { Icon, InlineLink } from '~/components'
import { topBarAnnouncement } from '~/data/announcement'

export const AnnouncementBanner = () => {
	const [isVisible, setIsVisible] = useState(true)

	return (
		isVisible && (
			<div
				id='urgentBanner'
				className='bg-hml-red grid w-full grid-cols-[1fr_auto] items-center gap-6 px-6 py-3.5 sm:px-6.5'>
				<InlineLink
					className='dark:decoration-hml-mulberry-100 flex w-full max-w-full items-center justify-start gap-x-3 overflow-hidden md:justify-center md:text-lg/4'
					href={`/${topBarAnnouncement.link.folder}/${topBarAnnouncement.link.fileName}.${topBarAnnouncement.link.ext}`}
					target={topBarAnnouncement.link.target}
					rel='noopener noreferrer'>
					<strong className='text-hml-mulberry-50 text-xl font-bold uppercase'>
						{topBarAnnouncement.type}:
					</strong>
					<span className='text-hml-grey block w-fit truncate text-sm font-semibold italic'>
						{topBarAnnouncement.message}
					</span>
				</InlineLink>
				<div className='flex justify-end'>
					<button
						title='Dismiss'
						type='button'
						onClick={() => setIsVisible(false)}
						className='click -m-3 p-3 text-white hover:opacity-50 focus-visible:-outline-offset-4'>
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
