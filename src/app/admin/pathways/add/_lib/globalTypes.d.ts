import * as P from '@prisma/client'

declare global {
	namespace Queried {
		namespace Currency {
			type Model = P.Currency
		}
		namespace Language {
			type Model = P.Language
		}
		namespace Documents {
			type Model = P.Documents
		}
		namespace Pathway {
			type Model = Omit<P.Pathway, 'duration' | 'processTime' | 'renewal' | 'cost'> & {
				duration: {
					min: number
					max: number
					note: string
				}
				processTime: {
					min: number
					max: number
					note: string
				}
				renewal: {
					min: number
					max: number
					note: string
				}
				cost: {
					min: number
					max: number
				}
			}

			type Relations = {
				country: Country.Model
				currencies: Currency.Model[]
				languages: Language.Model[]
				documents: Documents.Model[]
			}

			type WithRelations<C extends keyof Queried.Pathway.Relations> = Queried.Pathway.Model & {
				[K in C]: Queried.Pathway.Relations[K]
			}
			type TypeEnum = P.PathwayType
		}

		namespace Country {
			type Model = P.Country

			type WithRelations = Country.Model & {
				currencies: P.Currency[]
				languages: P.Language[]
			}
		}

		namespace User {
			type Model = P.User
			type WithRelations = User.Model & {}

			type Role = P.Roles
			type UserKey = P.UserKey
		}

		namespace Models {
			type Country = P.Country
			type CountryWithRelations = Country & {
				currencies: Currency[]
				languages: Language[]
			}

			type Currency = P.Currency
			type Documents = P.Documents
			type Language = P.Language
			type Pathway = P.Pathway
		}

		namespace Columns {
			type Country = keyof Queried.Models.Country
			type Currency = keyof Queried.Models.Currency
			type Documents = keyof Queried.Models.Documents
			type Language = keyof Queried.Models.Language
			type Pathway = keyof Queried.Models.Pathway
		}
	}

	type PrismaPathwayDuration = {
		min: number
		max: number
		separate: boolean
	}

	type PrismaPathway = {
		documents: Array<Omit<P.PathwayDocuments, 'cost'> & { cost: number }>
		categories: number[]
		piplines: P.PathwayPipeline[]
		restrictedNationalities: P.PathwayRestrictedNationality[]
		name: string
		id: number
		countryCode: string
		link: string
		description: string
		type: P.PathwayType
		discordHandle: string
		createdAt: Date
		updatedAt: Date
		currencyCode: string
		cost: {
			min: number
			max: number
		}
		duration: {
			min: number
			max: number
			note: string
		}
		processTime: {
			min: number
			max: number
			note: string
		}
		renewal: {
			min: number
			max: number
			note: string
		}
		notes: { note: string; counter: number }[]
		limitations: { note: string; counter: number }[]
		requirements: { note: string; counter: number }[]
		restrictions: { note: string; counter: number }[]
		residency: string
		citizenship: string
		reunification: string
	}

	type PrismaErrors = {
		countryCode: string[]
		name: string[]
		link: string[]
		description: string[]
		cost: {
			min: string[]
			max: string[]
			base: string[]
		}
		duration: {
			min: string[]
			max: string[]
			base: string[]
		}
		processTime: {
			min: string[]
			max: string[]
			base: string[]
		}
		renewal: {
			min: string[]
			max: string[]
			base: string[]
		}
		notes: string[]
		limitations: string[]
		requirements: string[]
		restrictions: string[]
		documents: Array<string>
	}

	type PrismaTrackers = {
		counters: {
			notes: number
			limitations: number
			requirements: number
			restrictions: number
			documents: number
		}
		durations: {
			duration: PrismaPathwayDuration
			processTime: PrismaPathwayDuration
			renewal: PrismaPathwayDuration
		}
		piplines: Record<PipelineKeys, boolean>
		utilities: {
			countryData: (P.Country & { currencies: P.Currency[] }) | null
		}
	}

	type PipelineKeys = Lowercase<`${P.PathwayPipelines}`> | 'renewal'

	type Query = {
		date: Date
		query: PrismaPathway
		errors: PrismaErrors
	} & PrismaTrackers

	// #region ? CASING TYPES
	/**
	 * Converts a string to Title Case by capitalizing the first letter of each word.
	 *
	 * @template T - The input string to be converted to Title Case
	 *
	 * @returns - The input string converted to Title Case
	 *
	 * @example
	 * ```ts
	 * type Title = TitleCase<'hello world'> // Result: 'Hello World'
	 * type Title2 = TitleCase<'pathway to citizenship'> // Result: 'Pathway To Citizenship'
	 * ```
	 *
	 * @note Unused in this codebase currently but may be useful for future features, so retained.
	 */
	type TitleCase<T extends string> = Capitalize<ToTitleCase<T>>

	type IsLetter<L extends string> =
		L extends Capitalize<L> & Uncapitalize<L> ? false
		: L extends Capitalize<L> | Uncapitalize<L> ? true
		: false

	type IsCapitalized<L extends string> =
		IsLetter<L> extends true ?
			L extends Capitalize<L> ?
				' '
			:	''
		:	''

	type ToTitleCase<S extends string> =
		S extends `${infer F}${infer L}` ? `${F}${IsCapitalized<L>}${ToTitleCase<L>}` : S
	// #endregion
}

