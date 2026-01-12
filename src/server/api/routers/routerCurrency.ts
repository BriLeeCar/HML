import z from 'zod/v4'
import { createTRPCRouter } from '../trpc'

type zCurrency = z.infer<typeof schemaCurrency>
export const schemaCurrency = z.object({
	code: z.string(),
	name: z.string(),
	symbol: z.string(),
})

type zCountryCurrency = z.infer<typeof schemaCountryCurrency>
export const schemaCountryCurrency = z.object({
	currency: schemaCurrency,
})

export const transformCountryCurrency = z.transform<zCountryCurrency, zCurrency>(cc => cc.currency)

export const CurrencyRouter = createTRPCRouter({})
