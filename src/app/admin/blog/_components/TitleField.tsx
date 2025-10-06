"use client";
import type { Dispatch, SetStateAction } from "react";
import { Field, Label } from "../../_components/fieldset";
import { Input } from "../../_components/input";

export const TitleField = ({
	title,
	setTitle,
	setSlug,
}: {
	title: string;
	setTitle: Dispatch<SetStateAction<string>>;
	setSlug: Dispatch<SetStateAction<string>>;
}) => {
	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newTitle = e.target.value;
		setTitle(newTitle);
		const newSlug = newTitle
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-+|-+$/g, "");
		setSlug(newSlug);
	};
	return (
		<Field className="flex items-baseline gap-4 lg:block">
			<Label>Title</Label>
			<Input defaultValue={title} onChange={handleTitleChange} />
		</Field>
	);
};
