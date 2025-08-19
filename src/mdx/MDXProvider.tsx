import { MDXRemote } from 'next-mdx-remote-client/rsc';

export const MDXProvider = ({
	source,
	options,
	components,
}: Partial<AppMDX.BaseProps> & { source: string }) => {
	return (
		<MDXRemote source={source} options={options} components={components} />
	);
};
