import { tCountry } from '~/data/stores/countryStore'

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
	countryStats: tCountry
}) => {
	return (
		countryStats && (
			<section className='flex w-full items-end justify-around py-6'>
				{countryStats['crime']['index'] && (
					<Stat
						title='Safety Index'
						stat={countryStats['crime']['safety']}
					/>
				)}
				{countryStats['health']['index'] && (
					<Stat
						title='Health Index'
						stat={countryStats['health']['index']}
					/>
				)}
				{countryStats['cost of living'] && (
					<Stat
						title='Cost of Living'
						stat={countryStats['cost of living']}
					/>
				)}
				{countryStats['quality']['index'] && (
					<Stat
						title='Quality Index'
						stat={countryStats['quality']['index']}
					/>
				)}
			</section>
		)
	)
}
