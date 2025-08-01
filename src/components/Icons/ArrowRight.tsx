export const ArrowRightIcon = ({ solid }: Props.IconPath) => {
	return solid ? (
		<>
			<path d='M6 12c0 .55.45 1 1 1h5v2.4c0 .64.74.98 1.23.58l4.08-3.4c.36-.3.36-.85 0-1.15l-4.08-3.4a.75.75 0 0 0-1.23.58v2.4H7c-.55 0-1 .45-1 1Z' />
		</>
	) : (
		<>
			<path d='M6 12c0 .55.45 1 1 1h7.09l-2.29 2.29a.996.996 0 0 0 .71 1.7c.26 0 .51-.1.71-.29l4-4a.996.996 0 0 0 0-1.41l-4-4a.996.996 0 1 0-1.41 1.41l2.29 2.29H7.01c-.55 0-1 .45-1 1Z' />
		</>
	);
};
