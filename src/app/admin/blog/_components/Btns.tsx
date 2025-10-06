import { Button } from "../../_components/button";

export const BlogBtns = () => {
	return (
		<>
			<div className="flex flex-wrap gap-2 mb-4 ">
				<Button color="dark/zinc" className="mb-4" type="submit">
					<svg
						data-slot="icon"
						xmlns="http://www.w3.org/2000/svg"
						width={24}
						height={24}
						fill={"currentColor"}
						viewBox="0 0 24 24"
					>
						<path d="m3,7v3c0,.55.45,1,1,1s1-.45,1-1v-3c0-1.1.9-2,2-2h10c1.1,0,2,.9,2,2v10c0,1.1-.9,2-2,2h-3c-.55,0-1,.45-1,1s.45,1,1,1h3c2.21,0,4-1.79,4-4V7c0-2.21-1.79-4-4-4H7c-2.21,0-4,1.79-4,4Z"></path>
						<path d="m6.29,17.71c.2.2.45.29.71.29s.51-.1.71-.29l4.5-4.5,1.51,1.51c.47.47,1.28.14,1.28-.53v-4.44c0-.41-.34-.75-.75-.75h-4.44c-.67,0-1,.81-.53,1.28l1.51,1.51-4.5,4.5c-.39.39-.39,1.02,0,1.41Z"></path>
					</svg>
					Publish
				</Button>
				<Button color="dark/white" className="mb-4 ">
					<svg
						data-slot="icon"
						xmlns="http://www.w3.org/2000/svg"
						width={24}
						height={24}
						fill={"currentColor"}
						viewBox="0 0 24 24"
					>
						<path d="M21 6h-4V4.5A2.5 2.5 0 0 0 14.5 2h-5A2.5 2.5 0 0 0 7 4.5V6H3c-.55 0-1 .45-1 1s.45 1 1 1h1v10c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V8h1c.55 0 1-.45 1-1s-.45-1-1-1M9 4.5c0-.28.22-.5.5-.5h5c.28 0 .5.22.5.5V6H9zM18 18c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V8h12z"></path>
						<path d="M10 10c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1s1-.45 1-1v-6c0-.55-.45-1-1-1M14 10c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1s1-.45 1-1v-6c0-.55-.45-1-1-1"></path>
					</svg>
					Delete
				</Button>
				<Button outline className="mb-4">
					<svg
						data-slot="icon"
						xmlns="http://www.w3.org/2000/svg"
						width={24}
						height={24}
						fill={"currentColor"}
						viewBox="0 0 24 24"
					>
						<path d="M7 21h10c2.21 0 4-1.79 4-4V8.62c0-.66-.27-1.3-.73-1.77l-3.12-3.12c-.47-.47-1.11-.73-1.77-.73H7C4.79 3 3 4.79 3 7v10c0 2.21 1.79 4 4 4m8-2H9v-4.5c0-.28.22-.5.5-.5h5c.28 0 .5.22.5.5zM11 5h2v2h-2zM5 7c0-1.1.9-2 2-2v2.5C7 8.33 7.67 9 8.5 9h5c.83 0 1.5-.67 1.5-1.5V5h.38c.13 0 .26.05.35.15l3.12 3.12c.09.09.15.22.15.35V17c0 1.1-.9 2-2 2v-4.5a2.5 2.5 0 0 0-2.5-2.5h-5A2.5 2.5 0 0 0 7 14.5V19c-1.1 0-2-.9-2-2z"></path>
					</svg>
					Save
				</Button>
				<Button outline className="mb-4">
					<svg
						data-slot="icon"
						xmlns="http://www.w3.org/2000/svg"
						width={24}
						height={24}
						fill={"currentColor"}
						viewBox="0 0 24 24"
					>
						<path d="M12 5c-6.12 0-8.78 4.15-9.63 5.93-.33.68-.33 1.46 0 2.13.86 1.78 3.51 5.93 9.63 5.93s8.78-4.15 9.63-5.93c.33-.68.33-1.46 0-2.13C20.77 9.15 18.12 5 12 5m7.83 7.2C19.14 13.64 16.98 17 12 17s-7.14-3.36-7.83-4.8a.47.47 0 0 1 0-.4C4.86 10.36 7.02 7 12 7s7.14 3.36 7.83 4.8c.06.13.06.27 0 .4"></path>
						<path d="M14.53 11.51s-.43.49-1.03.49c-.83 0-1.5-.67-1.5-1.5 0-.6.49-1.03.49-1.03.21-.18.16-.38-.11-.45 0 0-.08-.02-.38-.02-1.64 0-3 1.36-3 3s1.36 3 3 3 3-1.36 3-3c0-.3-.02-.38-.02-.38-.07-.27-.27-.31-.45-.11"></path>
					</svg>
					Preview
				</Button>
			</div>
		</>
	);
};
