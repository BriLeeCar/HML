export const RowLabelComponent = (props: { defaultTitle: string }) => ({
	path: '@/fields/RowLabelField/RowLabel',
	clientProps: {
		defaultTitle: props.defaultTitle,
	},
})
