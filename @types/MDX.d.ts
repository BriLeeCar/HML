import type { MDXRemoteProps } from 'next-mdx-remote-client/rsc';

declare global {
	namespace AppMDX {
		type BaseProps = Omit<MDXRemoteProps, 'source' | 'options'> & {
			options: Options;
		};

		type Options = MDXRemoteProps['options'] & {
			removeTitle?: boolean;
		};

		type ByPathProps = BaseProps & {
			source: string[] | string;
		};

		type ByRawProps = BaseProps & {
			source: MDXRemoteProps['source'];
		};

		type Props<T extends 'ByPath' | 'ByRaw'> = T extends 'ByPath'
			? ByPathProps & { byPath: true; byRaw?: never }
			: T extends 'ByRaw'
				? ByRawProps & { byPath?: never; byRaw: true }
				: never;
	}
}
