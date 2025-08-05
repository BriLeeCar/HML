import { cn } from '~/cn';
import { Link } from '../Link';

export const Logo = ({ ...props }: Omit<Props<typeof Link>, 'href'>) => (
	<Link
		href='/'
		{...props}
		className={cn(
			'flex-row items-center justify-start gap-[0.25rem] text-left font-serif no-underline',
			props.className,
		)}
		title='Help Me Leave Homepage'
	>
		help
		<span className='italic font-bold mr-0.5'>me</span>
		leave
	</Link>
);
