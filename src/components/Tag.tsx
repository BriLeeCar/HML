import { Badge, tBadgeColors } from './Badge'

const tagGroups = {
	politics: ['politics', 'political', 'government', 'policy', 'law'],
	social: [
		'social',
		'cultural',
		'society',
		'community',
		'social issues',
	],
	economic: [
		'economic',
		'finance',
		'business',
		'trade',
		'market',
		'economy',
		'financial',
	],
	environmental: [
		'environmental',
		'environment',
		'ecological',
		'nature',
		'sustainability',
		'climate',
		'climate change',
	],
	technological: [
		'technological',
		'technology',
		'tech',
		'ai',
		'chat gpt',
	],
	health: [
		'health',
		'healthcare',
		'medicine',
		'wellness',
		'medical',
		'covid',
		'pandemic',
		'cdc',
	],
	educational: [
		'educational',
		'education',
		'learning',
		'school',
		'university',
		'department of education',
	],
	historical: [
		'historical',
		'history',
		'historical events',
		'historical context',
	],
	religion: ['religion'],
}

export const Tag = ({
	tag,
	...props
}: Props<typeof Badge> & {
	tag: string
}) => {
	const tagType = (): tBadgeColors => {
		const fromTagGroup = Object.entries(tagGroups).find(([, tags]) =>
			tags.includes(tag.toLowerCase())
		)

		switch (fromTagGroup?.[0]) {
			case 'politics':
				return 'red'
			case 'social':
				return 'blue'
			case 'economic':
				return 'green'
			case 'environmental':
				return 'teal'
			case 'technological':
				return 'purple'
			case 'health':
				return 'yellow'
			case 'educational':
				return 'indigo'
			case 'historical':
				return 'orange'
			case 'religion':
				return 'emerald'
			default:
				return 'zinc'
		}
	}

	return (
		<Badge
			{...props}
			color={tagType() ?? 'zinc'}
			className='data-[as=button]:px-2 data-[as=button]:py-1 data-[as=button]:text-sm'
			as={props.as || 'span'}>
			{tag}
		</Badge>
	)
}
