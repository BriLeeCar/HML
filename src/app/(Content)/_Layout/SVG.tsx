import { cn } from '~/cn'

// #region ? ICONS
export const X = ({ ...props }: Props<'svg'>) => {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='32'
			height='32'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<path d='M18 6L6 18' />
			<path d='M6 6l12 12' />
		</svg>
	)
}

export const Menu = ({ ...props }) => {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='32'
			height='32'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			stroke-width='1'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<path d='M4 6l16 0' />
			<path d='M4 12l16 0' />
			<path d='M4 18l16 0' />
		</svg>
	)
}

export const HeartMap = ({ ...props }: Props<'svg'>) => (
	<svg
		{...props}
		xmlns='http://www.w3.org/2000/svg'
		width='32'
		height='32'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='1'
		strokeLinecap='round'
		strokeLinejoin='round'>
		<path d='M10 17.5l-1 -.5l-6 3v-13l6 -3l6 3l6 -3v7' />
		<path d='M9 4v13' />
		<path d='M15 7v4' />
		<path d='M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z' />
	</svg>
)

export const Books = ({ ...props }: Props<'svg'>) => (
	<svg
		{...props}
		xmlns='http://www.w3.org/2000/svg'
		width='32'
		height='32'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='1'
		strokeLinecap='round'
		strokeLinejoin='round'>
		<path d='M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z' />
		<path d='M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z' />
		<path d='M5 8h4' />
		<path d='M9 16h4' />
		<path d='M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z' />
		<path d='M14 9l4 -1' />
		<path d='M16 16l3.923 -.98' />
	</svg>
)

export const Certificate = ({ ...props }: Props<'svg'>) => (
	<svg
		{...props}
		xmlns='http://www.w3.org/2000/svg'
		width='32'
		height='32'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='1'
		strokeLinecap='round'
		strokeLinejoin='round'>
		<path d='M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' />
		<path d='M13 17.5v4.5l2 -1.5l2 1.5v-4.5' />
		<path d='M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73' />
		<path d='M6 9l12 0' />
		<path d='M6 12l3 0' />
		<path d='M6 15l2 0' />
	</svg>
)

export const Support = ({ ...props }: Props<'svg'>) => (
	<svg
		{...props}
		xmlns='http://www.w3.org/2000/svg'
		width='32'
		height='32'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='1'
		strokeLinecap='round'
		strokeLinejoin='round'>
		<path d='M10.59 19.88a9.763 9.763 0 0 1 -2.89 -.88l-4.7 1l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c1.565 1.335 2.479 3.065 2.71 4.861' />
		<path d='M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z' />
	</svg>
)

export const Mission = ({ ...props }: Props<'svg'>) => (
	<svg
		{...props}
		xmlns='http://www.w3.org/2000/svg'
		width='32'
		height='32'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='1'
		strokeLinecap='round'
		strokeLinejoin='round'>
		<path d='M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
		<path d='M12 7a5 5 0 1 0 5 5' />
		<path d='M13 3.055a9 9 0 1 0 7.941 7.945' />
		<path d='M15 6v3h3l3 -3h-3v-3z' />
		<path d='M15 9l-3 3' />
	</svg>
)

export const PiggyBank = ({ ...props }) => {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='18'
			height='18'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.25'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<path d='M15 11v.01' />
			<path d='M5.173 8.378a3 3 0 1 1 4.656 -1.377' />
			<path d='M16 4v3.803a6.019 6.019 0 0 1 2.658 3.197h1.341a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-1.342c-.336 .95 -.907 1.8 -1.658 2.473v2.027a1.5 1.5 0 0 1 -3 0v-.583a6.04 6.04 0 0 1 -1 .083h-4a6.04 6.04 0 0 1 -1 -.083v.583a1.5 1.5 0 0 1 -3 0v-2l0 -.027a6 6 0 0 1 4 -10.473h2.5l4.5 -3h0z' />
		</svg>
	)
}

export const Confetti = ({ ...props }) => {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='18'
			height='18'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.25'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<path d='M4 5h2' />
			<path d='M5 4v2' />
			<path d='M11.5 4l-.5 2' />
			<path d='M18 5h2' />
			<path d='M19 4v2' />
			<path d='M15 9l-1 1' />
			<path d='M18 13l2 -.5' />
			<path d='M18 19h2' />
			<path d='M19 18v2' />
			<path d='M14 16.518l-6.518 -6.518l-4.39 9.58a1 1 0 0 0 1.329 1.329l9.579 -4.39z' />
		</svg>
	)
}

export const Briefcase = ({ ...props }) => {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='18'
			height='18'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.25'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<path d='M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z' />
			<path d='M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2' />
			<path d='M12 12l0 .01' />
			<path d='M3 13a20 20 0 0 0 18 0' />
		</svg>
	)
}

