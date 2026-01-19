import analyzer from '@next/bundle-analyzer'
import type { NextConfig } from 'next'

const withBundleAnalyzer = analyzer({
	enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
	pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'mdx'],
	images: {
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
	devIndicators: false,
}

export default withBundleAnalyzer(nextConfig)
