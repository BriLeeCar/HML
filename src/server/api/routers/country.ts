import { z } from 'zod/v4'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const countriesRouter = createTRPCRouter({
	all: publicProcedure.query(({ ctx }) => {
		return ctx.db().countries
	}),
	getMapPaths: publicProcedure.query(({ ctx }) => {
		return ctx
			.db()
			.countries.filter((ea) => ea.svgPath)
			.map((country) => country)
	}),
	getByAbbr: publicProcedure
		.input(z.string().length(2).toLowerCase())
		.query(({ ctx, input }) => {
			return (
				ctx
					.db()
					.countries.find(
						(country) => country.abbr.toLowerCase() === input
					) || null
			)
		}),
	getCountryCommunityAttributes: publicProcedure
		.input(
			z.object({
				abbr: z.string().length(3).toLowerCase().optional(),
				name: z.string().toLowerCase().optional(),
			})
		)
		.query(({ ctx, input }) => {
			return ctx.db().countries.find((country) => {
				if (input.abbr) {
					return country.abbr.toLowerCase() === input
				}
				if (input.name) {
					return country.name.toLowerCase() === input
				}
				return false
			})?.communities
		}),
	filterByCommunity: publicProcedure
		.input(
			z.object({
				prideScore: z.boolean().optional(),
				transSafety: z.boolean().optional(),
				unMember: z.boolean().optional(),
			})
		)
		.query(({ ctx, input }) => {
			return ctx.db().countries.filter((country) => {
				if (
					input.prideScore
					&& country.communities?.prideScore
					&& country.communities?.prideScore <= 0
				) {
					return false
				}
				if (
					input.transSafety
					&& country.communities?.transSafety !== true
				) {
					return false
				}
				if (input.unMember && country.api.unMember !== true) {
					return false
				}
				return true
			})
		}),
	getPathwaysByAbbr: publicProcedure
		.input(z.string().length(2).toLowerCase())
		.query(({ ctx, input }) => {
			return (
				ctx
					.db()
					.countries.find(
						(country) => country.abbr.toLowerCase() === input
					)?.pathways || []
			)
		}),
})
