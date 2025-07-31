'use client';

import { cn } from '../util/cn';
import { ToggleBtn } from './_ToggleBtn';

export const BookmarkBtn = ({
	isBookmarked = false,
	...props
}: Props<'button'> & { isBookmarked?: boolean }) => (
	<ToggleBtn
		{...props}
		isToggled={isBookmarked}
		icon='BookmarkIcon'
		className={cn(
			'text-amber-500 hover:text-amber-600 active:text-amber-700',
			props.className,
		)}
		title={['Remove bookmark', 'Add bookmark']}
	/>
);
