import { Heading } from '~/components/Heading';
import { BookmarkBtn, FavoriteBtn } from '~/components/index';

export default function Home() {
	return (
		<div className='flex items-center justify-center h-screen gap-4'>
			<FavoriteBtn />
			<BookmarkBtn />
			<Heading level={1} size='xs'>
				Test
			</Heading>
		</div>
	);
}
