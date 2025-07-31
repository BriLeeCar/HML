import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export const cn = (...classNames: (string | undefined)[]) => {
	return twMerge(clsx(classNames));
};
