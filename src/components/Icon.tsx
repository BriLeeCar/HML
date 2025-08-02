import * as AllIcons from '~/components/Icons';

export { AllIcons };

/**
 *
 * @param IconName - The name of the icon component to render. All of the icons are exported from `~/components/Icons`.
 * @param solid - Optional prop to render the icon in solid style. All icons support this prop, but not all icons have a solid style.
 * @param props - Additional SVG properties to apply to the icon.
 * @returns
 *
 * Icon colors are controlled by the `text-[COLOR_NAME]-[COLOR_SHADE]` class through TailWindCSS
 */

export const Icon = ({ solid, IconName, ...props }: Props.Icon) => {
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
