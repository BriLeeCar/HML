import type { NextConfig } from 'next';

type WebpackConfig = {
	buildId: string;
	dev: boolean;
	isServer: boolean;
	defaultLoaders: { babel: any };
	nextRuntime: 'edge' | 'nodejs' | undefined;
	webpack: unknown;
};

const Search = (nextConfig: NextConfig) => {
	const webpackConfig = {
		webpack: (config: NextConfig, options: WebpackConfig) => {
            
        },
	};
};
