"use client";
import type { Dispatch, SetStateAction } from "react";
import { Field, Label } from "../../_components/fieldset";
import { Input } from "../../_components/input";

export const AuthorField = ({
	author,
	setAuthor,
}: {
	author: string;
	setAuthor: Dispatch<SetStateAction<string>>;
}) => {
	return (
		<Field>
			<Label>Author</Label>
			<Input
				defaultValue={author}
				onChange={(e) => setAuthor(e.currentTarget.value)}
				disabled
			/>
		</Field>
	);
};
