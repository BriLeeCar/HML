'use client'
import type { Dispatch, SetStateAction } from 'react'
import { Field, Label } from '../../_components/fieldset'
import { Input } from '../../_components/input'

export const ImageField = ({
	image,
	setImage,
}: {
	image?: File | boolean | null
	setImage?: Dispatch<SetStateAction<File | boolean | undefined>>
}) => {
	if (image || !image) {
	}
	return (
		<Field className='flex items-baseline gap-4 lg:block'>
			<Label>Image</Label>
			<Input
				accept='image/*'
				type='file'
				defaultValue={''}
				onChange={(e) =>
					// @ts-expect-error FileList is not null here
					setImage && setImage(e.currentTarget.files?.[0] ?? null)
				}
			/>
		</Field>
	)
}
