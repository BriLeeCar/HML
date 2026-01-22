import { Checkbox, CheckboxField, Description, Label } from '@/admin/_components/catalyst'
import { useState, type MouseEvent } from 'react'
import { Icon } from '~/components/Icon'
import { cn } from '~/lib/cn'
import type { PathwayTypeRecursive } from '~/server/api/routers'
import { Group, type Categories } from '.'

export const CategoryCheckboxes = ({
	cb,
	handleCheck,
	readOnly,
	data,
	...props
}: Props<typeof Checkbox> & {
	handleCheck: (id: number, status: boolean) => void
	cb: Categories
	readOnly?: boolean
	data: Query
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
		<CheckboxField className='my-0 h-max gap-y-1 has-data-checked:has-[div]:col-span-full'>
			<Checkbox
				disabled={readOnly ? true : false}
				className='h-max'
				id={cb.name.split(' ').join('-').toLowerCase()}
				name={cb.name.split(' ').join('-').toLowerCase()}
				{...props}
				onChange={handle}
				color={'brand'}
				defaultChecked={props.defaultChecked}
			/>
			<Label
				htmlFor={cb.name.split(' ').join('-').toLowerCase()}
				className={cbStatus.checked ? 'text-interactive flex h-max basis-full font-bold!' : ''}
				onClick={handleToggle}>
				{cb.name.trim()}
				{cbStatus.checked && cb.children.length > 0 && (
					<Icon
						IconName='ChevronDownIcon'
						className={cn(!cbStatus.open ? '-rotate-90' : '', 'transition-all')}
					/>
				)}
			</Label>
			<Description className='text-sm'>{cb.description}</Description>
			{cbStatus.checked && cb.children.length > 0 && (
				<CheckboxInnerGrp
					open={cbStatus.open}
					checked={cbStatus.checked}
					kids={cb.children}
					handleCheck={handleCheck}
					data={data}
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
	data,
}: {
	handleCheck: (id: number, status: boolean) => void
	kids: PathwayTypeRecursive[]
	open: boolean
	checked: boolean
	data: Query
}) => {
	const hasKids = kids.length > 0
	if (checked && hasKids) {
		return open ?
				<Group
					className='gap-y-1'
					handleCheck={handleCheck}
					checkBoxes={kids}
					data={data}
				/>
			:	<div />
	}
	return <></>
}
