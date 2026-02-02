import { Icon } from '@/components/Icon'
import { InlineLink } from '@/components/Text'
import type { DefaultCellComponentProps, TextFieldClient } from 'payload'

const PathCell = ({ cellData, rowData }: DefaultCellComponentProps<TextFieldClient>) => {
	return rowData.status == true ?
			<InlineLink
				href={`/${cellData}`}
				className='italic text-sm'>
				<Icon
					IconName='BinocularIcon'
					className='size-4 opacity-75 mr-2'
					solid
				/>{' '}
				/{cellData}
			</InlineLink>
		:	<span className='italic opacity-75 text-sm flex items-center pl-4.5'>/{cellData}</span>
}

export default PathCell
