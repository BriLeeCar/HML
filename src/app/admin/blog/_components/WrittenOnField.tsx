"use client";
import { toShortDate } from "~/lib/date";
import { Field, Label } from "../../_components/fieldset";
import { Input } from "../../_components/input";

export const WrittenOnField = () => {
	return (
		<Field>
			<Label>Written On</Label>
			<Input defaultValue={toShortDate(new Date())} disabled />
		</Field>
	);
};
