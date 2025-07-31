declare global {
	type Props<T = 'div'> = React.ComponentPropsWithoutRef<T>;

	namespace Props {
		type Icon = Props<'svg'> & {
			solid?: boolean;
		};
	}
}

export {};
