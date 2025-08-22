'use client'

import { cva } from 'class-variance-authority'
import { motion, useInView } from 'motion/react'
import { redirect, RedirectType } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { cn } from '~/cn'
import { isUS, tMapPathElProps, tMapSVGProps } from './util'

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

const mapCVA = cva(['click transition-all hover:opacity-50'], {
	variants: {
		tier: {
			1: ['fill-red-500'],
			2: [],
			3: [],
			0: ['fill-red-900'],
			999: '',
		},
		haveData: {
			true: '',
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

export const MapPathEl = ({
	canClick = true,
	...props
}: tMapPathElProps) => {
	const pathRef = useRef(null)
	const isInView = useInView(pathRef)
	const {
		path,
		tier,
		haveData,
		name,
		abbr,
		handleInView,
		className,
		...rest
	} = props

	useEffect(() => {
		if (isInView && haveData && !isUS({ tier: tier, abbr, name })) {
			handleInView && handleInView(name, true)
		} else {
			handleInView && handleInView(name, false)
		}
	}, [isInView, haveData, name, tier, handleInView, abbr])

	const classes = cn(
		'stroke-background stroke-0.5 focus:outline-none dark:stroke-neutral-800',
		// @ts-expect-error
		mapCVA({ tier, haveData }),
		className
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
				id={abbr}
				data-country={name}
				data-abb={abbr}
				data-tier={tier}
				onClick={() => {
					if (canClick)
						redirect(
							`/countries/${abbr.toLowerCase()}`,
							'push' as RedirectType
						)
				}}
			/>
		</>
	)
}
