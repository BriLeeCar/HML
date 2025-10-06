import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const tagRouter = createTRPCRouter({
	getAll: publicProcedure.query(async () => {
		return await db.tag.findMany();
	}),
});
