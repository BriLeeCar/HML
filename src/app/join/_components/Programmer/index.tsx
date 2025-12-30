import { ProgrammerCohesion } from './Cohesion'
import { ProgammingPracticalCheck } from './Practical'

export const Programmer = ({ practical }: { practical?: string }) => {
	return practical == undefined ? <ProgrammerCohesion /> : <ProgammingPracticalCheck />
}
