'use client'

import { QuillWrapper } from '@admin/_components/editorWrapper'
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
} from '@admin/blog/_fields'
import { BlogData, dataReducer } from '@admin/blog/lib'
import { useRouter } from 'next/navigation'
import { useReducer } from 'react'
import { api } from '~/trpc/react'

export const BlogForm = ({ data }: { data: BlogData }) => {
	const [postData, dispatch] = useReducer(dataReducer, data, () => ({
		...data,
		tags: 'tags' in data ? data.tags?.map((t) => t) : [],
		author: data?.author ?? {
			id: '',
			name: null,
			firstName: '',
			lastName: '',
		},
	}))

	const router = useRouter()

	const createPost = api.blogPost.create.useMutation({
		onSuccess: () => {
			router.push('/admin/blog')
		},
	})

	const editPost = api.blogPost.edit.useMutation({
		onSuccess: () => {
			router.push(`/admin/blog/edit?id=${postData.id}`)
		},
	})

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				const formData = {
					name: postData.name,
					subtitle: postData.subtitle,
					slug: postData.slug,
					author:
						typeof postData.author === 'string' ?
							postData.author
						:	(postData.author?.id?.toString() ?? ''),
					contentHTML: postData.contentHTML,
					contentText: postData.contentText,
					image: true, // @todo handle image upload
					tags: Array.from(
						e.currentTarget.querySelector('#selected-tags')?.children
							?? []
					).map((tagEl) => Number(tagEl.id)),
				}

				console.log('formData', formData)

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
						title={postData.name}
						dispatchDataAction={dispatch}
					/>
					<QuillWrapper
						wrapperProps={{ className: 'h-[70vh]' }}
						contentProps={{
							dispatchDataAction: dispatch,
							value: {
								contentText: postData.contentText,
								contentHTML: postData.contentHTML,
							},
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
									subtitle={postData.subtitle}
									dispatchDataAction={dispatch}
								/>

								<ImageField
									image={postData.image}
									dispatchDataAction={dispatch}
								/>

								<SlugField
									slug={postData.slug}
									dispatchDataAction={dispatch}
								/>
							</SubSectionWrapper>
							<SubSectionWrapper>
								<AuthorField
									author={postData.author}
									dispatchDataAction={dispatch}
								/>
								<WrittenOnField />
							</SubSectionWrapper>
							<SubSectionWrapper className='space-y-0'>
								<TagFormEl tags={postData?.tags} />
							</SubSectionWrapper>
						</div>
					</Section>
				</div>
			</div>
		</form>
	)
}
