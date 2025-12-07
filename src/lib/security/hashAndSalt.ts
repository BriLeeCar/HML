import bcrypt from 'bcryptjs'

export const hash = async (secret: string) => {
	try {
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(secret, salt)
		return hash
	} catch (e) {
		console.error('Error hashing secret:', e)
		throw new Error('Hashing failed')
	}
}

export const verify = async (knownHash: string, enteredSecret: string) => {
	try {
		return await bcrypt.compare(enteredSecret, knownHash)
	} catch (e) {
		console.error('Error verifying secret:', e)
		return false
	}
}
