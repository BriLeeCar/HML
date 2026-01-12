'use client'

import { Bold, SubSectionDetails } from '@/admin/_components'
import {
	FormSection,
	FormSectionDetails,
	FormSectionLegend,
} from '@/admin/_components/_form/clientFieldset'
import { SubSectionFieldset } from '@/admin/_components/_form/FormSubSection'
import {
	Checkbox,
	CheckboxField,
	CheckboxGroup,
	Field,
	Label,
	Textarea,
} from '@/admin/_components/catalyst'
import { Fragment, useState } from 'react'
import { ThisSubSectionLegend } from './Designer/Practical'

type Tool = {
	label: string
	name: string
}

type Strength = Tool & { type: string }

const ToolsUsed = ({ tools }: { tools: Tool[] }) => {
	return (
		<SubSectionFieldset>
			<ThisSubSectionLegend>
				Tools Used<div className='text-red-500'>*</div>
			</ThisSubSectionLegend>
			<SubSectionDetails className='pl-4'>
				<CheckboxGroup>
					{tools.map(({ label, name }) => (
						<CheckboxField key={name}>
							<Label>{label}</Label>
							<Checkbox name={`tools_${name}`} />
						</CheckboxField>
					))}
				</CheckboxGroup>
			</SubSectionDetails>
		</SubSectionFieldset>
	)
}

const Strengths = ({
	groupedKey,
	arr,
}: {
	groupedKey: keyof (typeof arr)[number]
	arr: { label: string; name: string; type: string }[]
}) => {
	const [checkedOther, setCheckedOther] = useState(false)

	const grouped = Object.groupBy(arr, item => item[groupedKey] ?? 'Other')

	return (
		<SubSectionFieldset>
			<ThisSubSectionLegend>
				What are your strengths? <div className='text-red-500'>*</div>
			</ThisSubSectionLegend>
			<SubSectionDetails className='pl-4'>
				<CheckboxGroup>
					{Object.keys(grouped).map(type => (
						<Fragment key={type}>
							<Bold className='mb-1 block not-first:mt-6'>{type}</Bold>
							{grouped[type]?.map(({ label, name }) => (
								<CheckboxField
									key={name}
									className='pl-4'>
									<Label>{label}</Label>
									<Checkbox
										onChange={e => {
											if (name == 'other_strengths') {
												setCheckedOther(e)
											}
										}}
										name={`strength_${name}`}
									/>
								</CheckboxField>
							))}
						</Fragment>
					))}
				</CheckboxGroup>
				{checkedOther && (
					<Field className='pl-4'>
						<Label required>
							What do you consider your strengths or 'areas of expertise'? (Please Specify)
						</Label>
						<Textarea name='other_strengths_notes' />
					</Field>
				)}
			</SubSectionDetails>
		</SubSectionFieldset>
	)
}

export const Cohesion = ({
	tools,
	strengths,
	description,
	children,
}: Props & {
	description: ReactNode
	tools: Tool[]
	strengths: Strength[]
}) => {
	return (
		<FormSection>
			<FormSectionLegend
				description={
					<>
						<span className='mb-4 block'>{description}</span>
					</>
				}>
				Cohesion Check
			</FormSectionLegend>
			<FormSectionDetails className='grid-cols-1 gap-x-8'>
				<ToolsUsed tools={tools} />
				<Strengths
					groupedKey='type'
					arr={strengths}
				/>

				{children}
			</FormSectionDetails>
		</FormSection>
	)
}
