import { tCountryRest } from '~/data/baseCountryApi'

export const QuickFacts = ({ ...props }: tCountryRest) => {
	return (
		<aside className='bg-card border-border flex grow basis-[80%] flex-wrap items-start justify-start gap-1 rounded-lg border-1 p-4 shadow-md'>
			<ul className='mt-0 grow basis-1/3 list-disc pl-5'>
				<Fact label='Country Code'>{props.cca2}</Fact>
				<Fact label='UN Member'>{props.unMember ? '✅' : '❌'}</Fact>
				<Fact label='Name'>
					{props.name.common}
					<br />({props.name.official})
				</Fact>
				<Fact label='Population'>
					{props.population.toLocaleString()}
				</Fact>
			</ul>
			<ul className='mt-0 grow basis-1/3 list-disc pl-5'>
				<Fact label='Region'>
					{props.subregion} ({props.region})
				</Fact>
				<Fact label='Capital'>
					{props.capital.length > 0 ? props.capital[0] : 'N/A'}
				</Fact>
				<Fact label='Currency'>
					<ul className='pl-5'>
						{Object.values(props.currencies).map((currency) => {
							return (
								<Fact
									key={currency.name}
									label={currency.name}>
									{currency.symbol}1.00 = $
									{(1 / (currency.exchangeRate ?? 1))?.toFixed(2)}
								</Fact>
							)
						})}
					</ul>
				</Fact>
				<li>
					<strong>Languages</strong>:{' '}
					{Object.values(props.languages).join(', ')}
				</li>
			</ul>
		</aside>
	)
}

const Fact = ({
	...props
}: {
	label?: string
	value?: string | number | boolean
	children?: React.ReactNode
}) => {
	return (
		<li>
			{props.label && (
				<>
					<strong>{props.label}</strong>:{' '}
				</>
			)}
			{props.children || props.value?.toString() || 'N/A'}
		</li>
	)
}
