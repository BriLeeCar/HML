import { Description, Field, Label, Textarea } from '@/admin/_components/catalyst'
import { Cohesion } from '../Cohesion'

const strengths = [
	{
		label: 'Vector Graphics',
		name: 'vector_graphics',
		type: 'Design',
	},
	{
		label: 'Wireframing (low-fidelity)',
		name: 'wireframing',
		type: 'Design',
	},
	{
		label: 'Prototyping (high-fidelity)',
		name: 'prototyping',
		type: 'Design',
	},
	{
		label: 'User Flows',
		name: 'user_flows',
		type: 'User Experience',
	},
	{
		label: 'User Personas',
		name: 'user_personas',
		type: 'User Experience',
	},
	{
		label: 'Creating Design Systems',
		name: 'design_systems',
		type: 'Design',
	},
	{
		label: 'Working Within Design Systems',
		name: 'working_within_design_systems',
		type: 'Design',
	},
	{
		label: 'Accessibility Checks',
		name: 'accessibility_checks',
		type: 'User Experience',
	},
	{
		label: 'User Research',
		name: 'user_research',
		type: 'User Experience',
	},
	{
		label: 'Usability Testing',
		name: 'usability_testing',
		type: 'User Experience',
	},
]

const tools = [
	{
		label: 'Figma',
		name: 'figma',
	},
	{
		label: 'Adobe (XD, Photoshop, Illustrator)',
		name: 'adobe',
	},
	{
		label: 'Sketch',
		name: 'sketch',
	},
	{
		label: 'By Hand (Pen & Paper)',
		name: 'pen_and_paper',
	},
	{
		label: 'Other (Please Specify in final notes)',
		name: 'other',
	},
]

export const DesignerCohesion = () => {
	return (
		<Cohesion
			description={
				'One of the primary missions for Help Me Leave is to provide accessibility to information that seems to be—almost intentionally—difficult for every day people to understand. With that in mind, we would love to hear your thoughts on how you balance visual style with accessibility.'
			}
			tools={tools}
			strengths={strengths}>
			<Field>
				<Label
					required
					className='block text-balance'>
					Top Priorities
				</Label>
				<Description>
					When you design for a product like HML, what would your top 2–3 priorities be?
				</Description>
				<Textarea name='cohesion_priorities' />
			</Field>
			<Field>
				<Label required>Modern Web Accessibility</Label>
				<Description>
					What issues do you feel are still major problems for accessibility when it comes to modern
					websites and apps?
				</Description>
				<Textarea name='cohesion_modern_issues' />
			</Field>
			<Field>
				<Label required>Who's Doing it Right?</Label>
				<Description>
					What apps or websites you feel are doing well balancing accessibility and visual style in
					their designs?
				</Description>
				<Textarea name='cohesion_inspo' />
			</Field>
		</Cohesion>
	)
}
