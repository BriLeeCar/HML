import z from 'zod/v4'
import { createTRPCRouter } from '../trpc'

type zLanguage = z.infer<typeof schemaLanguage>
const schemaLanguage = z.object({
	code: z.string(),
	name: z.string(),
})

type zCountryLanguage = z.infer<typeof schemaCountryLanguage>
export const schemaCountryLanguage = z.object({
	language: schemaLanguage,
})

export const transformCountryLanguage = z.transform<zCountryLanguage, zLanguage>(cc => cc.language)

export const LanguageRouter = createTRPCRouter({})
