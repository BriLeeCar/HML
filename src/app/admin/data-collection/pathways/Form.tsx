'use client'

import {
	Dispatch,
	ReactNode,
	Ref,
	SetStateAction,
	useContext,
	useRef,
	useState,
} from 'react'
import { Button } from '~/components/Button'
import { Label as LabelEl } from '~/components/Form'
import { Page, Section } from '~/components/Page'
import { PageHeading, SectionHeading } from '~/components/Text'
import { cn } from '~/lib/cn'
import { DBContext } from '~/server/db/provider'
import { CBNotesGrp } from './cbNotesGrp'
import { CurrencyGrp } from './Currency'
import {
	DurationGrp,
	tDurationKeys,
	validateDuration,
} from './Duration'
import { ListGrp } from './List'
import { tPathwayForm, zCountryCode } from './schema'
import { SimpleInput } from './SimpleInput'
import {
	initFormValues,
	tPathwayKeys,
	tPathwaySimpleKeys,
	validate,
} from './utils'

export const PathwayForm = ({ handle }: { handle: string }) => {
	const db = useContext(DBContext)

	const [pathway, setPathway] = useState<tPathwayForm>({
		...initFormValues,
	})

	const [discordHandle, setDiscordHandle] = useState<string>(handle)

	const updateSimple = (
		schemaKey: tPathwaySimpleKeys,
		val: string | undefined,
		customError?: string
	) => validate(schemaKey, val, setPathway, customError)

	const updateUOMRange = (
		schemaKey: tDurationKeys,
		innerKey: 'min' | 'max' | 'uom',
		val: string | undefined,
		customError?: string
	) => {
		validateDuration(
			schemaKey,
			innerKey,
			val,
			setPathway,
			pathway,
			customError
		)
	}

	return (
		<Page>
			<PageHeading
				eyebrow='Beta'
				subtitle='Please let us know of any issues when filling out the form!'>
				Add Pathway Form
			</PageHeading>
			<Section>
				<SectionHeading eyebrow='For Verification Purposes'>
					Discord Handle
				</SectionHeading>
				<form className='my-2'>
					<label
						className='sr-only'
						htmlFor='discord-handle'></label>
					<input
						id='discord-handle'
						defaultValue={discordHandle}
						type='text'
						placeholder='Your discord handle'
						className={cn(
							classNameBase,
							'bg-foreground/5 max-w-sm rounded-lg'
						)}
						onBlur={(e) => setDiscordHandle(e.target.value)}
					/>
				</form>
			</Section>
			<Section>
				<SectionHeading subtitle="If you have any trouble, please let the staff know so we can either alter to form, or help explain why there's an issue">
					Pathway Details
				</SectionHeading>
				<form className='dark:text-foreground border-border/10 bg-foreground/5 dark:bg-foreground/5 mx-auto mt-6 flex w-full flex-col gap-6 rounded-lg border-1 px-12 py-6 text-zinc-600'>
					<span className='flex w-full gap-6 *:w-min *:grow *:first:w-auto'>
						<CountryId
							countries={db.getCountriesWithPathways()}
							update={updateSimple}
							pathway={pathway}
						/>
						<SimpleInput
							label='Pathway Id'
							defaultValue={[
								pathway.countryId.value,
								pathway.shortName.value,
							]
								.join(' ')
								.replaceAll(' ', '-')
								.toLowerCase()}
							required
							disabled
							handleChange={updateSimple}
							schemaKey='pathwayId'
							pathway={pathway}
							className='cursor-not-allowed'
						/>
					</span>
					<span className='flex gap-6 *:grow'>
						<SimpleInput
							label='Pathway Short Name'
							required
							handleChange={updateSimple}
							schemaKey='shortName'
							pathway={pathway}
						/>
						<SimpleInput
							label='Pathway Official Name'
							required
							handleChange={updateSimple}
							schemaKey='officialName'
							pathway={pathway}
						/>
					</span>
					<span className='flex gap-6 *:grow'>
						<SimpleInput
							label='Link'
							required
							handleChange={updateSimple}
							schemaKey='link'
							pathway={pathway}
						/>
						<SimpleInput
							label='Category'
							required
							handleChange={updateSimple}
							schemaKey='category'
							pathway={pathway}
						/>
					</span>
					<SimpleInput
						label='Description'
						required
						handleChange={updateSimple}
						schemaKey='description'
						pathway={pathway}
					/>
					<span className='flex gap-x-6 *:grow'>
						<DurationGrp
							label='Visa Duration'
							handleChange={updateUOMRange}
							schemaKey='visaDuration'
							wrapperClassName={cn(
								pathway.isRenewable.value == true ?
									'flex-col *:w-full'
								:	''
							)}
							pathway={pathway}>
							<span className='flex basis-full items-center gap-6'>
								<Label label='Can be renewed:' />
								<input
									type='checkbox'
									checked={pathway.isRenewable.value ?? false}
									onChange={(e) =>
										setPathway(
											Object.assign({}, pathway, {
												isRenewable: {
													value: e.target.checked,
													error: null,
												},
											})
										)
									}
								/>
							</span>
						</DurationGrp>
						{pathway.isRenewable.value == true && (
							<DurationGrp
								label='Renewal Duration'
								handleChange={updateUOMRange}
								schemaKey='renewalDuration'
								pathway={pathway}
								wrapperClassName='*:w-full'
							/>
						)}
					</span>
					<DurationGrp
						label='Processing Time'
						handleChange={updateUOMRange}
						schemaKey='processingTime'
						pathway={pathway}
					/>
					<span className='flex gap-x-6 *:grow *:last:flex-col'>
						<CurrencyGrp
							countryCode={pathway.countryId.value ?? ''}
							db={db}
							label={'Application Cost'}
							schemaKey={'applicationCost'}
							pathway={pathway}
							handleChange={() => console.log()}
						/>
						<CurrencyGrp
							countryCode={pathway.countryId.value ?? ''}
							db={db}
							label={'Document Cost'}
							schemaKey={'documentCost'}
							pathway={pathway}
							handleChange={() => console.log()}></CurrencyGrp>
					</span>
					<Fieldset>
						<Legend>General Notes</Legend>
						<ListGrp
							buttonText='Add New Note'
							schemaKey={'notes'}
							pathway={pathway}
							setPathway={setPathway}
							type={'textarea'}
						/>
					</Fieldset>
					<Fieldset>
						<Legend>Pathway Options</Legend>
						<CBNotesGrp
							schemaKey='potentialResidencyPathway'
							pathway={pathway}
							setPathway={setPathway}
							label='Potential to Seek Residency'>
							<ListGrp
								schemaKey='residencyNotes'
								pathway={pathway}
								setPathway={setPathway}
								buttonText={'Add New Note'}
								type={'textarea'}
							/>
						</CBNotesGrp>
						<CBNotesGrp
							schemaKey='potentialCitizenshipPathway'
							pathway={pathway}
							setPathway={setPathway}
							label='Potential to Seek Citizenship'>
							<ListGrp
								schemaKey='citizenshipNotes'
								pathway={pathway}
								setPathway={setPathway}
								buttonText={'Add New Note'}
								type={'textarea'}
							/>
						</CBNotesGrp>
						<CBNotesGrp
							schemaKey='reunificationIsPossible'
							pathway={pathway}
							setPathway={setPathway}
							label='Potential for Family Reunification'>
							<ListGrp
								schemaKey='reunificationNotes'
								pathway={pathway}
								setPathway={setPathway}
								buttonText={'Add New Note'}
								type={'textarea'}
							/>
						</CBNotesGrp>
					</Fieldset>
					<Fieldset>
						<Legend>Required Documents</Legend>
						<ListGrp
							buttonText='Add New Document'
							schemaKey={'requiredDocuments'}
							pathway={pathway}
							setPathway={setPathway}
							type={'input'}
						/>
					</Fieldset>
					<Fieldset>
						<Legend>General Requirements</Legend>
						<ListGrp
							buttonText='Add New Requirement'
							schemaKey={'requirements'}
							pathway={pathway}
							setPathway={setPathway}
							type={'textarea'}
						/>
					</Fieldset>
					<Fieldset>
						<Legend>General Limitations</Legend>
						<ListGrp
							buttonText='Add New Limitation'
							schemaKey={'limitations'}
							pathway={pathway}
							setPathway={setPathway}
							type={'textarea'}
						/>
					</Fieldset>
					<Button
						className='dark:text-foreground text-background mt-8 rounded-xl bg-[#7A2235] py-4 text-base hover:bg-[#552027] focus-visible:outline-offset-4 focus-visible:outline-[#B7576C]'
						type='button'
						variant='ghost'
						onClick={() => {
							console.log(pathway)
						}}>
						Submit Pathway
					</Button>
				</form>
			</Section>
		</Page>
	)
}

