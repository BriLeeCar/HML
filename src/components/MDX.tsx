import { Heading } from './Heading';
import { Link } from './Link';
import { P } from './P';

export const mdxComponents = {
	h1: ({ ...props }) => <Heading {...props} level={1} size='title' />,
	h2: ({ ...props }) => <Heading {...props} level={2} size='lg' />,
	h3: ({ ...props }) => <Heading {...props} level={3} size='md' />,
	h4: ({ ...props }) => <Heading {...props} level={4} />,
	a: Link,
	p: P,
	blockquote: ({ ...props }) => (
		<blockquote
			className='border-l-4 border-accent-500 pl-4 italic text-gray-500 my-4 mx-8'
			{...props}
		/>
	),
};
