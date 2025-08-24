declare module 'mdx-annotations' {
	declare const mdxAnnotations: {
		remark(): (tree: any) => void
		rehype(): (tree: any) => void
		recma(): (tree: any) => void
	}

	export { mdxAnnotations }
}