/* type CountryModel = {
	name: string;
	code: string;
};

type PathwayModel = {
	id: number;
	countryCode: string; // ! RELATION FIELD
	name: string;
	link: string;
	description: string;
	type: Enums.PathwayType;
	createdAt: Date;
	updatedAt: Date;
	currencyCode: string; // ! RELATION FIELD
	notes: string[];
	limitations: string[];
	requirements: string[];
	restrictions: string[];
	duration: ObjectTypes.DurationField | null;
	processTime: ObjectTypes.ProcessTimeField | null;
	renewal: ObjectTypes.RenewalField | null;
	cost: ObjectTypes.CostField | null;
	createdby: string; // ! RELATION FIELD
};

type PathwayModelWithRelations = PathwayModel & {
    country: CountryModel;
    currency: CurrencyModel;
    CMS_User: UserModel;
    categories: PathwayCategoriesModel[];
    documents: PathwayDocumentsModel[];
    pipeline: PathwayPipelineModel[];
    restrictedNationalities: PathwayRestrictedNationalityModel[];
}

type PathwayDocumentsModel = {
	id: number;
	pathwayId: number;
	documentId: number;
	description: string | null;
	cost: number;
	isRequired: boolean;
	link: string | null;
	title: string | null;
};

type PathwayDocumentsModelWithRelations = PathwayDocumentsModel & {
    document: DocumentsModel;
    pathway: PathwayModel;
}

type PathwayCategoriesModel = {
	pathwayId: number;
	pathwayTypeId: number;
};

type PathwayCategoriesModelWithRelations = PathwayCategoriesModel & {
    pathway: PathwayModel;
    pathwayType: PathwayTypesModel;
}

type PathwayPipelineModel = {
	id: number;
	pathwayId: number;
	pipeline: Enums.PathwayPipelineType;
	note: string | null;
};

type PathwayPipelineModelWithRelations = PathwayPipelineModel & {
    pathway: PathwayModel;
}

type PathwayRestrictedNationalityModel = {
	pathwayId: number;
	note: string | null;
	countryCode: string;
};
type PathwayRestrictedNationalityModelWithRelations = PathwayRestrictedNationalityModel & {
    pathway: PathwayModel;
    country: CountryModel;
}

type PathwayTypesModel = {
	name: string;
	id: number;
	description: string | null;
	parentId: number | null;
};

type PathwayTypesModelWithRelations = PathwayTypesModel & {
    parent: PathwayTypesModel | null;
    children: PathwayTypesModel[];
}

type LanguageModel = {
	name: string;
	code: string;
};

type LanguageModelWithRelations = LanguageModel & {
    countries: CountryModel[];
}

type CurrencyModel = {
	symbol: string;
	name: string;
	code: string;
};

type CurrencyModelWithRelations = CurrencyModel & {
    countries: CountryModel[];
}

type DocumentsModel = {
	name: string;
	id: number;
	description: string | null;
	type: Enums.DocumentType[];
};

type DocumentsModelWithRelations = DocumentsModel & {
    pathways: PathwayDocumentsModel[];
}

type CountryLanguageModel = {
	countryCode: string;
	languageCode: string;
};

type CountryLanguageModelWithRelations = CountryLanguageModel & {
    country: CountryModel;
}

type CountryCurrencyModel = {
	countryCode: string;
	currencyCode: string;
};

type CountryCurrencyModelWithRelations = CountryCurrencyModel & {
    country: CountryModel;
    currency: CurrencyModel;
}

type UserModel = {
    name: string;
    id: string;
    image: string | null;
    discordHandle: string | null;
    email: string | null;
    emailVerified: Date | null;
    secret: string;
    firstName: string | null;
    lastName: string | null;
}


namespace Enums {
	export type PathwayType = 'ASYLUM' | 'VISA';
	export type PathwayNoteType = 'GENERAL' | 'LIMITATION' | 'REQUIREMENT';
	export type PathwayPipelineType = 'CITIZENSHIP' | 'RESIDENCY' | 'REUNIFICATION';
	export type DocumentType = 'GENERAL' | 'FINANCIAL' | 'IDENTIFICATION' | 'EVIDENCE' | 'SUPPORTING' | 'SPONSORSHIP' | 'INSURANCE' | 'PLAN';
}

namespace ObjectTypes {
	type MinMax = {
		min: number;
		max: number;
	};

	type MinMaxNote = MinMax & {
		note: string | null;
	};

	export type CostField = MinMax;
	export type DurationField = MinMaxNote;
	export type ProcessTimeField = MinMaxNote;
	export type RenewalField = MinMaxNote;
}
 */
