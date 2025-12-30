import {
	Bold,
	InlineLink,
	Section,
	SectionHeading,
	Subsection,
	SubSectionLegend,
} from '@/admin/_components'
import { Text } from '@/admin/_components/catalyst'
import { Li, List } from '~/components'
import { cn } from '~/lib'

export const DesignPracticalCheck = () => {
	return (
		<Section>
			<SectionHeading
				subtitle={
					<>
						Create a <Bold>small UI example</Bold> from one of the options below that showcases how
						you usually structure your designs and think through problems.
						<br />
						<span className='text-interactive text-base italic'>
							Most of our users visit from mobile devices, so prioritize this in your design.
						</span>
					</>
				}>
				Practical Check
			</SectionHeading>
			<List
				type='numbered'
				className='text-foreground mt-0 list-disc pr-8 *:my-6'>
				<Li>
					It does <Bold>not</Bold> need to be fancy or perfectly polished. We are in need of several
					design/ui roles, so go ahead and do whatever is most comfortable. We are more interested
					in how you think.
				</Li>
				<Li>
					If you have questions about additional constraints, explain in your submission how you
					would go about finding the answers.{' '}
					<Bold>
						Assume your investigation resulted in a particular answer in order to complete your
						submission.
					</Bold>
				</Li>
				<Li>
					Describe your design process, including a brief rundown of your approach, reasoning, and
					accessibility considerations. If you share a Figma link or image, a short written
					explanation next to it is perfect.
				</Li>

				<Li>
					We expect it will take you roughly 2 hours to complete this task, including all
					documentation. It should not take more than 4. Please submit your completed task within 1
					week to the volunteer assigned to onboard you
				</Li>
			</List>

			<div className='grid grid-cols-1 gap-y-6 px-12'>
				<Subsection>
					<Subsection.Heading>Option A - Country Card Layout</Subsection.Heading>
					<Text>
						Current card can be found{' '}
						<InlineLink
							href='/explorer'
							className='[font-size:inherit] text-inherit'>
							here
						</InlineLink>
						. What we are asking for is a little different, but we are wanting to see your style
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

export const ThisSubSectionLegend = ({ ...props }: Props<typeof SubSectionLegend>) => {
	return (
		<SubSectionLegend
			{...props}
			className={cn(
				'grid-cols-[min-content_auto] text-lg leading-none font-semibold *:[span]:hidden'
			)}
		/>
	)
}
