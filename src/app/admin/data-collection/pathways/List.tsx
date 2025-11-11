import {
	ChangeEvent,
	Dispatch,
	MouseEvent,
	SetStateAction,
	useRef,
} from 'react'
import z from 'zod/v4'
import { Button } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { cn } from '~/lib/cn'
import { errors } from '../validation'
import { InputBase, Textarea } from './Form'
import { tPathwayForm } from './schema'

export type tListKeys =
	| 'residencyNotes'
	| 'citizenshipNotes'
	| 'reunificationNotes'
	| 'requirements'
	| 'requiredDocuments'
	| 'limitations'
	| 'notes'

/**
 * Array of notes with max length 2000 characters, max 100 entries
 */
export const zNoteArray = z
	.array(z.string().max(2000, errors.strMax(2000)))
	.max(100)
	.optional()
	.default([])

export const ListGrp = ({
	schemaKey,
	pathway,
	setPathway,
	buttonText,
	type,
}: {
	schemaKey: tListKeys
	pathway: tPathwayForm
	setPathway: Dispatch<SetStateAction<tPathwayForm>>
	buttonText?: string
	type: 'input' | 'textarea'
}) => {
	return (
		<div className='flex flex-col items-start gap-4 px-4'>
			<span className='flex w-full flex-col gap-4'>
				{(pathway[schemaKey].value as string[]).map((note, idx) => {
					const dataId = note.slice(0, 5).replaceAll(' ', '-')
					return type == 'textarea' ?
							<ListItem
								key={idx}
								index={dataId}
								note={note}
								setPathway={setPathway}
								pathway={pathway}
								schemaKey={schemaKey}
								type={type}
							/>
						:	<ListItemInput
								key={idx}
								index={dataId}
								note={note}
								setPathway={setPathway}
								pathway={pathway}
								schemaKey={schemaKey}
							/>
				})}
			</span>
			<span className='w-full'>
				<Button
					className={cn(
						'bg- w-full rounded-xl bg-[#DAE638] dark:bg-[#DAE63810] dark:text-[#DAE638]',
						'dark:hover:text-background',
						'hover:bg-[#DAE638] dark:hover:bg-[#DAE638]',
						'focus-visible:outline-offset-4 focus-visible:outline-[#DAE63880]'
					)}
					type='button'
					variant='ghost'
					onClick={() => {
						setPathway(
							Object.assign({}, pathway, {
								[schemaKey]: {
									value: [
										...(pathway[schemaKey].value as string[]),
										'',
									],
									error: null,
								},
							})
						)
					}}>
					{buttonText ?? 'Add Item'}
				</Button>
			</span>
		</div>
	)
}

const ListItem = ({
	note,
	index,
	setPathway,
	pathway,
	schemaKey,
	type,
}: {
	note: string
	index: string
	setPathway: Dispatch<SetStateAction<tPathwayForm>>
	pathway: tPathwayForm
	schemaKey: tListKeys
	type: 'input' | 'textarea'
}) => {
	const noteRef = useRef<HTMLTextAreaElement>(null)

	const getCurrentNotes = (el: HTMLElement) => {
		return [
			...(el
				.closest(type == 'textarea' ? 'span' : 'div')
				?.querySelectorAll(type) ?? []),
		]
	}

	const getCurrentNotesSchema = () => {
		return [...(pathway[schemaKey].value as string[])]
	}

	const handleChange = (
		e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setPathway(
			Object.assign({}, pathway, {
				[schemaKey]: {
					value: getCurrentNotes(e.target).map((el, i) => {
						return (getCurrentNotesSchema()[i] = el.value)
					}),
					error: null,
				},
			})
		)
	}

	const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		setPathway(
			Object.assign({}, pathway, {
				[schemaKey]: {
					value: getCurrentNotesSchema().filter(
						(_, i) =>
							i
							!= getCurrentNotes(e.currentTarget).findIndex(
								(el) => el === noteRef.current
							)
					),
					error: null,
				},
			})
		)
	}

	return (
		<div
			key={index}
			className='relative flex w-full gap-4'>
			{type == 'textarea' && (
				<Textarea
					ref={noteRef}
					defaultValue={note}
					placeholder='Add Note Text...'
					data-id={note.slice(0, 5).replaceAll(' ', '-')}
					handleBlur={handleChange}
				/>
			)}
			{type == 'input' && (
				<InputBase
					schemaKey={schemaKey}
					label={''}
					error={{
						location: 'above',
						message: undefined,
					}}
					onBlur={(e) => e}
					defaultValue={note}
				/>
			)}
			<Button
				variant='ghost'
				type='button'
				onClick={handleDelete}
				className='absolute top-0 -right-10 p-0 text-[#7A2235] outline-[#7A2235] hover:opacity-50 focus-visible:p-0'>
				<Icon
					IconName='XIcon'
					className='size-5'
					solid
				/>
			</Button>
		</div>
	)
}

const ListItemInput = ({
	note,
	index,
	setPathway,
	pathway,
	schemaKey,
}: {
	note: string
	index: string
	setPathway: Dispatch<SetStateAction<tPathwayForm>>
	pathway: tPathwayForm
	schemaKey: tListKeys
}) => {
	const noteRef = useRef<HTMLInputElement>(null)

	const getCurrentNotes = (el: HTMLElement) => {
		return [...(el.closest('div')?.querySelectorAll('input') ?? [])]
	}

	const getCurrentNotesSchema = () => {
		return [...(pathway[schemaKey].value as string[])]
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPathway(
			Object.assign({}, pathway, {
				[schemaKey]: {
					value: getCurrentNotes(e.target).map((el, i) => {
						return (getCurrentNotesSchema()[i] = el.value)
					}),
					error: null,
				},
			})
		)
	}

	const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		setPathway(
			Object.assign({}, pathway, {
				[schemaKey]: {
					value: getCurrentNotesSchema().filter(
						(_, i) =>
							i
							!= getCurrentNotes(e.currentTarget).findIndex(
								(el) => el === noteRef.current
							)
					),
					error: null,
				},
			})
		)
	}

	return (
		<div
			key={index}
			className='relative flex w-full gap-4'>
			<InputBase
				schemaKey={schemaKey}
				label={''}
				error={{
					location: 'above',
					message: undefined,
				}}
				onBlur={handleChange}
				defaultValue={note}
				ref={noteRef}
			/>
			<Button
				variant='ghost'
				type='button'
				onClick={handleDelete}
				className='absolute top-0 -right-10 p-0 text-[#7A2235] outline-[#7A2235] hover:opacity-50 focus-visible:p-0'>
				<Icon
					IconName='XIcon'
					className='size-5'
					solid
				/>
			</Button>
		</div>
	)
}
