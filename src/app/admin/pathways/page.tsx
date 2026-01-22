import { Icon } from '~/components/Icon'
import { api } from '~/serverQuery'
import { InlineLink, Section, SectionHeading } from '../_components'
import {
	Dropdown,
	DropdownButton,
	DropdownHeading,
	DropdownMenu,
	DropdownSection,
} from '../_components/catalyst/client/dropdown'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../_components/catalyst/client/table'
import { LayoutWrapper } from '../_components/client'

const PathwayPage = async ({ searchParams }: PageProps<'/admin/pathways'>) => {
	const { p } = (await searchParams) as { p?: string }

	const pathways = await api.pathway.page(p ?? '0')

	const grouped = Object.groupBy(pathways, path => path.countryCode ?? 'Unassigned')

	return (
		<LayoutWrapper
			subtitle={
				<>
					<InlineLink href='/admin/pathways/add'>Add New Pathway</InlineLink>
				</>
			}>
			{Object.keys(grouped).map(k => {
				const countryCode = k as keyof typeof grouped
				const country =
					grouped[countryCode]
					// @ts-expect-error mistyped
					&& grouped[countryCode][0]?.country.name
				return (
					<Section
						key={countryCode}
						className='gap-y-4'>
						<SectionHeading>{country}</SectionHeading>
						<Table
							dense
							bleed>
							<caption className='sr-only'>{country} pathways</caption>
							<TableHead>
								<TableRow>
									<TableHeader>Pathway</TableHeader>
									<TableHeader></TableHeader>
								</TableRow>
							</TableHead>
							<TableBody>
								{grouped[countryCode]?.map(pathway => (
									<UserRow
										key={pathway.id}
										pathway={pathway}
									/>
								))}
							</TableBody>
						</Table>
					</Section>
				)
			})}
		</LayoutWrapper>
	)
}

const UserRow = ({ pathway }: { pathway: TRPC.RouterOutputs['pathway']['page'][number] }) => {
	return (
		<TableRow
			key={pathway.id}
			className='*:align-text-top'>
			<TableCell width={'100%'}>
				<InlineLink
					href={`/admin/pathways/view?pathwayId=${pathway.id}`}
					className='block w-full whitespace-break-spaces decoration-1 lg:max-w-[20vw]'>
					{pathway.name}
				</InlineLink>
			</TableCell>
			<TableCell width={'0%'}>
				<Dropdown>
					<DropdownButton
						plain
						color='none'
						aria-label='Actions'
						className={
							'btn-focus click text-interactive hover:text-background hover:bg-interactive align-text-topå rounded-full'
						}>
						<Icon
							IconName='DotsHorizontalRoundedIcon'
							className='size-5'
							data-slot='icon'
							solid
						/>
					</DropdownButton>
					<DropdownMenu>
						<DropdownSection>
							<DropdownHeading>
								{pathway.name.slice(0, 20)}
								{pathway.name.length > 20 && '...'}
							</DropdownHeading>
						</DropdownSection>
					</DropdownMenu>
				</Dropdown>
			</TableCell>
		</TableRow>
	)
}

export default PathwayPage
