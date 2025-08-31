'use client'

import { motion } from 'motion/react'
import { redirect, RedirectType } from 'next/navigation'
import { useRef } from 'react'
import { cn } from '~/lib/cn'
import { tMapPathElProps, tMapSVGProps } from './util'

const svgBase = {
	width: 700,
	height: 346,
}

export const MapSvg = ({ ...props }: tMapSVGProps) => {
	return (
		<motion.svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
			id='worldMap'
			xmlLang='en'
			x={svgBase.width}
			y={svgBase.height}
			enableBackground={`new ${svgBase.width} ${svgBase.height}`}
			style={{
				touchAction: 'none',
			}}
			initial={{ opacity: 1 }}
			viewBox='25 100 700 346'
			className={cn(
				'absolute top-0 left-0 h-screen w-auto lg:relative lg:h-auto lg:max-h-screen lg:w-full lg:max-w-screen',
				props.className
			)}
			strokeWidth={0.5}
			version='1.1'>
			{props.children}
		</motion.svg>
	)
}

export const MapPathEl = ({
	canClick = true,
	...props
}: tMapPathElProps) => {
	const pathRef = useRef(null)
	const { svgPath, tier, name, abbr, className, ...rest } = props as {
		svgPath: string | null
		name: string
		abbr: string
		tier: 'now' | 'soon' | 'None' | null
		className?: string
	}

	const classes = cn(
		'stroke-background stroke-0.5 focus:outline-none dark:stroke-neutral-800',
		className
	)

	return (
		<>
			<path
				{...rest}
				ref={pathRef}
				d={svgPath!}
				aria-label={name}
				className={cn(classes)}
				id={abbr}
				data-country={name}
				data-abb={abbr}
				data-tier={tier}
				onClick={() => {
					if (canClick)
						redirect(
							`/countries/${abbr?.toLowerCase()}`,
							'push' as RedirectType
						)
				}}
			/>
		</>
	)
}
