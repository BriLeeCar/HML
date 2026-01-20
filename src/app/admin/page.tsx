import db from '~/server/prisma/db'
import { SupportToggle } from './_components/SupportToggle'

export default async function AdminPage() {
	const supportForm = await db.settings.findUnique({
		where: {
			key: 'contact-form',
		},
	})

	if (supportForm) {
		return (
			<>
				<SupportToggle status={supportForm.value} />
			</>
		)
	}
	return <div></div>
}
