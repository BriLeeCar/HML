import { Section } from '~/components'
import { DB } from '~/server/db/db'

const Stat = ({
	title,
	stat,
	color,
}: Record<string, string | number>) => {
	return (
		<aside
			className='flex h-[100px] grow basis-[150px] flex-col items-center justify-center gap-1 overflow-hidden rounded-lg p-4 text-black *:w-full *:leading-none'
			style={{
				background: color ? `hsl(${color}, 100%, 50%)` : undefined,
			}}>
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
	countryStats: ReturnType<DB['getCountryStats']>
}) => {
	return (
		countryStats && (
			<Section className='mx-auto max-w-[calc(300px_+_1rem)] flex-row flex-wrap justify-center gap-2 md:max-w-[calc(450px+1.5rem)] lg:max-w-[calc(600px_+_2rem)]'>
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
			</Section>
		)
	)
}
