import { Bold, InlineLink, Section, SectionHeading, Subsection } from '@/admin/_components'
import { Text } from '@/admin/_components/catalyst'
import { Li, List } from '~/components'

export const ProgammingPracticalCheck = () => {
	return (
		<Section>
			<SectionHeading
				subtitle={
					<>
						Create a <Bold>React component</Bold> from one of the options below that showcases how
						you usually organize your imports, manage reactive data, structure your JSX, and overall
						basic logic/style.
					</>
				}>
				Practical Check
			</SectionHeading>
			<List
				type='numbered'
				className='text-foreground mt-0 list-disc pr-8 *:my-6'>
				<Li>
					It does <Bold>not</Bold> need to be fancy or perfectly polished. We are really just doing
					a vibe check
				</Li>
				<Li>
					Include an explanation of your approach and thought process in a multi-line comment at the
					top of your code, as well as documentation where it makes sense throughout.
				</Li>
			</List>

			<div className='grid grid-cols-1 gap-y-6 px-12'>
				<Subsection>
					<Subsection.Heading>Option A - Country Card Component</Subsection.Heading>
					<Text>
						Current card can be found{' '}
						<InlineLink
							href='/explorer'
							className='[font-size:inherit] text-inherit'>
							here
						</InlineLink>
						. What we are asking for is a little different, but we are wanting to see your structure
						and style more than visuals
					</Text>
					<div>
						<Bold>It should have space for:</Bold>
						<List
							type='numbered'
							className='mt-0 *:mt-1!'>
							<Li>Country name</Li>
							<Li>Region (e.g., Western Europe, South America)</Li>
							<Li>One or two key attributes</Li>
							<Li>A clear way to view more details (button or link)</Li>
						</List>
					</div>
				</Subsection>
				<Subsection>
					<Subsection.Heading>Option B - Country List Search & Filter</Subsection.Heading>
					<Text>
						Example can be found <InlineLink href='/map'>here</InlineLink>. but we are asking for
						something that would be stand alone (not with the map)
					</Text>
					<p>
						A list of countries that will be filtered both as the user types, and as the user
						selects attributes (region, language, safety, etc).
					</p>
					<p>
						Think searchable data table for searching & filtering, but just a list of responses.
					</p>
					<p className='block italic'>
						Don't focus on what the filters are. That part doesn't really matter
					</p>
					<div>
						<Bold>It should include:</Bold>
						<List
							type='numbered'
							className='mt-0 *:mt-0!'>
							<Li>A search input for countries</Li>
							<Li>
								At least one interactive filter (for example: region, language, or “priority” like
								safety/economy/healthcare)
							</Li>
							<Li>A clear way for users to see what’s currently selected</Li>
						</List>
					</div>
				</Subsection>
			</div>
		</Section>
	)
}
