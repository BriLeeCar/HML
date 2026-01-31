import type { Block, TextField } from 'payload'

const textfield = ({ ...props }: Omit<TextField, 'type'>) =>
	({
		type: 'text',
		label: false,
		...props,
	}) as TextField

const CTABlock: Block = {
	slug: 'call-to-action',
	interfaceName: 'CTABlock',
	admin: {
		group: 'Element',
	},
	fields: [
		textfield({
			name: 'headline',
		}),
	],
}

export default CTABlock
