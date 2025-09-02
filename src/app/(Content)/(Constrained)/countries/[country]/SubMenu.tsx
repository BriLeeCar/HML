import {
	Basics,
	Briefcase,
	Confetti,
	Home,
	Medical,
	Pathways,
	PiggyBank,
} from '@/(Content)/_Layout/SVG'
import { redirect, RedirectType } from 'next/navigation'

export const SubMenu = ({
	country,
	active,
}: {
	country: string
	active?: string
}) => {
	const links = [
		{
			text: 'Basics',
			link: `/countries/${country}`,
			icon: Basics,
		},
		{
			text: 'Pathways',
			link: `/countries/${country}/pathways`,
			icon: Pathways,
		},
		{
			text: 'Economy',
			link: `/countries/${country}/economy`,
			icon: PiggyBank,
		},
		{
			text: 'Social',
			link: `/countries/${country}/social`,
			icon: Confetti,
		},
		{
			text: 'Employment',
			link: `/countries/${country}/employment`,
			icon: Briefcase,
		},
		{
			text: 'Housing',
			link: `/countries/${country}/housing`,
			icon: Home,
		},
		{
			text: 'Medical',
			link: `/countries/${country}/medical`,
			icon: Medical,
		},
	]

	return (
		<>
			<select
				className='bg-card mt-8 w-full rounded-md border-1 px-4 py-2 text-sm font-semibold shadow-sm lg:w-1/2'
				onChange={(e) => {
					const value = e.target.value
					if (value) {
						redirect(value, 'push' as RedirectType)
					}
				}}
				defaultValue={
					active ? `/countries/${country}/${active}` : country
				}>
				{links.map((item) => (
					<option
						key={item.text}
						value={item.link}>
						{item.text}
					</option>
				))}
			</select>
		</>
	)
}
