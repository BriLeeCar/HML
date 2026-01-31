import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import process from 'process'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { S3StorageConfig } from '@/_payload/R2S3StorageConfig'
import { allCollections } from './allCollections'
import RichTextBlock from './blocks/RichTextBlock/config'
import SectionBlock from './blocks/SectionBlock/config'
import tSectionHeadingBlock from './blocks/SectionHeadingBlock/config'
import { ToggleListBlock } from './blocks/ToggleListBlock/config'
import { ToggleListItemBlock } from './blocks/ToggleListItemBlock/config'
import { BannerGlobalConfig } from './globals/Banner/config'
import { pageLexical } from './lexical/pageEditor'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const baseDir = process.cwd()

const config = buildConfig({
	admin: {
		autoLogin: {
			email: 'test@test.com',
			password: 'test',
			username: 'Bri',
		},
		user: 'users',
		importMap: {
			autoGenerate: true,
			baseDir: path.resolve(dirname),
		},
		theme: undefined,
	},
	collections: allCollections,
	editor: pageLexical,
	secret: process.env.PAYLOAD_SECRET || '',
	typescript: {
		outputFile: path.resolve(baseDir, '@types', 'payload-types.ts'),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URL || '',
		},
		generateSchemaOutputFile: path.resolve(baseDir, 'src', '_drizzle', 'schema.ts'),
	}),
	blocks: [ToggleListBlock, ToggleListItemBlock, SectionBlock, RichTextBlock, tSectionHeadingBlock],
	globals: [BannerGlobalConfig],
	sharp,
	plugins: [s3Storage(S3StorageConfig)],
})

export const collections = (await config).collections.map(c => c.slug)

export default config
