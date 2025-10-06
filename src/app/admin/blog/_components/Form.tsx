'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { QuillWrapper } from '~/app/admin/_components/editorWrapper'
import { api } from '~/trpc/react'
import {
	AuthorField,
	BlogBtns,
	ImageField,
	Section,
	SlugField,
	SubSectionWrapper,
	SubtitleField,
	TagFormEl,
	TitleField,
	WrittenOnField,
} from '.'

export const BlogForm = ({
	data,
}: {
	data: {
		id?: number | string
		title: string
		subtitle: string
		slug: string
		author: {
			id: number | string
			firstName: string
			lastName: string
			fullName: string
		}
		image?: File | boolean
		text: string | null
		content: string | null
		tags?: { id: number; name: string }[]
		type: 'edit' | 'create' | string
	}
}) => {
	const [title, setTitle] = useState(data?.title ?? '')
	const [subtitle, setSubtitle] = useState(data?.subtitle ?? '')
	const [author, setAuthor] = useState({
		id: data?.author.id,
		firstName: data?.author.firstName,
		lastName: data?.author.lastName,
		fullName: data?.author.fullName,
	})
	const [image, setImage] = useState(data?.image)
	const [slug, setSlug] = useState(data?.slug)
	const [content, setContent] = useState({
		text: data?.text ?? '',
		content: data?.content ?? '',
	})

	const router = useRouter()

	const createPost = api.blogPost.create.useMutation({
		onSuccess: () => {
			router.push('/admin')
		},
	})

	const editPost = api.blogPost.edit.useMutation({
		onSuccess: () => {
			router.push('/admin')
		},
	})

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				const formData = {
					title,
					subtitle,
					slug,
					author:
						typeof author === 'string' ? author : (
							author.id.toString()
						),
					content: content.content,
					text: content.text,
					image: true, // @todo handle image upload
					tags: Array.from(
						e.currentTarget.querySelector('#selected-tags')?.children
							?? []
					).map((tagEl) => Number(tagEl.id)),
				}

				if (data?.type == 'edit') {
					editPost.mutate(formData)
				} else {
					createPost.mutate(formData)
				}
			}}
			className='mx-auto my-6 flex max-w-6xl flex-col gap-4 p-4'>
			<div className='flex flex-col-reverse gap-12 lg:flex-row'>
				<Section
					sectionTitle='Post Content'
					sectionDescription='This is where you will write the content of your post.'
					className='mr-4 w-full grow'>
					<TitleField
						title={title}
						setTitle={setTitle}
						setSlug={setSlug}
					/>
					<QuillWrapper
						wrapperProps={{ className: 'h-[70vh]' }}
						contentProps={{
							setValue: setContent,
							value: { text: content.text, content: content.content },
						}}
					/>
				</Section>
				<div className='mr-4 sm:w-full lg:max-w-sm'>
					<BlogBtns />

					<Section
						sectionTitle='Post Basics'
						sectionDescription='These are the basic settings for your post. You can always change them later.'
						className='w-full'>
						<div className='space-y-8 p-2'>
							<SubSectionWrapper>
								<SubtitleField
									subtitle={subtitle}
									setSubtitle={setSubtitle}
								/>

								<ImageField
									image={image}
									setImage={setImage}
								/>

								<SlugField
									slug={slug}
									setSlug={setSlug}
								/>
							</SubSectionWrapper>
							<SubSectionWrapper>
								<AuthorField
									author={author.fullName ?? ''}
									// @ts-expect-error mismatched types
									setAuthor={setAuthor}
								/>
								<WrittenOnField />
							</SubSectionWrapper>
							<SubSectionWrapper className='space-y-0'>
								<TagFormEl tags={data?.tags} />
							</SubSectionWrapper>
						</div>
					</Section>
				</div>
			</div>
		</form>
	)
}
