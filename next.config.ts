import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'mdx'],
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'flagcdn.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'upload.wikimedia.org',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'brileec.com',
			},
			{
				protocol: 'https',
				hostname: 'pub-87438faadb01418487f9087b516e33b8.r2.dev',
			},
		],
	},
	devIndicators: false,
	headers: async () => {
		return [
			{
				source: '/(.*)',
				headers: [
					{ key: 'Access-Control-Allow-Origin', value: '*' },
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET, POST, OPTIONS',
					},
					{
						key: 'Access-Control-Allow-Headers',
						value: 'Content-Type, Authorization',
					},
					{ key: 'Access-Control-Allow-Credentials', value: 'true' },
				],
			},
		]
	},
	logging: {
		fetches: {
			fullUrl: true,
			hmrRefreshes: true,
		},
	},
}

export default nextConfig
