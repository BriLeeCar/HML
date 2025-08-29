declare module 'mdx-annotations' {
	declare const mdxAnnotations: {
		remark(): (tree: unknown) => void
		rehype(): (tree: unknown) => void
		recma(): (tree: unknown) => void
	}

	export { mdxAnnotations }
}
