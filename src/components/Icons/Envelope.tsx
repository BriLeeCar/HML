export const EnvelopeIcon = ({ solid }: Props.IconPath) => {
	return solid ? (
		<>
			<path d='m12.3 13.52 9.11-6.83C20.57 5.1 18.92 4 17 4H7C5.08 4 3.43 5.1 2.59 6.69l9.11 6.83c.18.13.42.13.6 0' />
			<path d='M13.5 15.13a2.5 2.5 0 0 1-3 0L2.02 8.77c0 .08-.02.15-.02.23v6c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V9c0-.08-.02-.15-.02-.23z' />
		</>
	) : (
		<>
			<path d='M17 4H7C4.24 4 2 6.24 2 9v6c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V9c0-2.76-2.24-5-5-5M7 6h10c.92 0 1.73.42 2.28 1.07l-6.97 5.42c-.18.14-.43.14-.61 0L4.73 7.07C5.28 6.42 6.09 6 7.01 6Zm10 12H7c-1.65 0-3-1.35-3-3V9.04l6.46 5.03c.45.35.99.53 1.54.53s1.08-.18 1.53-.53L20 9.04V15c0 1.65-1.35 3-3 3' />
		</>
	);
};