const CountryId = ({
	countries,
	update,
	pathway,
}: {
	pathway: tPathwayForm
	countries: (ApiData.CountryBase & ApiData.CountryETCData)[]
	update: (
		schemaKey: tPathwaySimpleKeys,
		val: string | undefined,
		customError?: string
	) => void
}) => {
	return (
		<>
			<SimpleInput
				label='Country ID'
				type='search'
				name='country'
				list='countries-list'
				schemaKey='countryId'
				placeholder='Select Country'
				handleChange={(schemaKey, val) => {
					const notValid = zCountryCode
						.refine((val) => countries.some((c) => c.abbr == val), {
							error: 'Not a valid country code for this dataset',
						})
						.safeParse(val)
					notValid.error ?
						update(
							schemaKey,
							val,
							'Not a valid country code for this dataset'
						)
					:	update(schemaKey, val)
				}}
				required
				pathway={pathway}
				autoComplete='off'
				className='grow'
			/>
			<datalist id='countries-list'>
				{countries
					.sort((a, b) => a.name.localeCompare(b.name))
					.map((country) => (
						<option
							key={country.abbr}
							value={country.abbr}>
							{country.name}
						</option>
					))}
			</datalist>
		</>
	)
}

const classNameBase = cn(
	'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-3',
	'bg-background outline-foreground/20',
	'border-foreground/20 border-1',
	// 'focus-visible:border-foreground/10',
	'rounded-md',
	'px-3 py-1',
	'flex h-9 w-full min-w-0 text-base',
	'disabled:bg-foreground/3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-current/60 disabled:italic md:text-sm',
	'in-[fieldset]:bg-foreground/2',
	'dark:outline-offset-2 dark:outline-[#7A2235] dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0 dark:focus-visible:outline-2'
)

