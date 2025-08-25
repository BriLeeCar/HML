import { tDB } from '~/server/db/db'

const Stat = ({ title, stat }: Record<string, string | number>) => {
	return (
		<aside className='bg-foreground text-background flex h-[100px] w-[150px] flex-col items-center justify-center rounded-lg p-4 shadow-sm *:w-full *:leading-none'>
			<h3 className='text-center text-sm font-medium uppercase'>
				{title}
			</h3>
			<p className='text-center text-4xl font-extrabold'>{stat}</p>
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
					return (
						stat.value && (
							<Stat
								key={stat.title}
								title={stat.title}
								stat={stat.value}
							/>
						)
					)
				})}
			</section>
		)
	)
}
