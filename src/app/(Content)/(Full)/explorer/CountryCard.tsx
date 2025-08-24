import Image from 'next/image'
import Link from 'next/link'
import { Heading } from '~/components/Heading'
import { tPhotoCountry } from './page'

export const CountryCard = ({
	country,
}: {
	country: tPhotoCountry
}) => {
	return (
		country.unsplash && (
			<div className='bg-background outline-card-foreground/5 h-fill w-full basis-full rounded-lg outline-1'>
				<figure
					key={country.unsplash.id}
					className='relative block h-auto w-[33vw] grow overflow-hidden rounded-t-lg px-0 pt-0'>
					<Image
						src={country.unsplash.urls.regular + '&dpr=2&auto=format'}
						alt={country.unsplash.alt_description ?? ''}
						fill
						style={{
							objectFit: 'cover',
							objectPosition: 'center center',
						}}
						className='h-full w-full'
					/>
					<figcaption className='absolute right-0 bottom-0 z-20 w-full bg-black/35 px-2 py-1 text-end font-mono text-[.5rem] text-white uppercase underline decoration-current/30 underline-offset-2 text-shadow-2xs text-shadow-black/20 hover:decoration-current'>
						<Link
							href={country.unsplash.user.links.html}
							target='_blank'
							rel='noopener noreferrer'>
							Photo By {country.unsplash.user.name} on Unsplash
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
