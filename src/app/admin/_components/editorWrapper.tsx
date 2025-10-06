import { useQuill } from "react-quilljs";
// or const { useQuill } = require('react-quilljs');

import type { QuillOptions } from "quill";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css";
import {
	useEffect,
	type ComponentPropsWithoutRef,
	type ComponentPropsWithRef,
} from "react";
import { cn } from "~/lib/cn";

export const QuillWrapper = ({
	wrapperProps,
	contentProps,
	...quillOptions
}: QuillOptions & {
	wrapperProps?: ComponentPropsWithoutRef<"div">;
	contentProps?: {
		value: {
			text: string;
			content: string;
		};
		setValue: (value: { text: string; content: string }) => void;
	};
}) => {
	const { quill, quillRef } = useQuill({
		theme: "snow",
		modules: {
			toolbar: {
				container: "#toolbar",
			},
		},
		...quillOptions,
	});

	const words = () => {
		const text = contentProps?.value.text ?? "";
		const spaces = text.match(/\s+/g);
		if (text.length === 0) return 0;
		if (spaces === null) return 1;
		//
		return spaces.length + 1;
	};

	const letters = () => {
		const text = contentProps?.value.text ?? "";
		if (text.length === 0) return 0;

		//
		return contentProps?.value.text.replace(/\W/g, "").length ?? 0;
	};

	useEffect(() => {
		if (quill) {
			if (contentProps?.value.content && quill?.getText().length < 2) {
				quill.clipboard.dangerouslyPasteHTML(contentProps.value.content);
			}
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			quill.on("text-change", (delta, oldDelta, source) => {
				contentProps?.setValue({
					content: quill.getSemanticHTML().toString(),
					text: quill.getText().trim(),
				});
			});
		}
	}, [quill, contentProps]);

	return (
		<>
			<div {...wrapperProps} className={cn("h-96", wrapperProps?.className)}>
				<QuillToolbar />
				<div ref={quillRef} />
				<div id="editor" />
			</div>
			<span className="flex gap-2 items-center w-full justify-end p-4">
				<QuillCounter>{words()} words</QuillCounter> /{" "}
				<QuillCounter>{letters()} characters</QuillCounter>
			</span>
		</>
	);
};

const QuillCounter = ({ ...props }: ComponentPropsWithRef<"div">) => {
	return (
		<div {...props} className="text-sm text-zinc-500 dark:text-zinc-400" />
	);
};

const QuillToolbar = () => {
	return (
		<div id="toolbar">
			<select className="ql-size" defaultValue="normal">
				<option value="small"></option>
				<option value="normal"></option>
				<option value="large"></option>
				<option value="huge"></option>
			</select>
			<select className="ql-header" defaultValue="section">
				<option value="section">Section</option>
				<option value="subsection">Subsection</option>
			</select>

			<button className="ql-italic"></button>
			<button className="ql-bold"></button>

			<button className="ql-link"></button>
			<button className="ql-list" value="bullet"></button>
			<button className="ql-list" value="ordered"></button>
		</div>
	);
};
