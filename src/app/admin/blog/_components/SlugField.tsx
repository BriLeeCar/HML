"use client";
import type { Dispatch, SetStateAction } from "react";
import { Checkbox, CheckboxField } from "../../_components/checkbox";
import { Field, FieldGroup, Label } from "../../_components/fieldset";
import { Input } from "../../_components/input";

export const SlugField = ({
	slug,
	setSlug,
}: {
	slug: string;
	setSlug: Dispatch<SetStateAction<string>>;
}) => {
	return (
		<FieldGroup>
			<Field className="mb-2 flex items-baseline gap-4 lg:block">
				<Label>Slug</Label>
				<Input
					defaultValue={slug}
					onChange={(e) => setSlug(e.target.value)}
					disabled
				/>
			</Field>
			<CheckboxField className="ml-12 lg:ml-0">
				<Label>Unlock?</Label>
				<Checkbox />
			</CheckboxField>
		</FieldGroup>
	);
};
