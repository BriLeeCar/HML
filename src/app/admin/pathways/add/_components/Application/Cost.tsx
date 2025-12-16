import { SubSectionFieldset } from '@/admin/_components'
import { Checkbox, CheckboxField, Label, Select } from '@/admin/_components/catalyst'
import { CostInput, CostRangeFieldsGroup, refresh, type ElPrismaProps } from '../..'

export const ApplicationCost = ({
	data,
	handlePrisma,
	countries,
}: ElPrismaProps & {
	countries: Array<Queried.Country.WithRelations>
}) => {
	// #region ! ---------- FNS ----------
	const currencyOptions = countries
		.filter(c => c.code === data.query.countryCode)
		.flatMap(c => c.currencies)

	const currencyOptionEls = () => {
		const currencies: {
			value: string
			label: string
			base: string
		}[] = []

		for (const currency of currencyOptions) {
			currencies.push({
				value: currency.code,
				label: `${currency.code} - ${currency.symbol}`,
				base: currency.code,
			})
		}

		return currencies
	}
	// #endregion ! --------------------

	const currencies = currencyOptionEls()

	return (
		<SubSectionFieldset>
			<SubSectionFieldset.Legend
				aria-label='Cost'
				description='The cost associated with applying for this pathway. Do not include costs for documents as those will be covered in the Documentation section.'>
				Cost
			</SubSectionFieldset.Legend>
			<SubSectionFieldset.Details className='gap-x-8 sm:grid-cols-3'>
				<CostRangeFieldsGroup
					required
					label='Min'
					errorMessages={data.errors.cost.min}>
					<CostInput
						data={data}
						keyMinMax='min'
						handlePrisma={handlePrisma}
					/>
				</CostRangeFieldsGroup>
				<CostRangeFieldsGroup
					label='Max'
					errorMessages={data.errors.cost.max}>
					<CostInput
						data={data}
						keyMinMax='max'
						handlePrisma={handlePrisma}
					/>
				</CostRangeFieldsGroup>
				<CostRangeFieldsGroup
					disabled={currencies.length === 0}
					required
					label='Currency'
					errorMessages={[]}>
					<Select
						name={`costUOM`}
						aria-label={`Cost UOM`}
						className='has-data-disabled:italic *:data-disabled:text-xs/loose'
						onChange={e => {
							const selectedCurrency = currencyOptions[e.target.selectedIndex]

							handlePrisma(refresh(data, 'currencyCode', selectedCurrency.code))
						}}>
						{currencies.length > 0 ?
							currencies.map(option => (
								<option
									key={option.base}
									value={option.value}>
									{option.label}
								</option>
							))
						:	<option
								key={''}
								value={''}>
								{'Select a Country'}
							</option>
						}
					</Select>
				</CostRangeFieldsGroup>
				<CheckboxField disabled={currencies.length === 0}>
					<Checkbox
						color='brand'
						onChange={e => {
							const newCode = currencies.length == 1 ? currencies[0].base : ''
							const allCurrencies = data.utilities.countryData?.currencies as {
								symbol: string
								name: string
								code: string
							}[]
							handlePrisma({
								...data,
								query: {
									...data.query,
									currencyCode: e ? 'USD' : newCode,
								},
								utilities: {
									...data.utilities,
									countryData: {
										...data.utilities.countryData,
										currencies: [
											...allCurrencies,
											{
												symbol: '$',
												name: 'United States Dollar',
												code: 'USD',
											},
										],
									} as Queried.Country.WithRelations,
								},
							})
						}}
					/>
					<Label className='text-interactive ml-2 whitespace-nowrap'>Use USD?</Label>
				</CheckboxField>
			</SubSectionFieldset.Details>
		</SubSectionFieldset>
	)
}
