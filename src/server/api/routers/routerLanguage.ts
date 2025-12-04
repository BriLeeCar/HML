import z from 'zod/v4'
import { createTRPCRouter } from '../trpc'

export type zLanguage = z.infer<typeof schemaLanguage>
export const schemaLanguage = z.object({
	code: z.string(),
	name: z.string(),
})

export type zCountryLanguage = z.infer<typeof schemaCountryLanguage>
export const schemaCountryLanguage = z.object({
	language: schemaLanguage,
})

export type zCountryLangugeRelation = z.infer<typeof transformCountryLanguage>
export const transformCountryLanguage = z.transform<zCountryLanguage, zLanguage>(cc => cc.language)

export const LanguageRouter = createTRPCRouter({})
