import { Heading } from '~/components/Heading';

const CountryPage = async ({
	params,
}: {
	params: Promise<{ country: string }>;
}) => {
	const { country } = await params;

	return <Heading level={1}>{country}</Heading>;
};

export default CountryPage;
