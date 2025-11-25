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
	return (
		<>
			<span
				data-slot='control'
				className='flex flex-col space-y-6 gap-x-8 md:grid-cols-2 md:flex-row'>
				<CheckboxGroup>
					<CheckboxField>
						<Checkbox
							color='brand'
							defaultChecked={pathwayData.isRenewable.value}
							onClick={() => {
								dispatchAction({
									field: 'isRenewable',
									payload: pathwayData.isRenewable.value ? false : true,
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
					pathwayData={pathwayData}
					dispatchAction={dispatchAction}
				/>
			</span>
			<AnimatePresence>
				{pathwayData.isRenewable.value && !pathwayData.renewableSameAsInitial.value && (
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
									{pathwayData.renewableSameAsInitial.value == false && (
										<motion.span
											{...animateVariants}
											key='renewalDurationNumbers'>
											<MinMaxTimeFieldGroup
												pathwayData={pathwayData}
												dispatchAction={dispatchAction}
												field='renewableDuration'
												className='grid gap-x-4 md:grid-cols-3'
											/>
										</motion.span>
									)}
								</AnimatePresence>
							</FieldGroup>
						</FormSubSection>
					</motion.span>
				)}
				{pathwayData.isRenewable.value && (
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

const RewnewalDurationCB = ({ pathwayData, dispatchAction }: ElProps) => {
	return (
		<AnimatePresence>
			{pathwayData.isRenewable.value && (
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
						flexBasis: '100%',

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
								color='brand'
								name='cbRenewableSameAsInitialDuration'
								defaultChecked={pathwayData.renewableSameAsInitial.value}
								onClick={() => {
									dispatchAction({
										field: 'renewableSameAsInitial',
										payload: pathwayData.renewableSameAsInitial.value ? false : true,
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
		dispatchAction({
			type: 'add',
			field: 'renewableNotes',
			payload: null,
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
				{pathwayData.renewableNotes.value.map(note => {
					return (
						<Field
							key={note.counter}
							className='flex items-center gap-x-2'>
							<Textarea
								defaultValue={note.note ?? undefined}
								name={`renewableNote${note.counter}`}
								onBlur={e => {
									dispatchAction({
										type: 'update',
										field: 'renewableNotes',
										payload: {
											counter: note.counter,
											value: {
												...note,
												note: e.currentTarget.value,
											},
										},
									})
								}}
							/>
							<Button
								type='button'
								iconOnly
								className='rounded-full px-2 py-0'
								onClick={() =>
									dispatchAction({
										type: 'delete',
										field: 'renewableNotes',
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
