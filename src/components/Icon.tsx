import * as AllIcons from '~/components/Icons';

export type IconKeys = keyof typeof AllIcons;
export { AllIcons };

export const Icon = ({
	solid,
	IconName,
	...props
}: Props.Icon & { IconName: keyof typeof AllIcons }) => {
	const SelectedIcon = AllIcons[IconName];

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			{...props}
		>
			<SelectedIcon solid={solid} />
		</svg>
	);
};
