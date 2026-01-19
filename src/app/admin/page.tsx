import db from '~/server/prisma/db'
import { SupportToggle } from './_components/SupportToggle'
import { verifyAdmin } from './_lib/verify'

export default async function AdminPage() {
	const isAdmin = await verifyAdmin()
	const supportForm = await db.settings.findUnique({
		where: {
			key: 'contact-form',
		},
	})

	if (supportForm && isAdmin) {
		return (
			<>
				<SupportToggle status={supportForm.value} />
			</>
		)
	}
	return <div></div>
}
