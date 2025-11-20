export { Button, Error } from '@/data-collection/_components/Form'
export { Page, PageHeading, Section, SectionHeading, SubSection } from '~/components'

export {
	Combobox,
	ComboboxDescription,
	ComboboxLabel,
	ComboboxOption,
} from '@/data-collection/_components/combobox'

export * from '@/data-collection/_components/fieldset'

export { Input } from '@/data-collection/_components/input'
export { Select } from '@/data-collection/_components/select'
export { Strong, Text } from '@/data-collection/_components/text'
export { Textarea } from '@/data-collection/_components/textarea'

export { Checkbox, CheckboxField, CheckboxGroup } from '@/data-collection/_components/checkbox'

export { Form } from '@/data-collection/pathways/Form'
export * from '@/data-collection/pathways/reducer'

export const errors = {
	minGtMax: 'Max must be greater than or equal to Min',
	negative: 'Must be a non-negative number',
	noMaxWOutMin: 'Must provide a Min value when Max is provided',
	wholeNumber: 'Must be a whole number',
}

export const colors = {
	brand: {
		red: '#AC162B',
		mulberry: '#7A2235',
		grey: '#E9EDF3',
		yellow: '#DAE638',
		purple: '#47274E',
		slate: '#222D30',
	},
	red: {
		'900': '#2D060B',
		'700': '#680D1A',
		'500': '#AC162B',
		'300': '#E9586D',
		'100': '#F39BA8',
		'50': '#FBDFE3',
	},
	mulberry: {
		'900': '#250E11',
		'700': '#552027',
		'500': '#7A2235',
		'300': '#B7576C',
		'100': '#DBB3BC',
		'50': '#F2E8EA',
	},
	yellow: {
		'900': '#222404',
		'700': '#5A5F0C',
		'500': '#A2AC15',
		'300': '#DAE638',
		'100': '#F0F4A8',
		'50': '#F9FBE1',
	},
	purple: {
		'900': '#261A28',
		'800': '#361F36',
		'700': '#47274E',
		'500': '#74447E',
		'300': '#AE8BB6',
		'100': '#CCBDD0',
		'50': '#F0EBF1',
	},
	slate: {
		'900': '#161B1D',
		'700': '#222D30',
		'500': '#42585E',
		'300': '#81989E',
		'100': '#D4DADC',
		'50': '#EDF1F2',
	},
	grey: {
		'900': '#131416',
		'600': '#2A2E34',
		'400': '#5E646E',
		'200': '#A8B0BC',
		'50': '#E9EDF3',
	},
}
