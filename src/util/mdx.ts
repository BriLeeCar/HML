import fs from 'fs';

export const getMarkdownFiles = async (
	path: string,
	filter: (file: string) => boolean = () => true,
) => {
	const files = await fs.promises.readdir(path);
	const markdownFiles = files.filter(
		(file) => file.endsWith('.mdx') && filter(file),
	);
	return markdownFiles.map((file) =>
		fs.readFile(file, (err, data) => {
			if (err) {
				console.warn(err.message);
			} else return data;
		}),
	);
};
