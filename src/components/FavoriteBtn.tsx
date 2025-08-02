'use client';

import { cn } from '~/util/cn';
import { ToggleBtn } from './_ToggleBtn';

export const FavoriteBtn = ({
	isFavorited = false,
	...props
}: Props<'button'> & { isFavorited?: boolean }) => (
	<ToggleBtn
		isToggled={isFavorited}
		icon='HeartIcon'
		{...props}
		className={cn(
			'text-red-500 hover:text-red-600 active:text-red-700',
			props.className,
		)}
		title={['Remove from favorites', 'Add to favorites']}
	/>
);
