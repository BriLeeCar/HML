import { toShortDate } from "~/lib/date";
import { db } from "~/server/db";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../_components/table";

const BlogPage = async () => {
	const blogPages = await db.post.findMany({
		take: 10,
		orderBy: {
			createdAt: "desc",
		},
		select: {
			id: true,
			name: true,
			slug: true,
			subtitle: true,
			createdAt: true,
			updatedAt: true,
			Tag: {
				select: {
					tag: {
						select: {
							name: true,
						},
					},
				},
			},
			author: {
				select: {
					id: true,
					name: true,
					firstName: true,
					lastName: true,
				},
			},
		},
	});

	return (
		<Table className="mt-8 max-w-4xl mx-auto">
			<TableHead>
				<TableRow>
					<TableHeader>actions</TableHeader>
					<TableHeader>post</TableHeader>
					<TableHeader>author</TableHeader>
					<TableHeader>created</TableHeader>
					<TableHeader>tags</TableHeader>
				</TableRow>
			</TableHead>
			<TableBody>
				{blogPages.map((post) => (
					<TableRow key={post.id} className="*:align-top">
						<TableCell>
							<a
								href={`/admin/blog/edit?id=${post.id}`}
								className="text-blue-600 hover:underline"
							>
								Edit
							</a>
						</TableCell>
						<TableCell>
							<div className="font-medium">{post.name}</div>
							<div className="text-sm text-zinc-500 dark:text-zinc-400">
								<small>/{post.slug}</small>
							</div>
						</TableCell>
						<TableCell>
							{post.author ? (
								<div className="flex flex-col font-medium">
									{post.author.firstName && post.author.lastName
										? `${post.author.firstName} ${post.author.lastName}`
										: post.author.name}
								</div>
							) : (
								<span className="text-sm text-zinc-500 dark:text-zinc-400">
									Unknown Author
								</span>
							)}
						</TableCell>
						<TableCell>{toShortDate(post.createdAt)}</TableCell>
						<TableCell>
							<div className="flex flex-wrap gap-1">
								{post.Tag.map(({ tag }, index) => (
									<span
										key={index}
										className="bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200 px-2 py-1 rounded-full text-xs"
									>
										{tag.name}
									</span>
								))}
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default BlogPage;
