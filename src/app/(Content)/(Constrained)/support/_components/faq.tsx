import fs from 'fs'
import path from 'path'
import {
	Section,
	SectionHeading,
	SubSection,
} from '~/components/index'
import { MDXProcessor } from '~/lib/mdx'

export const FAQ = () => {
	const questions: Array<{
		q: string
		A: MDXProcessor
	}> = fs
		.readFileSync(
			path.join(
				process.cwd(),
				'src/app/(Content)/(Constrained)/support/content.mdx'
			)
		)
		.toString()
		.split('### Q: ')
		.map((ea) => {
			const [q, ...a] = ea
				.split('\n')
				.filter((line) => line.trim() !== '')
			return {
				q: q.trim(),
				A: new MDXProcessor(a.join('\n').trim()),
			}
		})
		.slice(1)

	return (
		<Section>
			<SectionHeading
				id='FAQ'
				eyebrow='FAQ'
				subtitle='To keep our support team free to process users that are in dire need of relocation, we have compiled a list of frequently asked questions to help you find the information you need quickly.'>
				Only Have a Quick Question?
			</SectionHeading>
			{questions.map((ea) => (
				<SubSection
					defaultOpen={false}
					type='grey'
					title={
						<span className='flex gap-4'>
							<span>Q:</span>
							{ea.q}
						</span>
					}
					key={ea.q}>
					<ea.A.Provider />
				</SubSection>
			))}
		</Section>
	)
}
