import { cn } from '~/cn';
import { Footer } from './Footer';
import { Header } from './Header';

const css =
	'md:w-3xl dark:bg-zinc-900 bg-white mx-auto dark:border-x-1 border-zinc-800';

export const Layout = ({ className, children }: Props<'body'>) => {
	return (
		<body className={className}>
			<Header />
			<main
				className={cn(
					'md:not-[*:#homeIllistration]:container pb-12 md:p-6 px-10',
					css,
				)}
			>
				{children}
			</main>
			<Footer className={css} />
		</body>
	);
};
