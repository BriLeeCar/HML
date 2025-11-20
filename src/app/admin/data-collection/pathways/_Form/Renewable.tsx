'use client'
import {
	Button,
	Checkbox,
	CheckboxField,
	CheckboxGroup,
	Description,
	Field,
	FieldGroup,
	Label,
	Strong,
	Textarea,
} from '@/data-collection/pathways'
import { FormSubSection, MinMaxTimeFieldGroup } from '@/data-collection/pathways/_Form'
import { AnimatePresence, motion } from 'motion/react'
import { Icon } from '~/components/Icon'

const animateVariants = {
	exit: {
		opacity: 0,
		height: 0,
		overflow: 'hidden',
	},
	animate: {
		opacity: 1,
		height: '100%',
	},
	initial: {
		opacity: 0,
		height: 0,
		overflow: 'hidden',
	},
}

export const Renewable = ({ pathwayData, dispatchAction }: ElProps) => {
	const data = pathwayData.renewable

	return (
		<>
			<span
				data-slot='control'
				className='flex flex-col space-y-6 gap-x-8 md:grid-cols-2 md:flex-row'>
				<CheckboxGroup>
					<CheckboxField>
						<Checkbox
							name='cbRenewable'
							defaultChecked={data.value.renewable}
							onClick={() => {
								dispatchAction({
									type: 'checkRenewable',
									field: 'renewable',
									payload: data.value.renewable ? false : true,
								})
							}}
						/>
						<Label>Pathway is Renewable</Label>
						<Description>
							The visa can be renewed at least once after the initial duration expires for any
							reason.
						</Description>
					</CheckboxField>
				</CheckboxGroup>
				<RewnewalDurationCB
					data={data}
					dispatchAction={dispatchAction}
				/>
			</span>
			<AnimatePresence>
				{data.value.renewable && !data.value.sameAsInitialDuration && (
					<motion.span
						exit={{
							marginTop: 0,
							...animateVariants.exit,
						}}
						animate={{
							marginTop: '0.5rem',
							...animateVariants.animate,
						}}
						initial={{
							marginTop: 0,
							...animateVariants.initial,
						}}
						key='renewalDurationSection'>
						<FormSubSection
							aria-label='Renewal Duration'
							legend='Renewal Duration'
							description='Please provide the duration details for the renewal of this pathway. If the renewal duration is the same as the initial duration, you can indicate that using the checkbox above.'>
							<FieldGroup className='grid'>
								<AnimatePresence>
									{data.value.sameAsInitialDuration == false && (
										<motion.span
											{...animateVariants}
											key='renewalDurationNumbers'>
											<MinMaxTimeFieldGroup
												pathwayData={pathwayData}
												dispatchAction={dispatchAction}
												field='renewable'
												className='grid gap-x-4 md:grid-cols-3'
											/>
										</motion.span>
									)}
								</AnimatePresence>
							</FieldGroup>
						</FormSubSection>
					</motion.span>
				)}
				{data.value.renewable && (
					<motion.span
						{...animateVariants}
						key='renewalNotes'>
						<RenewalNotes
							pathwayData={pathwayData}
							dispatchAction={dispatchAction}
						/>
					</motion.span>
				)}
			</AnimatePresence>
		</>
	)
}

const RewnewalDurationCB = ({
	data,
	dispatchAction,
}: {
	dispatchAction: ElProps['dispatchAction']
	data: ElProps['pathwayData']['renewable']
}) => {
	return (
		<AnimatePresence>
			{data.value.renewable && (
				<motion.span
					key='renewalDurationCB'
					exit={{
						...animateVariants.exit,
						translateX: '100%',
						flexBasis: '0%',
						position: 'absolute',
					}}
					animate={{
						...animateVariants.animate,
						translateX: '0%',
						flexBasis: '50%',

						position: 'relative',
					}}
					initial={{
						...animateVariants.initial,
						translateX: '100%',
						flexBasis: '0%',
						position: 'absolute',
					}}>
					<CheckboxGroup>
						<CheckboxField>
							<Checkbox
								name='cbRenewableSameAsInitialDuration'
								defaultChecked={data.value.sameAsInitialDuration}
								onClick={() => {
									dispatchAction({
										type: 'checkRenewableSameAsInitialDuration',
										field: 'renewable',
										payload: data.value.sameAsInitialDuration ? false : true,
									})
								}}
							/>
							<Label>Renewal Duration Identical</Label>
							<Description>
								The initial duration of the visa matches the renewal duration.
							</Description>
						</CheckboxField>
					</CheckboxGroup>
				</motion.span>
			)}
		</AnimatePresence>
	)
}

const RenewalNotes = ({ pathwayData, dispatchAction }: ElProps) => {
	const addNote = () => {
		const newData = { ...pathwayData.renewable }
		newData.value.notes.push({
			value: '',
			error: [],
			counter: pathwayData.renewable.counter + 1,
		})
		newData.counter += 1

		dispatchAction({
			field: 'renewable',
			type: 'setRenewable',
			payload: newData,
		})
	}
	return (
		<FormSubSection
			aria-label='Renewal Notes'
			legend='Notes'
			description={
				<>
					Any additional information regarding the renewal of the pathway can be added here, and if
					it makes more sense to you, feel free to add multiple notes using the <Strong>+</Strong>{' '}
					button.
				</>
			}>
			<FieldGroup className='grid gap-y-4'>
				{pathwayData.renewable.value.notes.map(note => {
					return (
						<Field
							key={note.counter}
							className='flex items-center gap-x-2'>
							<Textarea
								defaultValue={note.value ?? undefined}
								name={`renewableNote${note.counter}`}
								onBlur={e => {
									const data = { ...pathwayData.renewable }
									const thisNote = data.value.notes.find(n => n.counter == note.counter)
									thisNote && (thisNote.value = e.currentTarget.value)
									dispatchAction({
										field: 'renewable',
										type: 'setRenewable',
										payload: data,
									})
								}}
							/>
							<Button
								type='button'
								iconOnly
								className='rounded-full px-2 py-0'
								onClick={() =>
									dispatchAction({
										type: 'deleteRenewableNote',
										field: 'renewable',
										payload: note.counter,
									})
								}>
								<Icon
									IconName='XIcon'
									className='h-auto w-full text-red-600 hover:text-red-800'
									data-slot='icon'
									solid
								/>
							</Button>
						</Field>
					)
				})}
			</FieldGroup>
			<Button
				type='button'
				size='sm'
				innerButton
				onClick={addNote}>
				<Icon
					IconName='PlusCircleIcon'
					className='h-4 w-4 text-current/75'
					data-slot='icon'
					solid
				/>
				Add Note
			</Button>
		</FormSubSection>
	)
}
