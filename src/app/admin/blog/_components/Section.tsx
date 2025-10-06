"use client";
import { type ComponentPropsWithoutRef, useState } from "react";
import { cn } from "~/lib/cn";
import { FieldGroup, Fieldset, Legend } from "../../_components/fieldset";
import { Text } from "../../_components/text";

export const Section = ({
	sectionTitle,
	sectionDescription,
	...props
}: {
	sectionTitle: string;
	sectionDescription: string;
} & ComponentPropsWithoutRef<"fieldset">) => {
	const [open, setOpen] = useState(true);

	const toggleOpen = () => {
		setOpen(!open);
	};

	return (
		<Fieldset {...props}>
			<Legend onClick={toggleOpen} className="cursor-pointer">
				<span
					className={cn(
						open == true ? "rotate-90" : "",
						"inline-block transition-transform mx-2",
					)}
				>
					{"> "}
				</span>
				{sectionTitle}
			</Legend>
			<Text>{sectionDescription}</Text>
			<FieldGroup className={open ? "block" : "hidden"}>
				{props.children}
			</FieldGroup>
		</Fieldset>
	);
};
