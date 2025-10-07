import { useQuill } from 'react-quilljs'
// or const { useQuill } = require('react-quilljs');

import type { QuillOptions } from 'quill'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'
import {
	ActionDispatch,
	useEffect,
	type ComponentPropsWithoutRef,
	type ComponentPropsWithRef,
} from 'react'
import { cn } from '~/lib/cn'
import { ReducerSetField } from '../blog/lib'

export const QuillWrapper = ({
	wrapperProps,
	contentProps,
	...quillOptions
}: QuillOptions & {
	wrapperProps?: ComponentPropsWithoutRef<'div'>
	contentProps?: {
		value: {
			contentText: string
			contentHTML: string
		}
		dispatchDataAction: ActionDispatch<
			[action: ReducerSetField<'contentText' | 'contentHTML'>]
		>
	}
}) => {
	const { quill, quillRef } = useQuill({
		theme: 'snow',
		// modules: {
		// 	toolbar: {
		// 		container: '#toolbar',
		// 	},
		// },
		...quillOptions,
	})

	const words = () => {
		const text = contentProps?.value.contentText ?? ''
		const spaces = text.match(/\s+/g)
		if (text.length === 0) return 0
		if (spaces === null) return 1
		//
		return spaces.length + 1
	}

	const letters = () => {
		const text = contentProps?.value.contentText ?? ''
		if (text.length === 0) return 0

		//
		return (
			contentProps?.value.contentText.replace(/\W/g, '').length ?? 0
		)
	}

	useEffect(() => {
		if (quill) {
			if (
				contentProps?.value.contentHTML
				&& quill?.getText().length < 2
			) {
				quill.clipboard.dangerouslyPasteHTML(
					contentProps.value.contentHTML
				)
			}
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			quill.on('text-change', (delta, oldDelta, source) => {
				contentProps?.dispatchDataAction({
					type: 'SET_FIELD',
					payload: [
						{
							fieldKey: 'contentText',
							fieldValue: quill.getText().trim(),
						},
						{
							fieldKey: 'contentHTML',
							fieldValue: quill.getSemanticHTML().toString(),
						},
					],
				})
			})
		}
	}, [quill, contentProps])

	return (
		<>
			<div
				{...wrapperProps}
				className={cn('h-96', wrapperProps?.className)}>
				{/* <QuillToolbar /> */}
				<div ref={quillRef} />
				<div id='editor' />
			</div>
			<span className='flex w-full items-center justify-end gap-2 p-4'>
				<QuillCounter>{words()} words</QuillCounter> /{' '}
				<QuillCounter>{letters()} characters</QuillCounter>
			</span>
		</>
	)
}

const QuillCounter = ({ ...props }: ComponentPropsWithRef<'div'>) => {
	return (
		<div
			{...props}
			className='text-sm text-zinc-500 dark:text-zinc-400'
		/>
	)
}

// TODO: CREATE CUSTOM TOOLBAR TO USE WITH OUR BRANDING AND FORMAT IN MIND
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const QuillToolbar = () => {
	return (
		<div id='toolbar'>
			<select
				className='ql-size'
				defaultValue='normal'>
				<option value='small'></option>
				<option value='normal'></option>
				<option value='large'></option>
				<option value='huge'></option>
			</select>
			{/* <select
				className='ql-header'
				defaultValue='section'>
				<option value='section'>Section</option>
				<option value='subsection'>Subsection</option>
			</select> */}

			<button className='ql-italic'></button>
			<button className='ql-bold'></button>

			<button className='ql-link'></button>
			<button
				className='ql-list'
				value='bullet'></button>
			<button
				className='ql-list'
				value='ordered'></button>
		</div>
	)
}
