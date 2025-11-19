import { Text } from '../../_components/text'

export const ProgressBar = ({}) => {
	return (
		<div className='bg-mulberry/10 admin-mobile-padding my-4 pt-2 pb-4'>
			<h4 className='sr-only'>Status</h4>
			<Text>Migrating MySQL database...</Text>
			<div
				aria-hidden='true'
				className='mt-4'>
				<div className='overflow-hidden rounded-full bg-gray-200'>
					<div
						style={{ width: '37.5%' }}
						className='bg-mulberry h-2 rounded-full'
					/>
				</div>
				<div className='mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid'>
					<div className='text-mulberry'>Copying files</div>
					<div className='text-mulberry text-center'>
						Migrating database
					</div>
					<div className='text-center'>Compiling assets</div>
					<div className='text-right'>Deployed</div>
				</div>
			</div>
		</div>
	)
}
