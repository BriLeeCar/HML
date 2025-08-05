'use client';
import { createTheme } from '@mui/material';

const bodyFont = 'var(--font-roboto)';
const headingFont = 'var(--font-roboto-serif)';

const allHeadings = () => {
	const headings = {};
	for (let i = 1; i <= 6; i++) {
		Object.assign(headings, {
			[`h${i}`]: {
				fontFamily: headingFont,
			},
		});
	}
	return headings;
};

const theme = createTheme({
	typography: {
		body1: {
			fontFamily: bodyFont,
		},
		...allHeadings(),
	},
});

export default theme;
