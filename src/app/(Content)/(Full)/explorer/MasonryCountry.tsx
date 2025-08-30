import Image from 'next/image'
import Link from 'next/link'
import { IconAttributes } from '~/components/Country/IconAttributes'
import { Heading } from '~/components/Heading'
import { TouchTarget } from '~/components/ui'
import { cn } from '~/lib/cn'

export const Country = ({
	country,
	priority,
	db,
}: {
	country: ApiData.Country
	priority: boolean
	db: ApiData.DB
}) => {
	return (
		<>
			<Figure
				country={country}
				priority={priority}
			/>
			<Link
				href={`/countries/${country.abbr.toLowerCase()}`}
				title={country.name}
				className='underline decoration-red-500/50 hover:decoration-white/50'>
				<section className='absolute top-0 right-0 left-0 flex h-[calc(100%-0.5rem)] items-center justify-center overflow-hidden rounded-t-lg hover:saturate-0'>
					<TouchTarget className='top-0 bottom-0 h-full w-full p-0 pointer-fine:block'>
						<Heading
							size='title'
							className='font-heading mt-0 mb-0 pb-2 text-center text-3xl font-medium tracking-normal text-white decoration-red-500 text-shadow-md md:text-5xl'>
							{country.name}
						</Heading>
					</TouchTarget>
				</section>
				<IconAttributes
					attr={db.getCommunityAttributes(country)}
					className='absolute bottom-1.5 flex w-full justify-start rounded-b-lg bg-black/50 overflow-ellipsis *:text-lg **:[svg]:size-8 **:[svg]:text-zinc-500'
				/>
			</Link>
		</>
	)
}

const Figure = ({
	country,
	priority,
}: {
	country: ApiData.Country
	priority: boolean
}) => {
	if (!country.images) {
		console.log(country)
		return <></>
	}

	const details =
		country.images?.havePhoto ?
			{
				...country.images,
				url: '/countries/' + country.name.toLowerCase() + '.jpeg',
				alt: `Photograph showing life in ${country.name}`,
			}
		:	{
				width: 640,
				height: 853,
				name: 'Placeholder',
				handle: 'placeholder',
				havePhoto: false,
				url: '/countries/placeholder.jpeg',
				alt: `Placeholder image for ${country.name}`,
			}

	return (
		<figure
			style={{
				aspectRatio: `${details.width} / ${details.height}`,
			}}
			className='relative inline-flex w-full shrink overflow-hidden rounded-lg px-0 pt-0'>
			<Image
				src={details.url}
				alt={details.alt}
				fill
				style={{
					objectFit: 'fill',
					objectPosition: 'center center',
				}}
				sizes={`500px`}
				className={cn(
					'h-auto w-full transition-all',
					!country.images?.havePhoto && 'opacity-50 grayscale',
					country.images?.havePhoto && 'contrast-110 saturate-90'
				)}
				priority={priority}
			/>
			<span className='absolute top-0 right-0 left-0 h-full bg-black/40' />
			<FigCaption country={country} />
		</figure>
	)
}

const FigCaption = ({ country }: { country: ApiData.Country }) => (
	<figcaption className='absolute top-0 right-0 z-20 w-full px-2 py-1 text-end font-mono text-[.5rem] text-white uppercase underline decoration-current/30 underline-offset-2 text-shadow-2xs hover:decoration-current'>
		<Link
			href={'https://unsplash.com/@' + country.images.handle}
			target='_blank'
			rel='noopener noreferrer'>
			Photo By {country.images.name} on Unsplash
		</Link>
	</figcaption>
)
