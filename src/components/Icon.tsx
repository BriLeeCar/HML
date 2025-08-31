import { cn } from '~/lib/cn'
import * as AllIcons from './Icons'

export { AllIcons }

/**
 *
 * @param IconName - The name of the icon component to render. All of the icons are exported from `~/components/Icons`.
 * @param solid - Optional prop to render the icon in solid style. All icons support this prop, but not all icons have a solid style.
 * @param props - Additional SVG properties to apply to the icon.
 * @returns
 *
 * Icon colors are controlled by the `text-[COLOR_NAME]-[COLOR_SHADE]` class through TailWindCSS
 */

export const Icon = ({
	as,
	btnTitle,
	solid,
	IconName,
	...props
}: Props.Icon & { as?: 'button'; btnTitle?: string }) => {
	const SelectedIcon = AllIcons[IconName]

	if (as === 'button') {
		return (
			<button
				title={btnTitle}
				aria-label={btnTitle}>
				<svg
					{...props}
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					className={cn('click', props.className)}>
					<SelectedIcon solid={solid} />
				</svg>
			</button>
		)
	}

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			{...props}>
			<SelectedIcon solid={solid} />
		</svg>
	)
}
