/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextConfig } from 'next';

type WebpackConfig = {
	buildId: string;
	dev: boolean;
	isServer: boolean;
	defaultLoaders: { babel: unknown };
	nextRuntime: 'edge' | 'nodejs' | undefined;
	webpack: unknown;
};

// ! TO DO
// #region ! ---------- WEBPACK CONFIG FOR SEARCH ----------

const Search = (nextConfig: NextConfig) => {
	const webpackConfig = {
		webpack: (config: NextConfig, options: WebpackConfig) => {},
	};
};

// #endregion ! --------------------
