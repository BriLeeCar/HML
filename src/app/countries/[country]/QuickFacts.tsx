import { tCountryRest } from '~/data/baseCountryApi'

export const QuickFacts = ({ ...props }: tCountryRest) => {
	return (
		<aside>
			<h2 className='text-xl font-semibold'>Quick Facts</h2>
			<ul className='list-disc pl-5'>
				<Fact label='Country Code'>{props.cca2}</Fact>
				<Fact label='UN Member'>{props.unMember ? '✅' : '❌'}</Fact>
				<Fact label='Name'>
					{props.name.common} ({props.name.official})
				</Fact>
				<Fact label='Population'>
					{props.population.toLocaleString()}
				</Fact>
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
				<li>
					<a
						href={props.maps.googleMaps}
						target='_blank'
						rel='noopener noreferrer'>
						View on Google Maps
					</a>
				</li>
				<li>
					<a
						href={props.maps.openStreetMaps}
						target='_blank'
						rel='noopener noreferrer'>
						View on OpenStreetMaps
					</a>
				</li>
			</ul>

			<ul className='grid grid-cols-2 gap-4'>
				<F label='Capital'>{props.capital[0]}</F>
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

const F = ({
	label,
	...props
}: Props & {
	label: string
}) => {
	return (
		<li>
			<strong>{label}</strong>: {props.children || 'N/A'}
		</li>
	)
}
