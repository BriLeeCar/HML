import { Description, Field, Label, Textarea } from '@/admin/_components/catalyst'
import { Cohesion } from '../Cohesion'

const strengths = [
	{
		label: '{ /* Commenting and Documentation God(dess) */ }',
		name: 'commenting_documentation',
		type: '',
	},
	{
		label: 'Forever inserting "what if instead we...." into team discussions',
		name: 'performance_optimization',
		type: '',
	},
	{
		label: 'Raw SQL queries because "ORMs are for wimps"',
		name: 'database_design_management',
		type: '',
	},
	{
		label: 'Can solve anything with enough time and Stack Overflow',
		name: 'debugging',
		type: '',
	},
	{
		label: 'Cleanup and Refactoring Enthusiast',
		name: 'cleanup_refactoring',
		type: '',
	},
	{
		label: "No, I'm kidding. Click here and give me your strengths",
		name: 'other_strengths',
		type: '',
	},
]

const tools = [
	{
		label: 'NextJS',
		name: 'nextjs',
	},
	{
		label: 'React (General)',
		name: 'react',
	},
	{
		label: 'TypeScript',
		name: 'typescript',
	},
	{
		label: 'TailwindCSS',
		name: 'tailwindcss',
	},
	{
		label: 'SASS/SCSS',
		name: 'sass_scss',
	},
	{
		label: 'tRPC',
		name: 'trpc',
	},
	{
		label: 'Zod',
		name: 'zod',
	},
	{
		label: 'Prisma ORM',
		name: 'prisma',
	},
	{
		label: 'Other ORM',
		name: 'other_orm',
	},
	{
		label: 'SQL (General)',
		name: 'sql_general',
	},
	{
		label: 'NextAuth/AuthJS/BetterAuth',
		name: 'authjs',
	},
	{
		label: 'Other Auth Library',
		name: 'other_auth_library',
	},
]

export const ProgrammerCohesion = () => {
	return (
		<Cohesion
			description={
				"Nobody enjoys that one guy Ted who insists on using Comic Sans as his default font in his IDE because 'it’s more readable.' and swears that AI is the reason he can't get a job. Let's make sure you're not Ted."
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
					When building applications, what are your top priorities? (e.g., performance, scalability,
					maintainability, user experience, security, etc.)
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
					What apps or websites you feel are doing well balancing accessibility with performance and
					modern web technologies?
				</Description>
				<Textarea name='cohesion_inspo' />
			</Field>
		</Cohesion>
	)
}
