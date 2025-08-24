import type { NextConfig } from 'next'

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
		],
	},
	devIndicators: false,
}

export default nextConfig
