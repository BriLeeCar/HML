import { Section } from '~/components';
import { HeroIllistration } from '~/components/Layout/Hero';

export default function Home() {
	return (
		<>
			<div className='w-full flex items-center' id='homeIllistration'>
				<Section>
					<Section.Heading brow='glad to see you here!' size='lg'>
							Home is where the 
						<span className='heading-accent-line-accent-200 heading-accent-text-accent-500'>
							Hope
						</span>{' '}
						is
					</Section.Heading>
				</Section>
				<div className='ml-auto'>
					<HeroIllistration />
				</div>
			</div>
		</>
	);
}
