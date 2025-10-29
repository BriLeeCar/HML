import { CTA, InlineLink } from '~/components'

export const OnHold = ({ reason }: { reason?: string }) => {
	return (
		<CTA
			subtitle={
				<>
					We are so grateful for the outpouring of support and
					interest we have received. At this time, our Support Team is
					at capacity and we are not accepting new requests for
					assistance.
					{reason && (
						<>
							<br />
							<br />
							{reason}
						</>
					)}
					<br />
					<br />
					In the meantime, please join our{' '}
					<InlineLink href='https://discord.gg/TcHKRgED6y'>
						Discord community
					</InlineLink>{' '}
					to connect with others and explore our Guides & Resources .
				</>
			}
			primaryAction={{
				href: 'https://discord.gg/TcHKRgED6y',
				label: 'Join Our Discord',
			}}
			secondaryAction={{
				href: '/guides-resources',
				label: 'Explore Resources',
			}}>
			<em>Support Requests On Hold</em>
		</CTA>
	)
}
