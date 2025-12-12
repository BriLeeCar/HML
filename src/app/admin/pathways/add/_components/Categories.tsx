import { FormSection } from '@/admin/_components'
import {
	Checkbox,
	CheckboxField,
	CheckboxGroup,
	Description,
	Label,
} from '@/admin/_components/catalyst/'
import { useState, type MouseEvent } from 'react'
import { Icon } from '~/components/Icon'
import { cn } from '~/lib/cn'
import type { PathwayTypeRecursive } from '~/server/api/routers'
import { type ElPrismaProps } from '..'

type Categories = PathwayTypeRecursive & { parentId?: string | null }
// type CategoryKeys = Categories['name']

export const CategorySection = ({
	data,
	handlePrisma,
	pathwayTypes,
}: ElPrismaProps & {
	pathwayTypes: Categories[]
}) => {
	const handleCheck = (id: number, status: boolean) => {
		const newData = { ...data }
		if (data.query.categories == undefined) {
			newData.query.categories = []
		}
		const newCategories = [...data.query.categories]
			.map(p => {
				if (p.id == id) {
					return status ? p : false
				}
				return p
			})
			.filter(x => x != false)
		const thisCategory = pathwayTypes.find(c => c.id == id) as {
			name: string
			id: number
			description: string | null
			parentId: string | null
		}
		// @ts-expect-error IDK what is happening here
		thisCategory && status && newCategories.push(thisCategory)

		newData.query.categories = [...newCategories]
		console.log(newData)
		handlePrisma(newData)
	}

	if (data.query.categories?.length > 0) {
		console.log(
			'Selected Categories:',
			data.query.categories.map(c => c)
		)
	}

	return (
		<FormSection
			title='Categories'
			aria-label='Pathway Categories'
			description={
				"To best classify this pathway, please fill out the category information below. We use this to help users filter and find relevant pathways, as well as suggest similar pathways they might be interested in but haven't discovered yet."
			}>
			{/* ? BASE CATEGORIES */}
			<Group
				handleCheck={handleCheck}
				checkBoxes={pathwayTypes.sort((a, b) =>
					a.name == 'Other' ? 1
					: b.name == 'Other' ? -1
					: a.name.localeCompare(b.name)
				)}
			/>
			{/* <FormSubSection
				className='*:grid-cols-1 *:pl-0'
				legend={'Base Categories'}
				description={'Select the base categories that best describe this pathway.'}>
			</FormSubSection> */}
		</FormSection>
	)
}

const Group = ({
	checkBoxes,
	handleCheck,
}: {
	handleCheck: (id: number, status: boolean) => void
	checkBoxes: Categories[]
}) => {
	return (
		<CheckboxGroup
			className={cn('col-span-2 row-start-3! grid w-full grid-cols-3 justify-between pl-10')}>
			{checkBoxes
				.sort((a, b) => {
					const childCompare = a.children.length - b.children.length
					if (childCompare !== 0) return childCompare
					return a.name.localeCompare(b.name)
				})
				.map(child => (
					<CB
						onChange={e => {
							console.log(e)
							handleCheck(child.id, e)
						}}
						handleCheck={handleCheck}
						key={child.id}
						cb={child}
					/>
				))}
		</CheckboxGroup>
	)
}

const CB = ({
	cb,
	handleCheck,
	...props
}: Props<typeof Checkbox> & {
	handleCheck: (id: number, status: boolean) => void
	cb: Categories
}) => {
	const [cbStatus, setCbStatus] = useState({
		checked: false,
		open: true,
	})

	const handle = (status: boolean) => {
		setCbStatus({
			...cbStatus,
			checked: !cbStatus.checked,
		})
		handleCheck(cb.id, status)
	}

	const handleToggle = (e: MouseEvent) => {
		if (cb.children.length > 0 && cbStatus.checked == true) {
			e.preventDefault()
			cbStatus.checked == true
				&& setCbStatus({
					...cbStatus,
					open: !cbStatus.open,
				})
		} else {
			setCbStatus({
				...cbStatus,
				checked: !cbStatus.checked,
			})

			handleCheck(cb.id, cbStatus.checked)
		}
	}

	return (
		<CheckboxField className='mb-6 gap-y-0 has-data-checked:has-[div]:col-span-full'>
			<Checkbox
				{...props}
				onChange={e => {
					console.log(e)
					handle(e)
				}}
				color={'brand'}
				name={cb.name}
			/>
			<Label
				className={cbStatus.checked ? 'text-interactive flex basis-full font-bold!' : ''}
				onClick={handleToggle}>
				{cb.name.trim()}
				{cbStatus.checked && cb.children.length > 0 && (
					<span className='w-full'>
						<Icon
							IconName='ChevronDownIcon'
							className={cn(!cbStatus.open ? '-rotate-90' : '', 'transition-all')}
						/>
					</span>
				)}
			</Label>
			<Description className='text-sm'>{cb.description}</Description>
			{cbStatus.checked && cb.children.length > 0 && (
				<CBKids
					open={cbStatus.open}
					checked={cbStatus.checked}
					kids={cb.children}
					handleCheck={handleCheck}
				/>
			)}
		</CheckboxField>
	)
}

const CBKids = ({
	handleCheck,
	kids,
	open,
	checked,
}: {
	handleCheck: (id: number, status: boolean) => void
	kids: PathwayTypeRecursive[]
	open: boolean
	checked: boolean
}) => {
	const hasKids = kids.length > 0
	if (checked && hasKids) {
		return open ?
				<Group
					handleCheck={handleCheck}
					checkBoxes={kids}
				/>
			:	<div />
	}
	return <></>
}
