"use client";
import type { Dispatch, SetStateAction } from "react";
import { Field, Label } from "../../_components/fieldset";
import { Input } from "../../_components/input";

export const SubtitleField = ({
	subtitle,
	setSubtitle,
}: {
	subtitle: string;
	setSubtitle: Dispatch<SetStateAction<string>>;
}) => {
	return (
		<Field className="flex items-baseline gap-4 lg:block">
			<Label>Subtitle</Label>
			<Input
				defaultValue={subtitle}
				onChange={(e) => setSubtitle(e.currentTarget.value)}
			/>
		</Field>
	);
};
