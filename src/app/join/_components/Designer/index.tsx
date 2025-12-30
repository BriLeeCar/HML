import { DesignerCohesion } from './Cohesion'
import { DesignPracticalCheck } from './Practical'

export const Designer = ({ practical }: { practical?: string }) => {
	if (practical == undefined) {
		return <DesignerCohesion />
	}
	return <DesignPracticalCheck />
}
