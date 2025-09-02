import Link from 'next/link'

const LeaveNow = () => {
	return (
		<div className='text-foreground *:hover:text-muted-foreground *:decoration-brand-bright my-10 flex flex-col justify-around *:px-8 *:py-6 *:text-3xl *:font-semibold *:underline *:decoration-2 *:underline-offset-4 md:flex-row'>
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
