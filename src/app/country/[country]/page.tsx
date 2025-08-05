import fs from 'fs';
import { redirect } from 'next/navigation';
import path from 'path';
import { processFrontmatter } from '~/util/frontmatter';
import { MDXProvider } from '../../../mdx/provider';
import { getFrontmatter } from 'next-mdx-remote-client/utils';

const thisPath = path.resolve(__dirname);

const CountryPage = async ({
	params,
}: {
	params: Promise<{ country: string }>;
}) => {
	const { country } = await params;
	const mdxBase = path.join(process.cwd(), thisPath, 'base.mdx');
	const filePath = path.join(process.cwd(), 'src/data', `${country}/base.mdx`);
	let source, base;
	try {
		source = fs.readFileSync(filePath, 'utf-8');
		base = fs.readFileSync(mdxBase, 'utf-8');
	} catch (error) {
		console.warn(`Information not found for country: ${country}`, error);
	}

	if (!source) {
		redirect('/404');
	}

	const fm = processFrontmatter(source);

	return <MDXProvider source={source} />;
};

export default CountryPage;

export async function generateStaticParams() {
	/* !! API: CALL ALL COUNTRIES */
	const countries = ['america', 'canada', 'mexico'];
	return countries.map((country) => ({
		country,
	}));
}
