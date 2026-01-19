import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Leave Now',
	description:
		'Get immediate help and resources to leave as soon as possible. We have guides and support staff ready to assist you.',
}

const LeaveNow = () => {
	return (
		<div className='text-foreground *:hover:text-muted-foreground *:decoration-hml-red dark:*:decoration-hml-yellow my-10 flex flex-col justify-around *:px-8 *:py-6 *:text-3xl *:font-semibold *:underline *:decoration-2 *:underline-offset-4 md:flex-row'>
			<Link
				href='leave-now/start'
				prefetch={false}>
				How to Start
			</Link>
			<Link
				href='leave-now/leave'
				prefetch={false}>
				How to Leave
			</Link>
		</div>
	)
}

export default LeaveNow
