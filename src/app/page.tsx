import { Section } from '~/components';

export default function Home() {
	return (
		<div className='flex items-center justify-center h-screen gap-4'>
			<Section>
				<Section.Heading brow='glad to see you here!' size='lg'>
					<span className='heading-accent-line-accent-200 heading-accent-text-accent-500'>
						Welcome
					</span>{' '}
					to the Home Page
				</Section.Heading>
			</Section>
		</div>
	);
}
