'use client';

import { MouseEvent, useState } from 'react';
import { cn } from '../util/cn';
import { Icon, IconKeys } from './Icon';

export const ToggleBtn = ({
	isToggled = false,
	icon,
	title,
	...props
}: Omit<Props<'button'>, 'title'> & {
	isToggled?: boolean;
	icon: IconKeys;
	title: Array<string>;
}) => {
	const [toggled, setToggled] = useState(isToggled);

	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		const btn = e.currentTarget as HTMLButtonElement;
		btn.animate(
			[
				{ transform: 'scale(1)' },
				{ transform: 'scale(1.2)' },
				{ transform: 'scale(1)' },
			],
			{
				duration: 300,
				easing: 'ease-in-out',
				iterations: 1,
			},
		);
		setTimeout(() => {
			setToggled(!toggled);
		}, 175);
	};

	return (
		<button
			{...props}
			onClick={handleClick}
			className={cn(
				'cursor-pointer transition-opacity relative *:absolute *:top-1/2 *:-translate-y-1/2 *:left-1/2 *:-translate-x-1/2 h-7 w-7',
				toggled ? '*:h-7 *:w-7' : '*:h-5 *:w-5',
				props.className,
			)}
			title={title && toggled ? title[0] : title[1]}
		>
			<Icon IconName={icon} {...(toggled ? { solid: true } : {})} />
		</button>
	);
};
