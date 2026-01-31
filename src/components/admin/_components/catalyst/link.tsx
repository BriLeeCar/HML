import NextLink from 'next/link'

/**
 * TODO: Update this component to use your client-side framework's link
 * component. We've provided examples of how to do this for Next.js, Remix, and
 * Inertia.js in the Catalyst documentation:
 *
 * https://catalyst.tailwindui.com/docs#client-side-router-integration
 */

import * as Headless from '@headlessui/react'
import { forwardRef, type ForwardedRef } from 'react'

export const Link = forwardRef(function Link(
	props: { href: string } & Props<'a'>,
	ref: ForwardedRef<HTMLAnchorElement>
) {
	return (
		<Headless.DataInteractive>
			<NextLink
				{...props}
				ref={ref}
			/>
		</Headless.DataInteractive>
	)
})
