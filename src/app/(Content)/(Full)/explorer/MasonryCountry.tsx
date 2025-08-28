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
				className='block underline decoration-red-500/50 hover:decoration-white/50'>
				<TouchTarget className='top-0 right-0 bottom-0 left-0 h-full w-full translate-0 pointer-fine:block'>
					<section className='absolute top-1/2 right-0 left-0 -translate-y-1/2'>
						<Heading
							size='title'
							className='font-heading mt-0 mb-0 pb-2 text-center text-5xl font-medium tracking-normal text-white decoration-red-500 text-shadow-md'>
							{country.name}
						</Heading>
					</section>
				</TouchTarget>
				<IconAttributes
					attr={db.getCommunityAttributes(country)}
					className='absolute bottom-0 flex w-full justify-start bg-black/50 overflow-ellipsis *:text-lg **:[svg]:size-8 **:[svg]:text-zinc-500'
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
	const details =
		country.images.havePhoto ?
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
			className='relative inline-flex w-full shrink px-0 pt-0'>
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
					!country.images.havePhoto && 'opacity-50 grayscale'
				)}
				priority={priority}
			/>
			<span className='absolute top-0 right-0 left-0 h-full rounded-lg bg-black/20' />
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
