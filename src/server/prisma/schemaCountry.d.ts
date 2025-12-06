import type * as P from '@prisma/client'

namespace QueryTables {
	type Country = P.Country
	type Currency = P.Currency
	type Language = P.Language
	type Documents = P.Documents
	type Pathway = P.Pathway
	type User = P.User
	type UserKey = P.UserKey
	type Role = P.Roles

	type CountryRelationKeys = keyof Omit<
		P.Prisma.CountryOrderByWithRelationInput,
		keyof QueryTables.Country
	>
}
