declare global {
	type Props<T = 'div'> = React.ComponentPropsWithoutRef<T>;

	namespace Props {
		type Icon = Props<'svg'> & {
			solid?: boolean;
			IconName: IconKey;
		};

		type IconPath = Omit<Icon, 'IconName'>;
		type Link = Props<typeof import('next/link').default> & {
			size?: 'sm' | 'md' | 'lg';
		};

		type Heading = Props<'h1'> & {
			level?: 1 | 2 | 3 | 4 | 5 | 6;
			size?: 'xs' | 'sm' | 'md' | 'lg' | 'title';
		};
	}

	type IconKey = keyof typeof import('~/components/Icons');
}

export {};
