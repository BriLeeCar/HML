import * as typedoc from 'typedoc'

const excludePathParsed = ({ base = './src/', exclude }) => {
	return exclude.flatMap((p) => {
		if (typeof p == 'object') {
			return excludePathParsed({ base: '../src/' + p.base, exclude: [...p.exclude] });
		}
		return base + p;
	});
};

const excludedPaths = excludePathParsed({
	exclude: [
		'env.js',
		{
			base: 'server/prisma/generated/',
			exclude: ['internal/**', 'commonInputTypes.ts'],
		},
	],
})


/** @type {import('typedoc').TypeDocOptions} */
const config = {
	entryPointStrategy: 'expand',
	tsconfig: '../tsconfig.json',
	out: '../.docs',
	entryPoints: ['./src/**'],
	plugin: [
		'typedoc-plugin-missing-exports',
		'typedoc-plugin-mdn-links',
		'typedoc-plugin-merge-modules',
		'typedoc-plugin-inline-sources',
		'typedoc-plugin-dt-links'
	],
	highlightLanguages: [...typedoc.OptionDefaults.highlightLanguages],
	excludeExternals: true,
	blockTags: [
		...typedoc.OptionDefaults.blockTags,
		'@source',
		'@desc',
		'@description'
	],
	mergeModulesRenameDefaults: true,
	mergeModulesMergeMode: 'module',
	exclude: excludedPaths,
	useTsLinkResolution: true,
	includeDocCommentReferences: true,
	collapseInternalModule: true,
}

export default config
