import { Checkbox, CheckboxField, Description, Label } from '@/admin/_components/catalyst'
import { useState, type MouseEvent } from 'react'
import { Icon } from '~/components/Icon'
import { cn } from '~/lib/cn'
import type { PathwayTypeRecursive } from '~/server/api/routers'
import { Group, type Categories } from './Categories'

export const CategoryCheckboxes = ({
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
				id={cb.name.split(' ').join('-').toLowerCase()}
				name={cb.name.split(' ').join('-').toLowerCase()}
				{...props}
				onChange={handle}
				color={'brand'}
			/>
			<Label
				htmlFor={cb.name.split(' ').join('-').toLowerCase()}
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
				<CheckboxInnerGrp
					open={cbStatus.open}
					checked={cbStatus.checked}
					kids={cb.children}
					handleCheck={handleCheck}
				/>
			)}
		</CheckboxField>
	)
}
const CheckboxInnerGrp = ({
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
