export const Divider = ({ children }: { children?: ReactNode }) => {
	return (
		<div className='my-10 flex items-center'>
			<div
				aria-hidden='true'
				className='w-full border-t border-gray-300 dark:border-white/15'
			/>
			<div className='relative flex justify-center'>
				{children && (
					<span className='bg-white px-2 text-sm text-gray-500 dark:bg-gray-900 dark:text-gray-400'>
						{children}
					</span>
				)}
			</div>
			<div
				aria-hidden='true'
				className='w-full border-t border-gray-300 dark:border-white/15'
			/>
		</div>
	)
}
