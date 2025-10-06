"use client";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "~/lib/cn";

export const SubSectionWrapper = ({
	...props
}: ComponentPropsWithoutRef<"div">) => (
	<div
		{...props}
		className={cn(
			"space-y-4 border-1 p-6 pb-8 rounded-lg border-current/15",
			props.className,
		)}
	/>
);
