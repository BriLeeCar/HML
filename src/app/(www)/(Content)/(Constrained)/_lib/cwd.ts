export const currentPath = () => {
	if (typeof window === 'undefined') return '/'
	else return window.location.pathname
}
