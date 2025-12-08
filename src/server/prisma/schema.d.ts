import type P from '@prisma/client'

// type MinMaxNote = {
// 	min: number
// 	max: number
// 	note: string | null
// }

// type PathwayBase = Omit<PrismaPackage.Pathway, 'duration' | 'processTime' | 'renewal'>

declare global {
	namespace PrismaSchema {
		type CountryModel = P.Country
		type PathwayModel = P.Pathway
		type PathwayTypeEnum = P.PathwayType
		type PathwayDocumentsModel = P.PathwayDocuments
		type CurrencyModel = P.Currency
		type LanguageModel = P.Language
		type DocumentModel = P.Documents
		type UserModel = P.User
	}
}
