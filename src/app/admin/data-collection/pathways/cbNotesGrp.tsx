import { Dispatch, SetStateAction } from 'react'
import { CB } from './Form'
import { tPathwayForm } from './schema'

export const CBNotesGrp = ({
	setPathway,
	pathway,
	label,
	schemaKey,
	...props
}: {
	setPathway: Dispatch<SetStateAction<tPathwayForm>>
	pathway: tPathwayForm
	label: string

	schemaKey:
		| 'potentialResidencyPathway'
		| 'potentialCitizenshipPathway'
		| 'reunificationIsPossible'
		| 'hasRestrictions'
} & Props<'input'>) => {
	return (
		<CB
			{...props}
			schemaKey={schemaKey}
			id={schemaKey}
			label={label}
			pathway={pathway}
			setPathway={setPathway}>
			{props.children}
		</CB>
	)
}
