import { cn } from '~/cn';

export const Logo = ({ ...props }: Props) => (
	<div
		{...props}
		className={cn(
			'flex-row items-center justify-start gap-[0.25rem] text-left font-playfair-display',
			props.className,
		)}
	>
		<div className='flex items-center font-serif'>
			<span>help</span>
			<span className='italic font-bold mr-0.5'>me</span>
			<span>leave</span>
		</div>
	</div>
);
