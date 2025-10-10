'use client'
import Image from 'next/image'
import { useRef, type ActionDispatch } from 'react'
import { Button, FormField, Input, Label } from '~/components'
import type { RouterOutput } from '~/server/api/zod'
import type { ReducerSetField } from '../lib'

export const ImageField = ({
	dataImage,
	image,
	imageKey,
	imageExt,
	postId,
	dispatchDataAction,
}: {
	dataImage?: boolean
	image?: RouterOutput<'blogPost', 'getById'>['image']
	imageKey?: string | null
	imageExt?: string | null
	postId?: number
	dispatchDataAction: ActionDispatch<
		[action: ReducerSetField<'image' | 'imageKey' | 'imageExt'>]
	>
}) => {
	const ref = useRef<HTMLInputElement>(null)
	const createPreviewImage = () => {
		if (ref.current?.files?.[0]) {
			return URL.createObjectURL(
				ref.current?.files?.[0] as unknown as Blob
			)
		} else if (dataImage == true && imageKey && imageExt) {
			return `https://pub-87438faadb01418487f9087b516e33b8.r2.dev/${imageKey}.${imageExt}`
		}
		return null
	}

	console.log({ dataImage, image, imageKey, imageExt, postId })

	return (
		<FormField asCol>
			<Label htmlFor='image'>Image</Label>
			{image && (
				<div className='flex h-auto w-full flex-col gap-4'>
					<span className='relative aspect-[3/2] h-auto w-full *:rounded-lg *:object-cover'>
						{(ref.current?.files?.[0]
							|| (dataImage == true && imageKey && imageExt)) && (
							<Image
								src={createPreviewImage() ?? ''}
								alt='Hero Image'
								fill
							/>
						)}
					</span>
					<Button
						size='sm'
						variant='muted'
						onClick={() => {
							if (ref.current) ref.current.value = ''
							dispatchDataAction({
								type: 'SET_FIELD',
								payload: [
									{
										fieldKey: 'image',
										fieldValue: false,
									},
								],
							})
						}}>
						Remove
					</Button>
				</div>
			)}
			<Input
				ref={ref}
				accept='image/*'
				type='file'
				name='image'
				defaultValue={(image as unknown as File)?.name ?? undefined}
				onChange={(e) => {
					const file = e.currentTarget.files?.[0]
					file
						&& dispatchDataAction({
							type: 'SET_FIELD',
							payload: [
								{
									fieldKey: 'image',
									// @ts-expect-error File type
									fieldValue: e.currentTarget.files?.[0] ?? null,
								},
								{
									fieldKey: 'imageKey',
									fieldValue:
										e.currentTarget.value
											.split('\\')
											.pop()
											?.split('.')[0]
										?? postId?.toString()
										?? '',
								},
								{
									fieldKey: 'imageExt',
									fieldValue:
										e.currentTarget.value.split('.').pop() ?? '',
								},
							],
						})
				}}
				className={image ? 'hidden' : ''}
			/>
		</FormField>
	)
}
