import {
	Button,
	CheckBox,
	RemoveButton,
	RemoveButtonWrapper,
	SubSectionFieldset,
} from '@/admin/_components'
import { Field, Textarea } from '@/admin/_components/catalyst'
import { Icon } from '~/components/Icon'
import { type ElPrismaProps, note } from '../../_lib'

export const Limitations = ({ data, handlePrisma }: ElPrismaProps) => {
	return (
		<>
			<CheckBox
				onClick={() => {
					handlePrisma(note(data, 'limitations', 'add'))
				}}
				label='Has Other Limitations'
				description={<>This pathway has other limitations outside of the pathway type</>}
			/>

			{data.query.limitations?.length > 0 && (
				<SubSectionFieldset className='md:pl-8'>
					<SubSectionFieldset.Legend description='Please include each limitation as a separate entry'>
						Limitations
					</SubSectionFieldset.Legend>
					<div className='flex flex-col'>
						{data.query.limitations.map(n => (
							<div
								key={n.counter}
								className='grid grid-cols-[auto_.15fr] *:items-baseline *:last:grid-cols-1'>
								<Field className='col-start-1 mb-1'>
									<Textarea
										name={`limitationDetails${n.counter}`}
										className='mt-1'
										onBlur={e => {
											handlePrisma(
												note(
													data,
													'limitations',
													'update',
													{
														...n,
														note: e.target.value,
													},
													n.counter
												)
											)
										}}
									/>
								</Field>
								<RemoveButtonWrapper>
									<RemoveButton
										onClick={() => handlePrisma(note(data, 'limitations', 'remove', n, n.counter))}
									/>
								</RemoveButtonWrapper>
							</div>
						))}
					</div>
				</SubSectionFieldset>
			)}
			{data.query.limitations?.length > 0 && (
				<Button
					type='button'
					size='sm'
					innerButton
					onClick={() => {
						handlePrisma(note(data, 'limitations', 'add'))
					}}>
					<Icon
						IconName='PlusCircleIcon'
						className='h-4 w-4 text-current/75'
						data-slot='icon'
						solid
					/>
					Add Limitation
				</Button>
			)}
		</>
	)
}
