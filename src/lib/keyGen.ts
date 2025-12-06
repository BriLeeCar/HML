export const generateKey = () => {
	const chars = []
	for (let i = 65, j = 0; i <= 90; i++, j++) {
		chars.push(String.fromCharCode(i))
		if (j <= 9) {
			chars.push(j.toString())
		}
	}
	for (let i = 5; i > 0; i--) {
		chars.sort(() => Math.random() - 0.5)
	}

	return chars.slice(0, 14).join('')
}
