'use client'

import { Transition } from '@headlessui/react'
import { useContext } from 'react'
import { CookieContext } from './CookieContext'

const CookieNotification = () => {
	const { allow, cookieCB } = useContext(CookieContext)

	return (
		<>
			{/* Global notification live region, render this permanently at the end of the document */}
			<div
				aria-live='assertive'
				className='pointer-events-none fixed inset-0 left-0 z-99 flex items-start px-4 py-6 sm:items-start sm:p-6'>
				<div className='flex w-auto flex-col items-center space-y-4 sm:items-end'>
					{/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
					<Transition show={allow == null}>
						<div className='pointer-events-auto w-2xs max-w-sm rounded-lg bg-white shadow-lg outline-1 outline-black/5 transition data-closed:opacity-0 data-enter:transform data-enter:duration-300 data-enter:ease-out data-closed:data-enter:translate-y-2 data-leave:duration-100 data-leave:ease-in data-closed:data-enter:sm:translate-x-2 data-closed:data-enter:sm:translate-y-0 dark:bg-gray-800 dark:-outline-offset-1 dark:outline-white/10'>
							<div className='p-4'>
								<div className='flex flex-col items-start'>
									<p className='text-foreground font-bold tracking-tight'>YOUR PRIVACY</p>
									<p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
										We use cookies to save your pathway preferences locally on your computer to
										improve your experience. We do not have access to any personal data, and you are
										more than welcome to both decline and delete these cookies.
									</p>
									<p>
										Privacy data walkthrough & link
										{/* PRIVACY AND SAFETY LINK */}
									</p>
									<p>How to check who's tracking you online?</p>
									<p>Cleaning browser cookies guide & link</p>
									<p>Third party cookies vs site cookies</p>
									<div className='mx-auto mt-4 flex'>
										<button
											type='button'
											onClick={() => {
												cookieCB(true)
											}}
											className='bg-hml-red hover:bg-hml-red-700 click 0 inline-flex items-center rounded-md px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400'>
											Accept
										</button>
										<button
											type='button'
											onClick={() => {
												cookieCB(false)
											}}
											className='click ml-3 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20'>
											Decline
										</button>
									</div>
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</>
	)
}

export { CookieNotification }