export const Medical = ({ ...props }) => {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='18'
			height='18'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.25'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<path d='M13 3a1 1 0 0 1 1 1v4.535l3.928 -2.267a1 1 0 0 1 1.366 .366l1 1.732a1 1 0 0 1 -.366 1.366l-3.927 2.268l3.927 2.269a1 1 0 0 1 .366 1.366l-1 1.732a1 1 0 0 1 -1.366 .366l-3.928 -2.269v4.536a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-4.536l-3.928 2.268a1 1 0 0 1 -1.366 -.366l-1 -1.732a1 1 0 0 1 .366 -1.366l3.927 -2.268l-3.927 -2.268a1 1 0 0 1 -.366 -1.366l1 -1.732a1 1 0 0 1 1.366 -.366l3.928 2.267v-4.535a1 1 0 0 1 1 -1h2z' />
		</svg>
	)
}

export const Home = ({ ...props }) => {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='18'
			height='18'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.25'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<path d='M5 12l-2 0l9 -9l9 9l-2 0' />
			<path d='M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7' />
			<path d='M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6' />
		</svg>
	)
}

export const Pathways = ({ ...props }) => {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='18'
			height='18'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.25'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<path d='M14.5 6.5l3 -2.9a2.05 2.05 0 0 1 2.9 2.9l-2.9 3l2.5 7.5l-2.5 2.55l-3.5 -6.55l-3 3v3l-2 2l-1.5 -4.5l-4.5 -1.5l2 -2h3l3 -3l-6.5 -3.5l2.5 -2.5l7.5 2.5z' />
		</svg>
	)
}

export const Basics = ({ ...props }) => {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='18'
			height='18'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.25'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<path d='M9 6l11 0' />
			<path d='M9 12l11 0' />
			<path d='M9 18l11 0' />
			<path d='M5 6l0 .01' />
			<path d='M5 12l0 .01' />
			<path d='M5 18l0 .01' />
		</svg>
	)
}
// #endregion ?

// #region ? LOGO
export const HML = ({ ...props }: Props<'span'>) => {
	return (
		<span
			{...props}
			className={cn(props.className)}>
			<svg
				width='39'
				height='34'
				viewBox='0 0 39 34'
				fill='currentColor'
				xmlns='http://www.w3.org/2000/svg'>
				<path d='M34.9926 6.22765H27.4388V2.25298C27.4388 1.01986 26.4384 0.0194092 25.2052 0.0194092H13.3859C12.1528 0.0194092 11.1524 1.01986 11.1524 2.25298V6.22765H3.59856C1.60541 6.22765 -0.0077276 7.84466 2.78476e-05 9.83781L0.0659492 30.3975C0.0659492 30.7581 0.124115 31.1071 0.221058 31.4367C3.82346 30.5487 7.13892 28.7534 10.1674 26.6633C10.2333 26.5741 9.69822 26.0932 9.60515 26.0118C8.7094 25.2479 7.51894 24.6662 6.62318 23.8713C6.55726 23.7744 6.56114 23.689 6.62318 23.5882C6.66196 23.5262 7.70895 22.739 7.79426 22.708C7.99202 22.6343 8.08121 22.6498 8.27897 22.677C9.53148 22.8515 11.0748 23.5999 12.3312 23.7511C12.4708 23.7666 12.6065 23.8015 12.75 23.755C14.2158 22.6963 15.7746 21.6843 17.1822 20.552C17.4382 20.3464 18.3068 19.7609 18.1051 19.4119L8.11611 13.068C7.9959 12.909 8.24407 12.7461 8.35265 12.6453C8.7443 12.273 9.56638 11.5905 10.1286 11.8038L24.3095 15.4799C24.5266 15.4528 24.6934 15.3093 24.8756 15.2085C26.9968 14.018 29.0519 12.1063 31.1847 10.9081C32.0068 10.4466 32.8366 10.1131 33.806 10.1829C35.1632 10.276 35.2563 10.9585 34.7716 12.0753C33.7905 14.3243 29.114 16.4842 27.1635 18.1478C26.9929 18.2913 26.8223 18.4347 26.7331 18.648C26.4733 21.8937 26.2057 25.1393 25.9498 28.3811C25.8916 29.1256 25.9265 29.9671 25.8567 30.7077C25.8218 31.0645 25.7598 31.8904 25.6473 32.1735C25.5426 32.4372 24.3754 33.3291 24.1195 33.3485C23.9489 33.364 23.8791 33.1429 23.8209 33.0227C22.4404 30.0563 21.9635 25.8722 20.7846 22.7506C20.7381 22.6149 20.6838 22.4792 20.5132 22.4753C20.234 22.4676 18.6635 23.4796 18.2913 23.7007C16.9961 24.4685 15.7164 25.275 14.4562 26.1049C14.2158 26.4539 14.2662 28.2027 14.2196 28.7534C14.1731 29.3622 14.1111 29.9903 14.0103 30.5914C13.9327 30.7814 12.5561 31.7586 12.4514 31.6849L10.9158 27.6831L2.69117 33.8448C3.00139 33.934 3.32712 33.9805 3.66836 33.9805H34.9965C36.9858 33.9805 38.595 32.3674 38.595 30.382V9.8223C38.595 7.83303 36.9819 6.22377 34.9965 6.22377L34.9926 6.22765ZM25.4999 6.22765H13.0912V4.09878C13.0912 3.16425 13.8474 2.41197 14.778 2.41197H23.8093C24.7438 2.41197 25.4961 3.16812 25.4961 4.09878V6.22765H25.4999Z' />
			</svg>
			<span>HML</span>
		</span>
	)
}
// #endregion ?
