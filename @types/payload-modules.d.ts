import type {
	ClientFieldBase,
	CollectionConfig,
	CollectionSlug,
	Field,
	FileData,
	ImageSize,
	PayloadRequest,
	TextFieldClient,
	TextFieldValidation,
	TypeWithID,
	UploadCollectionSlug,
} from 'payload'

declare module 'payload' {
	interface CollectionCustom extends Record<string, any> {
		group?: CollectionSlug
		parent?: CollectionSlug
	}

	export type GenerateFileURL = (args: {
		collection: CollectionConfig
		filename: string
		prefix?: string
		size?: ImageSize
	}) => Promise<string> | string

	export type FieldRef<T, F extends keyof T> = Exclude<
		Exclude<T, null | undefined>[F],
		null | undefined
	>

	export type TextFieldClientProps<
		T extends GeneratedTypes['collections'][keyof GeneratedTypes['collections']],
		F extends keyof T,
	> = ClientFieldBase<TextFieldClientWithoutType>
		& Omit<TextFieldBaseClientProps, 'path'> & {
			readonly path: F
		}

	export type MarkOptional<Type, Keys extends keyof Type> =
		Type extends Type ? Omit<Type, Keys> & Partial<Pick<Type, Keys>> : never

	type TextFieldClientWithoutType = MarkOptional<TextFieldClient, 'type'>

	type TextFieldBaseClientProps = {
		readonly inputRef?: React.RefObject<HTMLInputElement>
		readonly onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
		readonly path: string
		readonly validate?: TextFieldValidation
	}

	type TextFieldClientProps<F> = ClientFieldBase<TextFieldClientWithoutType>
		& TextFieldBaseClientProps
}

declare module '@payloadcms/storage-s3' {
	export type CollectionsConfig = Partial<
		Record<
			UploadCollectionSlug,
			| ({
					signedDownloads?: SignedDownloadsConfig
			  } & Omit<CollectionOptions, 'adapter'>)
			| true
		>
	>

	export type SignedDownloadsConfig =
		| {
				/** @default 7200 */
				expiresIn?: number
				shouldUseSignedURL?(args: {
					collection: CollectionConfig
					filename: string
					req: PayloadRequest
				}): boolean | Promise<boolean>
		  }
		| boolean

	interface CollectionOptions extends Record<string, any> {
		adapter: Adapter | null
		disableLocalStorage?: boolean
		disablePayloadAccessControl?: true
		generateFileURL?: GenerateURL
		prefix?: string
	}

	export type Adapter = (args: {
		collection: CollectionConfig
		prefix?: string
	}) => GeneratedAdapter

	export interface GeneratedAdapter {
		clientUploads?: ClientUploadsConfig
		/**
		 * Additional fields to be injected into the base collection and image sizes
		 */
		fields?: Field[]
		/**
		 * Generates the public URL for a file
		 */
		generateURL?: GenerateURL
		handleDelete: HandleDelete
		handleUpload: HandleUpload
		name: string
		onInit?: () => void
		staticHandler: StaticHandler
	}

	export type ClientUploadsAccess = (args: {
		collectionSlug: UploadCollectionSlug
		req: PayloadRequest
	}) => boolean | Promise<boolean>

	export type ClientUploadsConfig =
		| {
				access?: ClientUploadsAccess
		  }
		| boolean

	export type HandleUpload = (args: {
		clientUploadContext: unknown
		collection: CollectionConfig
		data: any
		file: File
		req: PayloadRequest
	}) =>
		| Partial<FileData & TypeWithID>
		| Promise<Partial<FileData & TypeWithID>>
		| Promise<void>
		| void

	export interface TypeWithPrefix {
		prefix?: string
	}

	export type HandleDelete = (args: {
		collection: CollectionConfig
		doc: FileData & TypeWithID & TypeWithPrefix
		filename: string
		req: PayloadRequest
	}) => Promise<void> | void

	export type GenerateURL = (args: {
		collection: CollectionConfig
		data: any
		filename: string
		prefix?: string
	}) => Promise<string> | string

	export type StaticHandler = (
		req: PayloadRequest,
		args: {
			doc?: TypeWithID
			headers?: Headers
			params: {
				clientUploadContext?: unknown
				collection: string
				filename: string
			}
		}
	) => Promise<Response> | Response
}

export {}
