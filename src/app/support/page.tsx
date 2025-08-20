import { MDXProcessor } from '~/MDX/ProcessMDX'

const SupportPage = async () => {
	const data = new MDXProcessor('src/data/pages/support.mdx', 'path')

	console.log(data)

	return (
		<main>
			<data.Provider />
		</main>
	)
}

export default SupportPage
