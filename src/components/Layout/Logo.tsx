import { cn } from '~/cn';

export const Logo = ({ ...props }: Props) => (
	<div
		{...props}
		className={cn(
			'flex-row items-center justify-start gap-[0.25rem] text-left font-playfair-display',
			props.className,
		)}
	>
		{/* <img
			className='w-[2rem] relative h-[2rem] overflow-hidden shrink-0'
			alt=''
			src='lucide/plane.svg'
		/> */}
		<div className='relative leading-[150%]'>
			<span>
				<span>help</span>
				<span className='text-[0.75rem]'>{` `}</span>
			</span>
			<i className='font-bold'>
				<span>me</span>
				<span className='text-[0.75rem]'>{` `}</span>
			</i>
			<span>leave</span>
		</div>
	</div>
);
