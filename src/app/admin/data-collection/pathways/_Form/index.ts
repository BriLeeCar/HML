export {
	Button,
	Error,
	ProgressBar,
} from '@/admin/data-collection/_components/Form'

export {
	Page,
	PageHeading,
	Section,
	SectionHeading,
	SubSection,
} from '~/components'

export {
	Combobox,
	ComboboxDescription,
	ComboboxLabel,
	ComboboxOption,
} from '@/admin/data-collection/_components/combobox'

export {
	Description,
	Field,
	FieldGroup,
	Fieldset,
	Label,
	Legend,
} from '@/admin/data-collection/_components/fieldset'

export {
	Checkbox,
	CheckboxField,
	CheckboxGroup,
} from '@/admin/data-collection/_components/checkbox'

export { Input } from '@/admin/data-collection/_components/input'
export { Select } from '@/admin/data-collection/_components/select'
export {
	Strong,
	Text,
} from '@/admin/data-collection/_components/text'
export { Textarea } from '@/admin/data-collection/_components/textarea'

export { Form } from '../Form'
export { pathwayReducer } from '../reducer'

export const errors = {
	minGtMax: 'Max must be greater than or equal to Min',
	negative: 'Must be a non-negative number',
	noMaxWOutMin: 'Must provide a Min value when Max is provided',
	wholeNumber: 'Must be a whole number',
}
