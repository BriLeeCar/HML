import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { Suspense } from 'react';
import { Loading, mdxComponents } from '~/components';

import type { MDXRemoteProps } from 'next-mdx-remote-client/rsc';

export const MDXProvider = ({ ...props }: MDXRemoteProps) => {
	return (
		<Suspense fallback={<Loading />}>
			<MDXRemote
				{...props}
				options={{
					parseFrontmatter: true,
					...props.options,
				}}
				components={mdxComponents}
			/>
		</Suspense>
	);
};


