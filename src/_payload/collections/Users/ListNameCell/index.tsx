import { toTitleCase } from '@/lib/toTitleCase'
import type { User } from '@/payload-types'
import Link from 'next/link'
import type { DefaultCellComponentProps, TextFieldClient } from 'payload'

const ListNameCell = ({
	rowData,
}: DefaultCellComponentProps<TextFieldClient, User['username']>) => {
	const { firstName, username, id } = rowData
	return <Link href={`/admin/collections/users/${id}`}>{toTitleCase(firstName ?? username)}</Link>
}

export default ListNameCell
