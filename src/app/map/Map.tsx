'use client'

import { cva } from 'class-variance-authority'
import { motion, MotionProps, useInView } from 'motion/react'
import { redirect, RedirectType } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { cn } from '~/cn'

const svgBase = {
	width: 700,
	height: 346,
}

export type tCountryPaths = {
	[key: string]: {
		abbr: string
		path: string
		haveData: boolean
		tier: 0 | 1 | 2 | 3 | 999
	}
}

export const Map = ({
	...props
}: {
	className?: string
} & MotionProps) => {
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

const mapCVA = cva(['transition-all'], {
	variants: {
		tier: {
			1: ['fill-red-500'],
			2: [],
			3: [],
			0: ['fill-red-900'],
			999: '',
		},
		haveData: {
			true: 'click hover:opacity-50',
			false: 'fill-zinc-300 dark:fill-neutral-900',
		},
	},
	compoundVariants: [
		{
			tier: 999,
			haveData: true,
			className: 'cursor-not-allowed fill-[#FEC4C4]',
		},
	],
})

export const Path = ({
	handleInView,
	canClick = true,
	...props
}: Omit<Props<'path'>, 'name'> & {
	tier: 0 | 1 | 2 | 3 | 999
	haveData: boolean
	path: string
	name: string
	abb: string
	canClick?: boolean
	handleInView?: (country: string, inView: boolean) => void
}) => {
	const pathRef = useRef(null)
	const isInView = useInView(pathRef)

	useEffect(() => {
		if (isInView && props.haveData && props.tier !== 999) {
			handleInView && handleInView(props.name, true)
		} else {
			handleInView && handleInView(props.name, false)
		}
	}, [isInView, props.haveData, props.name, props.tier, handleInView])

	const { path, tier, haveData, name, abb, ...rest } = props
	const classes = cn(
		'stroke-background stroke-0.5 focus:outline-none dark:stroke-neutral-800',
		mapCVA({ tier, haveData }),
		props.className
	)

	return (
		<>
			{/* @ts-expect-error typing conflict between framer-motion and HTML */}
			<motion.path
				{...rest}
				ref={pathRef}
				d={path}
				aria-label={name}
				className={cn(classes)}
				id={abb}
				data-country={name}
				data-abb={abb}
				data-tier={tier}
				onClick={() => {
					if (canClick)
						redirect(
							`/countries/${abb.toLowerCase()}`,
							'push' as RedirectType
						)
				}}
			/>
		</>
	)
}
