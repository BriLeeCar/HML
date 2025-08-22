import { CountryStore } from '~/data/stores/countryStore'

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
	countryStats: CountryStore['countries'][number]
}) => {
	return (
		countryStats && (
			<section className='flex w-full items-end justify-around py-6'>
				{countryStats['safety index'] && (
					<Stat
						title='Safety Index'
						stat={countryStats['safety index']}
					/>
				)}
				{countryStats['health care index'] && (
					<Stat
						title='Health Index'
						stat={countryStats['health care index']}
					/>
				)}
				{countryStats['cost of living'] && (
					<Stat
						title='Cost of Living'
						stat={countryStats['cost of living']}
					/>
				)}
				{countryStats['total'] && (
					<Stat
						title='Quality Index'
						stat={countryStats['total']}
					/>
				)}
			</section>
		)
	)
}
