import type { TextFieldServerProps } from 'payload'
import { ParentClientField } from './Parent.client'

const ParentField = async ({ req, data, path, ...props }: TextFieldServerProps) => {
	const payload = req.payload

	const parents = await payload.find({
		collection: 'pages',
		where: {
			id: {
				not_equals: data?.id,
			},
		},
		sort: 'path',
	})

	return (
		<ParentClientField
			parents={parents.docs}
			path='parent'
			field={props.clientField}
		/>
	)
}

export default ParentField
