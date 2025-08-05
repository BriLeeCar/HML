import { cn } from '~/cn';
import { Footer } from './Footer';
import { Header } from './Header';

const css =
	'lg:min-w-3xl dark:bg-zinc-900 bg-white mx-auto dark:border-x-1 border-zinc-800';

export const Layout = ({ className, children }: Props<'body'>) => {
	return (
		<body className={className}>
			
			<div className='flex flex-col lg:min-w-3xl lg:w-2/3 dark:bg-zinc-900 bg-white mx-auto dark:border-x-1 border-zinc-800 max-w-screen min-h-screen'>
				<Header />
				<main className={cn('grow-1 pb-12 md:p-6 px-10')}>{children}</main>
				<Footer />
			</div>
		</body>
	);
};
