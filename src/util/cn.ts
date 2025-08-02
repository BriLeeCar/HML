import clsx from 'clsx';
import { ClassNameValue, twMerge } from 'tailwind-merge';

/**
 * Utility function to combine class names and merge Tailwind CSS classes using CLSX and Tailwind Merge.
 *
 * @param classNames - A list of class names to be combined.
 * @returns A single string with merged class names.
 */
export const cn = (...classNames: ClassNameValue[]) => {
	return twMerge(clsx(classNames));
};
