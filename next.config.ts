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
		],
	},
}

export default nextConfig
