import Image from 'next/image'
import Link from 'next/link'
import { Heading } from '~/components'
import { tDB } from '~/server/db/db'

export const CountryCard = ({
	country,
}: {
	country: tDB['countries'][number]
}) => {
	return (
		country.images.havePhoto && (
			<div className='bg-background outline-card-foreground/5 h-fill w-full basis-full rounded-lg outline-1'>
				<figure
					key={country.abbr}
					className='relative block h-auto w-[33vw] grow overflow-hidden rounded-t-lg px-0 pt-0'>
					<Image
						src={'/countries/' + country.name.toLowerCase()}
						alt={`Photograph showing life in ${country.name}`}
						fill
						style={{
							objectFit: 'cover',
							objectPosition: 'center center',
						}}
						className='h-full w-full'
					/>
					<figcaption className='absolute right-0 bottom-0 z-20 w-full bg-black/35 px-2 py-1 text-end font-mono text-[.5rem] text-white uppercase underline decoration-current/30 underline-offset-2 text-shadow-2xs text-shadow-black/20 hover:decoration-current'>
						<Link
							href={'https://unsplash.com/@' + country.images.handle}
							target='_blank'
							rel='noopener noreferrer'>
							Photo By {country.images.name} on Unsplash
						</Link>
					</figcaption>
				</figure>
				<section className='relative px-4 pt-2 pb-4'>
					<Heading
						size='md'
						className='mt-0 border-0 font-sans font-bold'>
						{country.name}
					</Heading>
				</section>
			</div>
		)
	)
}
