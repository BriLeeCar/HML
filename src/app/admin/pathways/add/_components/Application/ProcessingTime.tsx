import type { ElPrismaProps } from '@/admin/pathways/_lib/types'
import { DurationGroup } from '../..'

export const ProcessingTime = ({ data, handlePrisma }: ElPrismaProps) => {
	return (
		<DurationGroup
			data={data}
			handlePrisma={handlePrisma}
			fieldKey='processTime'
			description='From application submission to decision, how long does it typically take to process this visa/pathway?'
			legend='Processing Time'
		/>
	)
}
