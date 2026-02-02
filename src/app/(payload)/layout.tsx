/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'
import React from 'react'
import { importMap } from './admin/importMap.js'

import '@/app/_styles/tw.css'
import './src-app-(payload).scss'

import { Open_Sans } from 'next/font/google'

type Args = {
	children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
	'use server'
	return handleServerFunctions({
		...args,
		config,
		importMap,
	})
}

const openSans = Open_Sans({
	weight: 'variable',
	style: ['normal', 'italic'],
	variable: '--font-open-sans',
})

const Layout = ({ children }: Args) => (
	<RootLayout
		htmlProps={{
			className: openSans.variable,
		}}
		config={config}
		importMap={importMap}
		serverFunction={serverFunction}>
		{children}
	</RootLayout>
)

export default Layout
