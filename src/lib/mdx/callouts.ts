import type { CalloutConfig, PropsConfig } from 'rehype-callouts'
import { cn } from '../cn'

const calloutVariants = [
	{
		key: 'document',
		title: 'Document',
		indicator:
			'<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="currentColor" viewBox="0 0 24 24"><path d="M18.97 7.37a.6.6 0 0 0-.12-.23l-4-4a.46.46 0 0 0-.23-.12c-.02 0-.04 0-.06-.01-.02 0-.04-.01-.07-.01h-6c-1.93 0-3.5 1.57-3.5 3.5v11c0 1.93 1.57 3.5 3.5 3.5h7c1.93 0 3.5-1.57 3.5-3.5v-10s0-.04-.01-.06c0-.02 0-.04-.01-.06ZM15.5 20h-7A2.5 2.5 0 0 1 6 17.5v-11A2.5 2.5 0 0 1 8.5 4H14v2c0 1.1.9 2 2 2h2v9.5a2.5 2.5 0 0 1-2.5 2.5"></path><path d="M15.5 10h-7c-.28 0-.5.22-.5.5s.22.5.5.5h7c.28 0 .5-.22.5-.5s-.22-.5-.5-.5M15.5 13h-7c-.28 0-.5.22-.5.5s.22.5.5.5h7c.28 0 .5-.22.5-.5s-.22-.5-.5-.5M15.5 16h-7c-.28 0-.5.22-.5.5s.22.5.5.5h7c.28 0 .5-.22.5-.5s-.22-.5-.5-.5M8.5 8h3c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-3c-.28 0-.5.22-.5.5s.22.5.5.5"></path></svg>',
		props: {
			container: 'bg-foreground/8 rounded-lg py-1 w-full',
			titleText:
				'*:text-sm font-semibold *:decoration-1! *:decoration-red-500! hover:text-muted-foreground italic tracking-wide',
			titleIcon: '*:size-5 text-red-500',
			titleContainer: 'flex gap-2 items-center px-4',
		},
	},
	{
		key: 'important',
		title: 'Important',
		indicator:
			'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>',
	},
	{
		key: 'empty',
		title: '',
		indicator: '',
	},
	{
		key: 'todo',
		title: 'To Do',
		indicator:
			'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-todo-icon lucide-list-todo"><rect x="3" y="5" width="6" height="6" rx="1"/><path d="m3 17 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg>',
	},
	{
		key: 'intro',
		title: '',
		indicator: '',
	},
]

const processConfigs = () => {
	const configs: Record<string, CalloutConfig> = {}
	for (const variant of calloutVariants) {
		configs[variant.key] = {
			title: variant.title,
			indicator: variant.indicator,
		}
	}
	return configs
}

export const customCallouts: Record<string, CalloutConfig> =
	processConfigs()

const processProps = (
	key: 'container' | 'titleText' | 'titleIcon' | 'titleContainer',
	type: (typeof calloutVariants)[number]['key']
) => {
	const variantsWithProps = calloutVariants.filter(
		(v) => v.props && v.props[key]
	)

	if (variantsWithProps.find((v) => v.key == type)) {
		return {
			className: cn(
				// 'callout-title-text',
				variantsWithProps.find((v) => v.key == type)?.props?.[key]
			),
		}
	} else {
		return null
	}
}

export const calloutProps: Record<'props', PropsConfig> = {
	props: {
		containerProps(_, type) {
			const props = processProps('container', type)
			return props
		},
		titleTextProps(_, type) {
			const props = processProps('titleText', type)
			return props
		},
		titleIconProps(_, type) {
			const props = processProps('titleIcon', type)
			return props
		},
		titleProps(_, type) {
			const props = processProps('titleContainer', type)
			return props
		},
	},
}
