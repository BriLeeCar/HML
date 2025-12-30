import { Form, Section } from '@/admin/_components'
import { Field, Input, Label } from '@/admin/_components/catalyst'
import { LayoutWrapper } from '@/admin/_components/client'
import { Background } from './_components/Background'
import { SubmitButton } from './_components/BtnSubmit'
import { Collaboration } from './_components/Collaboration'
import { Designer } from './_components/Designer'
import { Programmer } from './_components/Programmer'
import { fetchData } from './fetchData'

export type User = {
	name: string
	id: string
	role: AnySafe
}

const JoinPage = async ({ searchParams }: PageProps<'/join'>) => {
	const { id: urlID, practical } = (await searchParams) as {
		id?: string
		practical?: string
	}

	const applicant = await fetchData({ urlID })
	if (applicant == null || applicant.length != 1) {
		return (
			<LayoutWrapper
				subtitle='UX, UI, Design, & Programming Roles'
				title='Join Our Team'>
				<Section className='mx-auto w-full max-w-2xl'>
					<p className='py-12 text-center text-lg'>
						We could not find an application matching the provided ID. Please double-check the link
						and try again.
					</p>
				</Section>
			</LayoutWrapper>
		)
	}

	const name = applicant[0].name
	const role = applicant[0].role

	const isUIUX = role.key == 'ui' || role.key == 'ux'

	return (
		<LayoutWrapper
			subtitle='UX, UI, Design, & Programming Roles'
			title='Join Our Team'>
			<Section className='mx-auto w-full max-w-2xl'>
				<Form className='group mt-0 gap-18 pt-0'>
					{practical == undefined && (
						<>
							<Background
								name={name}
								role={role}
							/>
							<Collaboration />
						</>
					)}
					{isUIUX && <Designer practical={practical} />}
					{!isUIUX && <Programmer practical={practical} />}
					{practical != undefined && (
						<>
							<Field>
								<Label>Link to Practical</Label>
								<Input name='practical' />
							</Field>
						</>
					)}
					<SubmitButton />
				</Form>
			</Section>
		</LayoutWrapper>
	)
}

export default JoinPage
