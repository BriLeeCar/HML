const SearchBlogPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string }>
}) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const query = await searchParams

	return <div>SearchBlogPage</div>
}

export default SearchBlogPage
