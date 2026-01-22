import { CTA } from '~/components/CTA'
import { InlineLink } from '~/components/Text/Link'

export const OnHold = ({ reason }: { reason?: string }) => {
	return (
		<CTA
			subtitle={
				<>
					<span>
						We are so grateful for the outpouring of support and interest we have received. At this
						time, our Support Team is at capacity and we are not accepting new requests for
						assistance.
					</span>
					{reason && <span>{reason}</span>}
					<span>
						In the meantime, please join our{' '}
						<InlineLink href='https://discord.gg/TcHKRgED6y'>Discord community</InlineLink> to
						connect with others and explore our Guides & Resources.
					</span>
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
