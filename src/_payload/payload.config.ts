import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import process from 'process'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { S3StorageConfig } from '@/_payload/R2S3StorageConfig'
import { env } from '@/env'
import { allCollections } from './allCollections'
import RichTextBlock from './blocks/RichTextBlock/config'
import SectionBlock from './blocks/SectionBlock/config'
import tSectionHeadingBlock from './blocks/SectionHeadingBlock/config'
import { ToggleListBlock } from './blocks/ToggleListBlock/config'
import { ToggleListItemBlock } from './blocks/ToggleListItemBlock/config'
import { BannerGlobalConfig } from './globals/Banner/config'
import { pageLexical } from './lexical/pageEditor'
import { TeamInfoWidget } from './widgets/TeamInfo/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const baseDir = process.cwd()

const config = buildConfig({
	blocks: [ToggleListBlock, ToggleListItemBlock, SectionBlock, RichTextBlock, tSectionHeadingBlock],
	globals: [BannerGlobalConfig],
	plugins: [s3Storage(S3StorageConfig)],
	folders: {
		browseByFolder: false,
	},
	admin: {
		dashboard: {
			widgets: [TeamInfoWidget],
		},
		...(env.NODE_ENV == 'production' ?
			{}
		:	{
				autoLogin: {
					password: 'mySecretPassword',
					username: 'Bri',
				},
			}),
		user: 'users',
		importMap: {
			autoGenerate: true,
			baseDir: path.resolve(dirname),
		},
		theme: undefined,
		components: {
			beforeDashboard: ['@/components/BeforeDashboard'],
			graphics: {
				Icon: '@/views/Logo/TopBarLogo',
			},
			beforeNavLinks: ['@/views/Logo'],
			views: {
				hubs: {
					Component: '@/views/Hubs',
					path: '/hub',
				},
			},
			afterNavLinks: ['@/views/Logo'],
		},
	},

	editor: pageLexical,
	collections: allCollections,
	secret: process.env.PAYLOAD_SECRET || '',
	typescript: {
		outputFile: path.resolve(baseDir, '@types', 'payload-types.ts'),
	},
	db: postgresAdapter({
		schemaName: process.env.DATABASE_SCHEMA || 'payload',
		pool: {
			connectionString: process.env.DATABASE_URL || '',
		},
		generateSchemaOutputFile: path.resolve(baseDir, 'src', '_drizzle', 'schema.ts'),
	}),
	sharp,
})

export const collections = (await config).collections.map(c => c.slug)

export default config
