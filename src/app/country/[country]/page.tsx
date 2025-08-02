import fs from 'fs';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { redirect } from 'next/navigation';
import path from 'path';
import { Suspense } from 'react';
import { Loading } from '~/components/Loading';
import { mdxComponents } from '~/components/MDX';

const CountryPage = async ({
	params,
}: {
	params: Promise<{ country: string }>;
}) => {
	const { country } = await params;
	const filePath = path.join(process.cwd(), 'src/data', `${country}/base.mdx`);
	let source;
	try {
		source = fs.readFileSync(filePath, 'utf-8');
	} catch (error) {
		console.warn(`MDX file not found for country: ${country}`, error);
	}

	if (!source) {
		redirect('/404');
	}

	return (
		<>
			<Suspense fallback={<Loading />}>
				<MDXRemote
					options={{
						parseFrontmatter: true,
					}}
					components={mdxComponents}
					source={source}
				/>
			</Suspense>
		</>
	);
};

export default CountryPage;

export async function generateStaticParams() {
	const countries = ['america', 'canada', 'mexico']; // Example countries, replace with actual data source
	return countries.map((country) => ({
		country,
	}));
}