export const InputBase = ({
	label,
	schemaKey,
	error = {
		location: 'above',
		message: null,
	},
	htmlFor,
	ref,
	...props
}: Props<'input'> & {
	label: string
	schemaKey: tPathwayKeys | 'renewalDuration' | 'documentCost'
	error: {
		location: 'above' | 'after'
		message: ReactNode
	}
	htmlFor?: string
	ref?: Ref<HTMLInputElement>
}) => {
	return (
		<span className='flex flex-col gap-2'>
			<span className='flex flex-col gap-1'>
				{label && (
					<Label
						label={label}
						error={error}
						required={props.required}
						htmlFor={htmlFor ?? schemaKey ?? props.name ?? props.id}
					/>
				)}
				<input
					ref={ref}
					{...props}
					name={schemaKey}
					id={htmlFor ?? props.id ?? schemaKey}
					data-slot='input'
					className={cn(
						'placeholder:text-muted-foreground',
						'selection:bg-primary selection:text-primary-foreground',
						'dark:bg-input/30',
						'transition-[color]',
						'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
						classNameBase,
						props.className
					)}
				/>
				{error.message && error.location == 'after' && (
					<ErrorEl>{error.message}</ErrorEl>
				)}
			</span>
		</span>
	)
}
export const Label = ({
	required,
	error = {
		location: 'above',
		message: null,
	},
	label,
	...props
}: Props<'label'> & {
	label: string
	required?: boolean
	error?: {
		location: 'above' | 'after'
		message: ReactNode
	}
}) => {
	return (
		<LabelEl
			{...props}
			className={cn(
				'pl-1 text-sm whitespace-nowrap uppercase',
				props.className
			)}>
			{label}
			{required && <Required />}
			{error.location == 'above' && error.message && (
				<ErrorEl>{error.message}</ErrorEl>
			)}
		</LabelEl>
	)
}

