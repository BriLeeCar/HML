import { cn } from '~/cn';

export const P = ({ ...props }) => {
	return <p {...props} className={cn('my-2', props.className)} />;
};
