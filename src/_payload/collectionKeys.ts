import type { CollectionSlug } from 'payload'

export const CollectionKeys = {
	Countries: 'countries',
	CountryAttributes: 'country-attributes',
	CountryAttributeValues: 'country-attribute-values',
	CountryImages: 'country-images',
	Currencies: 'currencies',
	Languages: 'languages',
	Media: 'media',
	Pages: 'pages',
	Pathways: 'pathways',
	PathwayDocuments: 'pathway-documents',
	PathwayCategories: 'pathway-categories',
	Roles: 'roles',
	Teams: 'teams',
	Users: 'users',
	Guides: 'guides',
} as Record<string, CollectionSlug>
