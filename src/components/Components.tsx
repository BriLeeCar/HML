import { JSX, ReactNode } from 'react'

export const Header = ({
	children,
	level,
	...props
}: {
	children: ReactNode
	level: 1 | 2 | 3 | 4 | 5 | 6
}) => {
	const Tag = `h${level}` as keyof JSX.IntrinsicElements
	return <Tag {...props}>{children}</Tag>
}