export const Legend = ({ ...props }) => {
	return (
		<legend
			{...props}
			className='mx-auto px-4 text-lg font-medium'
		/>
	)
}

export const Fieldset = ({ ...props }: Props<'fieldset'>) => {
	return (
		<fieldset
			{...props}
			className={cn(
				'border-border/10 bg-background/20 flex flex-col gap-4 rounded-lg border-1 px-4 py-4',
				props.className
			)}
		/>
	)
}

export const Select = ({
	current,
	...props
}: Props<'select'> & {
	current?: string | number
}) => {
	console.log(current)
	return (
		<select
			{...props}
			className={cn(
				classNameBase,
				'field-sizing-content',
				'',
				props.className
			)}
		/>
	)
}

export const ErrorEl = ({ ...props }: Props<'span'>) => {
	return (
		<span
			{...props}
			className='w-full px-4 text-end text-xs leading-2 text-red-600 italic'
		/>
	)
}

export const Required = () => (
	<span className='mx-0 text-red-600'>*</span>
)

export const CB = ({
	label,
	pathway,
	schemaKey,
	setPathway,
	children,
	id,
	...props
}: Props<'input'> & {
	schemaKey:
		| 'potentialResidencyPathway'
		| 'potentialCitizenshipPathway'
		| 'reunificationIsPossible'
		| 'hasRestrictions'
	label: string
	pathway: tPathwayForm
	setPathway: Dispatch<SetStateAction<tPathwayForm>>
}) => {
	const cbRef = useRef<HTMLInputElement>(null)

	return (
		<span className='flex flex-col'>
			<span className='mb-2 flex gap-2'>
				<span className='flex h-5 w-5 items-center justify-center rounded-xs outline-[#7A2235] focus-within:outline-[1.5px]'>
					<input
						{...props}
						id={id ?? schemaKey}
						ref={cbRef}
						type='checkbox'
						checked={pathway[schemaKey].value ?? false}
						onChange={(e) =>
							setPathway(
								Object.assign({}, pathway, {
									[schemaKey]: {
										value: e.target.checked,
										error: null,
									},
								})
							)
						}
						className='mx-1 my-1 outline-none focus-visible:outline-none'
					/>
				</span>
				<Label
					htmlFor={id ?? schemaKey}
					label={label}
					onClick={() => {
						cbRef.current?.click()
					}}
				/>
			</span>
			{pathway[schemaKey].value == true && children}
		</span>
	)
}

export const Textarea = ({
	handleBlur,
	...props
}: Props.WithRef<'textarea'> & {
	handleBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void
	['data-id']?: string
}) => {
	return (
		<textarea
			placeholder='Add Note Text...'
			defaultValue={props.defaultValue}
			data-id={props['data-id']}
			onBlur={handleBlur}
			{...props}
			className={cn(
				'bg-foreground/5 grow-1 rounded-xl px-3 py-2 text-sm outline-1 focus-visible:border-[#7A2235] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A2235]',
				props.className
			)}
		/>
	)
}
