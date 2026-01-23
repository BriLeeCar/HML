import { Icon } from '~/components/Icon'
import { api } from '~/serverQuery'
import { Button, InlineLink, Section, SectionHeading } from '../_components'
import {
	Pagination,
	PaginationGap,
	PaginationList,
	PaginationNext,
	PaginationPage,
	PaginationPrevious,
} from '../_components/catalyst'
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
	const params = await searchParams
	const take = 10
	const p = params?.p ? Number(params.p) : 1

	const { pathways, allPathways } = await api.pathway.page({ page: p, take: take })

	const grouped = pathways.reduce(
		(acc, pathway) => {
			const countryCode = pathway.countryCode
			if (!acc[countryCode]) {
				acc[countryCode] = []
			}
			acc[countryCode].push(pathway)
			return acc
		},
		{} as Record<string, typeof pathways>
	)

	return (
		<LayoutWrapper>
			<Button
				href='/admin/pathways/add'
				className='text-hml-mulberry-500 hover:text-hml-mulberry-900 dark:hover:text-hml-yellow w-max bg-transparent hover:bg-transparent focus-visible:ring-offset-0 dark:bg-transparent dark:hover:bg-transparent'>
				<Icon
					IconName='PlusCircleIcon'
					data-slot='icon'
					className='mr-2 size-5'
					solid
				/>
				Add Pathway
			</Button>
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
			<PathwayPagination
				p={p}
				allPathways={allPathways}
				take={take}
			/>
		</LayoutWrapper>
	)
}

const PathwayPagination = ({
	p,
	allPathways,
	take,
}: {
	p: number
	allPathways: number
	take: number
}) => {
	const showPrevious = p > 1
	const showNext = p < Math.ceil(allPathways / take)

	if (!showPrevious && !showNext) {
		return null
	}

	const t = [...new Set([1, p - 2, p - 1, p, p + 1, p + 2, Math.ceil(allPathways / take)])]
		.filter(ea => ea > 0 && ea <= Math.ceil(allPathways / take))
		.reduce((acc, curr, idx, arr) => {
			if (idx == 0) {
				acc.push(curr)
				return acc
			} else if (idx == arr.length - 1) {
				acc.push(curr)
				return acc
			}

			const previousPage = arr[idx - 1]
			const nextPage = arr[idx + 1]

			if (curr - previousPage > 1) {
				acc.push(0, curr) // represent gap
				return acc
			} else if (nextPage - curr > 1) {
				acc.push(curr, 0) // represent gap
				return acc
			} else {
				acc.push(curr)
				return acc
			}
		}, [] as number[])

	return (
		<Pagination className='grid grid-cols-[1fr_max-content_1fr]'>
			<span>{showPrevious && <PaginationPrevious href={`pathways?p=${p - 1}`} />}</span>
			<PaginationList>
				{t.map(x =>
					x == 0 ?
						<PaginationGap key={x} />
					:	<PaginationPage
							href={`pathways?p=${x}`}
							key={x}
							current={x === p}>
							{x}
						</PaginationPage>
				)}
			</PaginationList>
			<span>
				{showNext && <PaginationNext href={showNext ? `pathways?p=${p + 1}` : undefined} />}
			</span>
		</Pagination>
	)
}

const UserRow = ({
	pathway,
}: {
	pathway: TRPC.RouterOutputs['pathway']['page']['pathways'][number]
}) => {
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
