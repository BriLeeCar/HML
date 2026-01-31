import { cn } from '@/lib/cn'
import type { DefaultCellComponentProps, DefaultServerCellComponentProps } from 'payload'

const StatusCell = ({ cellData }: DefaultServerCellComponentProps | DefaultCellComponentProps) => {
	const baseClass = 'text-xs italic'

	return cellData == true ?
			<span className={cn(baseClass, 'text-emerald-500')}>Published</span>
		:	<em className={cn(baseClass, 'text-amber-500')}>Draft</em>
}

export default StatusCell
