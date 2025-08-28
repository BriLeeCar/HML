import { tDB } from '~/server/db/db'

const Stat = ({
	title,
	stat,
	color,
}: Record<string, string | number>) => {
	return (
		<aside className='bg-foreground h-[100px] w-[150px] flex-col items-center justify-center overflow-hidden rounded-lg text-black shadow-sm'>
			<span
				className='flex h-full w-full flex-col items-center justify-center gap-1 p-4 *:w-full *:leading-none'
				style={{
					background: color ? `hsl(${color}, 100%, 50%)` : undefined,
				}}>
				<h3 className='text-center text-sm font-medium uppercase'>
					{title}
				</h3>
				<p className='text-center text-4xl font-extrabold'>{stat}</p>
			</span>
		</aside>
	)
}

export const Stats = ({
	countryStats,
}: {
	countryStats: ReturnType<tDB['getCountryStats']>
}) => {
	return (
		countryStats && (
			<section className='flex w-full items-end justify-around py-6'>
				{countryStats.map((stat) => {
					let color = 0
					switch (stat.title) {
						case 'Health Index':
							color = (Number(stat.value) / 100) * 120
							break
						case 'Cost of Living':
							color = 120 - (Number(stat.value) / 110) * 120
							break
						case 'Quality Index':
							color = (Number(stat.value) / 220) * 120
							break
						case 'Safety Index':
							color = (Number(stat.value) / 90) * 120
							break
						default:
							color = 0
					}

					return (
						stat.value && (
							<Stat
								key={stat.title}
								title={stat.title}
								stat={stat.value}
								color={color}
							/>
						)
					)
				})}
			</section>
		)
	)
}
