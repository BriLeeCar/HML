declare global {
	declare type Props<T = 'div'> = React.ComponentPropsWithoutRef<T>
	declare type Props<T, P> = React.ComponentPropsWithoutRef<T>
		& React.JSX.ElementType<P>

	namespace Props {
		type Icon = Props<'svg'> & {
			solid?: boolean
			IconName: IconKey
		}

		type IconPath = Omit<Icon, 'IconName'>
		type Link = Omit<
			Props<typeof import('next/link').default>,
			'href'
		> & {
			size?: 'sm' | 'md' | 'lg'
			href: string
		}

		type Heading = Props<'h1'> & {
			level?: 1 | 2 | 3 | 4 | 5 | 6
			size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'title'
		}

		type Checkbox = Props<'input'>
			& ElementType<{
				defaultChecked?: boolean
			}>

		type WithRef<T> = React.ComponentPropsWithRef<T>
	}

	type IconKey = keyof typeof import('../src/components/Icons')
}

export {}
