'use client'
import { useState, type ReactNode } from 'react'
import { Toast } from '~/components/Toast'

export type ToastTypes = 'error' | 'success' | 'warning' | 'info'

type InternalNotification = {
	display: boolean
	status: ToastTypes
	body: ReactNode
	title?: string
}

export type ToastMessage = {
	title: string
	status: ToastTypes
	body: ReactNode
}

export const useToast = (defaultVisible?: boolean) => {
	const [notification, setNotification] = useState<InternalNotification>({
		display: defaultVisible ?? false,
		status: 'success',
		body: '',
		title: undefined,
	})

	const closeNotify = () => {
		setNotification({ ...notification, display: false })
	}

	const handleShowTime = ({
		title,
		body,
		status,
		displayTime = 3000,
	}: Omit<InternalNotification, 'display'> & {
		displayTime?: number
	}) => {
		setTimeout(() => {
			closeNotify()
		}, displayTime)

		setNotification({
			...notification,
			title,
			body,
			status,
			display: true,
		})
	}

	return {
		El: ({ ...props }: Props<'div'>) => (
			<Toast
				{...props}
				title={notification?.title}
				body={notification?.body}
				type={notification?.status}
				show={notification?.display}
				closeNotify={closeNotify}
			/>
		),
		fireToast: handleShowTime,
		show: notification.display,
	}
}
