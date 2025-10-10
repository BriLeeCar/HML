'use client'

import { QuillWrapper } from '@admin/_components/editorWrapper'
import {
	AuthorField,
	BlogBtns,
	ImageField,
	Section,
	SlugField,
	SubtitleField,
	TagFormEl,
	TitleField,
	WrittenOnField,
} from '@admin/blog/_fields'
import { dataReducer, type BlogPst, type Key } from '@admin/blog/lib'
import type { Tag } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useReducer, type MouseEvent } from 'react'
import { useToast } from '~/components/Admin/Toast'
import { Fieldset } from '~/components/index'
import { api, type RouterInputs } from '~/trpc/react'

export const BlogForm = ({
	data,
	allTags,
}: {
	data: BlogPst
	allTags?: Tag[]
}) => {
	const [postData, dispatch] = useReducer(dataReducer, data, () => ({
		...data,
		tags: data && 'tags' in data ? data.tags?.map((t) => t) : [],
		status: data?.status ?? 'DRAFT',
	}))

	const router = useRouter()
	const toast = useToast()

	const createPost = api.blogPost.create.useMutation({
		onSuccess: async (post) => {
			if (post.image?.action == 'upload') {
				const formData = new FormData()
				formData.append('image', postData.image as unknown as Blob)
				formData.append(
					'key',
					`${post.data.imageKey}.${post.data.imageExt}`
				)
				const req = await fetch('/api/s3', {
					method: 'POST',
					body: formData,
				})
				const res = await req.json()
				if (res.success) {
					toast.fireToast({
						title: 'Post created',
						status: 'success',
						body: 'Your post has been successfully created.',
					})
					setTimeout(() => {
						router.push('/admin/blog/edit?id=' + post.data.id)
					})
				} else {
					toast.fireToast({
						title: 'Post created but image upload failed',
						status: 'warning',
						body: 'Your post has been created but there was an error uploading your image.',
					})
					setTimeout(() => {
						router.push('/admin/blog/edit?id=' + post.data.id)
					})
				}
			}
		},
	})

	const editPost = api.blogPost.edit.useMutation({
		onSuccess: async (post) => {
			toast.fireToast({
				title: 'Post updated',
				status: 'success',
				body: 'Your post has been successfully updated.',
			})
			if (post.image?.action == 'upload') {
				const formData = new FormData()
				formData.append('image', postData.image as unknown as Blob)
				formData.append(
					'key',
					`${post.newData.imageKey}.${post.newData.imageExt}`
				)
				const req = await fetch('/api/s3', {
					method: 'POST',
					body: formData,
				})
				if (req.ok) {
					toast.fireToast({
						title: 'Image uploaded',
						status: 'success',
						body: 'Your image has been successfully uploaded.',
					})
				} else {
					toast.fireToast({
						title: 'Image upload failed',
						status: 'error',
						body: 'There was an error uploading your image.',
						displayTime: 5000,
					})
				}
			}

			if (post.image?.action == 'delete') {
				const req = await fetch(
					`/api/s3?key=${data.imageKey}.${data.imageExt}`,
					{
						method: 'DELETE',
					}
				)

				const res = await req.json()

				if (res.success) {
					toast.fireToast({
						title: 'Image deleted',
						status: 'success',
						body: 'Your image has been successfully deleted.',
					})
				} else {
					toast.fireToast({
						title: 'Image deletion failed',
						status: 'error',
						body: 'There was an error deleting your image.',
						displayTime: 5000,
					})
					console.warn('Error deleting image: ', res)
				}
			}
		},
		onError: (e) => {
			toast.fireToast({
				title: 'Error',
				status: 'error',
				body: e.message,
				displayTime: 5000,
			})
		},
	})

	const deletePost = () =>
		api.blogPost.delete.useMutation({
			onSuccess: () => {
				router.push('/admin/blog')
			},
		})

	const handleSubmit = async (e: MouseEvent) => {
		const target = e.currentTarget as HTMLButtonElement
		const actionType = target.name

		const updatedData: Partial<
			RouterInputs['blogPost']['edit']['newData']
		> = {}

		Object.keys(postData).forEach((k) => {
			const key = k as Key<'add' | 'edit'>

			if (key == 'tags') {
				const selectedTags = Array.from(
					document.querySelector('#selected-tags')?.children ?? []
				).map((tagEl) => parseInt(tagEl.id))

				const currentTags = postData.tags.map((t) => t.id)

				updatedData['tags'] = {
					newTags: selectedTags.filter(
						(st) => !currentTags.some((ct) => ct == st)
					),
					removedTags: postData.tags
						.filter((t) => !selectedTags.includes(t.id))
						.map((t) => t.id),
				}
			} else if (key == 'author') {
				if (postData.author != data.author) {
					if (typeof postData.author == 'string') {
						if (postData.author != data.authorId) {
							updatedData['author'] = postData.author
						}
					} else {
						if (postData.author.id != data.authorId) {
							updatedData['author'] = postData.author.id
						}
					}
				}
			} else if (key == 'image') {
				if (
					(
						target.form?.elements.namedItem(
							'image'
						) as HTMLInputElement
					).files?.[0]
				) {
					updatedData.image = true

					const rawData = (
						postData.image as unknown as File
					).name.split('.')

					updatedData.imageKey = postData.imageKey ?? rawData[0]
					updatedData.imageExt = postData.imageExt ?? rawData[1]
				} else if (postData.image == false && data.image == true) {
					updatedData.image = false
					updatedData.imageKey = null
					updatedData.imageExt = null
				}
			} else if (postData[key] != data[key]) {
				Object.assign(updatedData, { [key]: postData[key] })
			}
		})

		if (target.name == 'DELETE') {
			deletePost().mutate(postData.id as number)
			return
		} else {
			updatedData['status'] = actionType as
				| 'PUBLISHED'
				| 'DRAFT'
				| 'ARCHIVED'
			updatedData['id'] = postData.id

			if (data.type == 'edit') {
				// @ts-expect-error typing this is wildly difficult and not worth the effort right now
				editPost.mutate({ previousData: data, newData: updatedData })
			} else {
				const addedData: RouterInputs['blogPost']['create'] = {
					...updatedData,
					author: data.authorId as string,
					name: postData.name as string,
					slug: postData.slug as string,
					tags: Array.from(
						document.querySelector('#selected-tags')?.children ?? []
					).map((t) => parseInt(t.id)),
				}

				console.log({ addedData })
				createPost.mutate(addedData)
			}
		}
	}

	return (
		<>
			<form
				autoComplete='off'
				className='mx-auto my-6 mb-12 flex max-w-6xl flex-col gap-4 p-4'
				encType='multipart/form-data'>
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
						<BlogBtns
							handle={handleSubmit}
							formStatus={[
								editPost.isPending,
								createPost.isPending,
								deletePost().isPending,
							]}
						/>

						<Section
							sectionTitle='Post Basics'
							sectionDescription='These are the basic settings for your post. You can always change them later.'
							className='w-full'>
							<div className='space-y-8 p-2'>
								<Fieldset legend='Meta'>
									<SubtitleField
										subtitle={postData.subtitle}
										dispatchDataAction={dispatch}
									/>

									<SlugField
										slug={postData.slug}
										dispatchDataAction={dispatch}
									/>
								</Fieldset>
								<Fieldset legend='Details'>
									<AuthorField
										author={postData.author}
										dispatchDataAction={dispatch}
									/>
									<WrittenOnField />
									<ImageField
										dataImage={postData.image ?? false}
										postId={postData.id}
										imageExt={postData.imageExt}
										imageKey={postData.imageKey}
										image={postData.image ? true : false}
										dispatchDataAction={dispatch}
									/>
								</Fieldset>
								<TagFormEl
									tags={postData.tags}
									allTags={allTags}
								/>
							</div>
						</Section>
					</div>
				</div>
			</form>
			<toast.El />
		</>
	)
}
