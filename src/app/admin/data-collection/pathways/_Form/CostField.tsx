import { Input, InputGroup, type ElPrismaProps } from '..'

export const FieldCost = ({
	data,
	cost,
	...props
}: Props<typeof Input> & {
	data: ElPrismaProps['data']
	cost: number
}) => {
	return (
		<InputGroup>
			{data.query.currencyCode && (
				<span
					data-slot='icon'
					className='text-xs'>
					{
						data.utilities.countryData?.currencies.find(c => c.code == data.query.currencyCode)
							?.symbol
					}
				</span>
			)}
			<Input
				type='number'
				min={0.0}
				step={0.01}
				placeholder='0.00'
				defaultValue={cost > 0 ? cost.toString() : undefined}
				{...props}
			/>
		</InputGroup>
	)
}
