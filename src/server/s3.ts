// SERVER/S3

import {
	DeleteObjectCommand,
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { env } from '../env.js'

const R2 = {
	bucket: env.R2_BUCKET,
	accessKey: env.R2_ACCESS_KEY_ID,
	secretKey: env.R2_SECRET_KEY,
	accountId: env.R2_ACCT,
	token: env.R2_TOKEN,
}

const S3 = new S3Client({
	region: 'auto',
	endpoint: `https://${R2.accountId}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: R2.accessKey,
		secretAccessKey: R2.secretKey,
	},
})

export const uploadFile = async (file: Buffer, key: string) => {
	const command = new PutObjectCommand({
		Bucket: R2.bucket,
		Key: key,
		Body: file,
	})

	try {
		const res = await S3.send(command)
		return res
	} catch (err) {
		console.error('Error uploading file: ', err)
		throw err
	}
}

export const getFile = async (key: string) => {
	const command = new GetObjectCommand({
		Bucket: R2.bucket,
		Key: key,
	})
	try {
		const res = await S3.send(command)
		return res
	} catch (err) {
		console.error('Error getting file: ', err)
		throw err
	}
}

export const getSignedUrlForUpload = async (key: string, contentType: string): Promise<string> => {
	const command = new PutObjectCommand({
		Bucket: R2.bucket,
		Key: key,
		ContentType: contentType,
	})

	try {
		const signedUrl = await getSignedUrl(S3, command, {
			expiresIn: 3600,
		})
		return signedUrl
	} catch (error) {
		console.error('Error generating signed URL:', error)
		throw error
	}
}

export const deleteFile = async (key: string) => {
	const command = new DeleteObjectCommand({
		Bucket: R2.bucket,
		Key: key,
	})

	try {
		const response = await S3.send(command)
		return response
	} catch (error) {
		console.error('Error deleting file:', error)
		throw error
	}
}
