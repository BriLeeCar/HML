import { Button } from '@/components/Button'
import { FullLogo } from '@/components/Logo'

const Logo = () => (
	<Button
		className='w-full h-auto p-4 pt-0 hover:text-hml-slate dark:hover:text-hml-yellow max-w-50 mx-auto mb-4 -mt-4'
		variant='ghost'
		href='/admin'>
		<FullLogo />
	</Button>
)

export const TopNavLogo = () => <FullLogo />

export default Logo
