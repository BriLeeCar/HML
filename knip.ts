export default {
	ignoreDependencies: [/.*eslint\/?.*/, /@types\/.*/, 'tailwindcss', 'tsx'],
	ignore: [
		'./src/server/prisma/generated/**',
		'./src/components/Icons/*.tsx',
		'./src/app/admin/_components/catalyst/*.tsx',
	],
}
