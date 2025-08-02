import { ReactNode } from 'react';

// #region ! ---------- toTitleCase ----------

/**
 *
 * @param str - The string to convert to title case. If a ReactNode is passed, it will be converted to a string.
 * @description Converts a string to title case, capitalizing the first letter of each word,
 * except for minor words (like "and", "the", etc.) and words with 2 or fewer characters.
 * It also handles punctuation correctly, ensuring that words with punctuation are split
 * and capitalized properly.
 * @returns
 */
export const toTitleCase = (
	str: string | ReactNode,
): ReactNode | ReactNode[] => {
	return (str as string)
		.toLowerCase()
		.replace(/\s?—\s?/g, '—')
		.split(' ')
		.map((word: string, i: number) => {
			if (i == 0 && !PUNTUTATION.some((p) => word.includes(p))) {
				// Capitalize the first word of the string

				return toProperCase(word);
			}
			if (MINOR_WORDS.includes(word)) {
				// Do not capitalize minor words or words with 2 or fewer characters

				return word;
			} else if (word.match(/[—;:!?-]/g)) {
				// If the word contains punctuation, split it and capitalize each part
				// and join them back with the original punctuation
				const splitter = word.match(/[—;:!?-]/g)![0];
				return word
					.split(/[—;:!?-]/g)
					.map((words) => {
						return toProperCase(words);
					})
					.join(splitter);
			} else return ' ' + toProperCase(word);
		})
		.filter((word) => word)
		.join(' ')
		.replace(/\s{2,}/g, ' '); // Remove extra spaces
};

const MINOR_WORDS: string[] = [
	'a',
	'an',
	'and',
	'as',
	'at',
	'but',
	'by',
	'for',
	'if',
	'in',
	'into',
	'nor',
	'of',
	'off',
	'on',
	'or',
	'out',
	'over',
	'per',
	'so',
	'the',
	'to',
	'up',
	'via',
	'with',
	'yet',
];
const PUNTUTATION: string[] = ['—', ';', ':', '!', '?', '-', '.'];

const toProperCase = (word: string): string =>
	word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

// #endregion ! --------------------
