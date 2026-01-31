import { env } from '@/env'
import type { CollectionsConfig, S3StorageOptions } from '@payloadcms/storage-s3'

const CollectionMediaKeys = {
	media: true,
} as CollectionsConfig

const BucketCredentials = (folder?: string) =>
	({
		bucket: env.R2_BUCKET,
		config: {
			endpoint: `https://${env.R2_ACCT}.r2.cloudflarestorage.com${folder ? `/${folder}` : ''}`,
			credentials: {
				accessKeyId: env.R2_ACCESS_KEY_ID,
				secretAccessKey: env.R2_SECRET_KEY,
			},
			region: 'auto',
		},
	}) as Record<string, S3StorageOptions['config' | 'bucket']>

export const S3StorageConfig = {
	collections: CollectionMediaKeys,
	disableLocalStorage: true,
	...BucketCredentials(),
} as S3StorageOptions
