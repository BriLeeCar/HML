import type React from 'react'

declare global {
	type RefObject<T> = React.RefObject<T>

	type ReactNode = React.ReactNode

	interface EFocus<Target = Element, RelatedTarget = Element> extends React.FocusEvent<
		Target,
		RelatedTarget
	> {
		currentTarget: Target
	}

	interface EMouse<Target = Element, NativeEv = MouseEvent> extends React.MouseEvent<
		Target,
		NativeEv
	> {
		currentTarget: Target
	}

	interface EChange<Target = Element, RelatedTarget = Element> extends React.ChangeEvent<
		Target,
		RelatedTarget
	> {
		currentTarget: Target
	}
}
