// import { Text } from '@/admin/_components/catalyst'
// import { api } from 'query'
// import { Heading, Icon, Link, Page, PageHeading, Section, U } from '~/components'
// import { cn } from '~/lib/cn'

// type tFrontMatter = {
// 	subtitle: string
// 	date: string
// 	image?: {
// 		url: string
// 		alt: string
// 	}
// 	author?: {
// 		name: string
// 		TikTok?: string
// 		BlueSky?: string
// 	}
// 	title?: string
// 	tags?: string[]
// }

// const SocialIcon = ({
// 	author,
// 	name,
// }: {
// 	author: tFrontMatter['author']
// 	name: keyof tFrontMatter['author']
// }) => {
// 	const url =
// 		name === 'TikTok' ? `https://www.tiktok.com/@${author?.[name]}`
// 		: name === 'BlueSky' ? `https://bsky.app/profile/${author?.[name]}`
// 		: '#'

// 	const icon =
// 		name === 'TikTok' ? 'TikTokIcon'
// 		: name === 'BlueSky' ? 'BlueSkyIcon'
// 		: 'GlobeIcon'

// 	return (
// 		<Link
// 			href={url}
// 			className={cn(
// 				'hover:opacity-50',
// 				name == 'BlueSky' && 'text-[#0385ff]',
// 				name == 'TikTok' && 'text-foreground'
// 			)}
// 			aria-label={name}
// 			title={name}
// 			target='_blank'
// 			rel='noopener'>
// 			<Icon
// 				IconName={icon as keyof typeof Icon}
// 				className='h-4 w-4'
// 			/>
// 		</Link>
// 	)
// }

// const Brow = ({ frontmatter }: { frontmatter: tFrontMatter }) => (
// 	<span className='flex items-center gap-8 text-sm'>
// 		<span>
// 			Written By <strong>{frontmatter.author?.name}</strong>, on
// 			{' '
// 				+ new Date(frontmatter.date).toLocaleDateString('en-US', {
// 					year: 'numeric',
// 					month: 'long',
// 					day: 'numeric',
// 				})}
// 		</span>
// 		{Object.keys(frontmatter.author ?? []).length > 1 && (
// 			<span className='flex gap-4'>
// 				{Object.keys(frontmatter.author ?? [])
// 					.filter(key => key !== 'name')
// 					.map(key => (
// 						<SocialIcon
// 							key={key}
// 							name={key as keyof tFrontMatter['author']}
// 							author={frontmatter.author}
// 						/>
// 					))}
// 			</span>
// 		)}
// 	</span>
// )

// const PoliticalProseOverParables = async ({}) => {
// 	const post = await api.post.getBySlug('political-prose-over-parables')

// 	const frontmatter = {
// 		subtitle: post?.subtitle || '',
// 		author: post?.author,
// 	}

// 	console.log(post)
// 	return (
// 		<>
// 			<Page>
// 				<PageHeading
// 					eyebrow={frontmatter.author ? <Brow frontmatter={frontmatter} /> : <></>}
// 					subtitle={
// 						<>
// 							{frontmatter.subtitle}
// 							<span className='flex items-center justify-start px-10 py-2'>
// 								{frontmatter.tags && frontmatter.tags.length > 0 && (
// 									<span className='flex flex-wrap justify-end gap-2'>
// 										{frontmatter.tags.map(tag => (
// 											<Tag
// 												key={tag}
// 												tag={tag}
// 											/>
// 										))}
// 									</span>
// 								)}
// 							</span>
// 						</>
// 					}>
// 					{toTitleCase(post?.name.replace(/-/g, ' '))}
// 				</PageHeading>
// 				<Section>
// 					{frontmatter.image && (
// 						<figure className='relative mx-auto mb-6 block aspect-video w-[90%]'>
// 							<Image
// 								src={frontmatter.image.url}
// 								alt={frontmatter.title || title}
// 								style={{
// 									objectFit: 'cover',
// 								}}
// 								fill
// 								className='rounded-md'
// 								priority
// 							/>
// 							<figcaption className='text-muted-foreground absolute top-full left-0 px-2 text-center text-sm italic'>
// 								{frontmatter.image.alt}
// 							</figcaption>
// 						</figure>
// 					)}

// 					<Text>
// 						In this work, I want to try to make a different kind of appeal; I want to use a biblical
// 						parable to try to compare and explain what has happened to the United States, and what
// 						we can do going forward. I do not personally follow any tenets of Christianity, but I
// 						know them very well. I want to offer the Parable of the Talents from the New Testament
// 						and I want the moral of that particular allegory to resonate with the circumstances
// 						unfolding—in real time—in America. All hope is **not** lost and we can rebuild; but the
// 						whole people will have to abandon any sentiment of "_I don’t really do politics_" or
// 						"_it doesn’t affect me_"; if it doesn’t already, it will.{' '}
// 						<U>It’s no longer an option to "be political", it is a duty.</U>
// 					</Text>

// 					<Heading
// 						level={3}
// 						className='mt-6 mb-2'>
// 						Matthew 25:14-30
// 					</Heading>

// 					<Text>
// 						In the _Parable of the Talents_, a master entrusts three of his servants with talents (a
// 						unit of measure for precious metals) while he leaves for a short time. Two of those
// 						servants invested the talents entrusted them and doubled the amount they were left with;
// 						the master regarded their initiative and said "_you have been faithful over a little, I
// 						will set you over much_", meaning they had shown such faithfulness to him and his
// 						betterment that he would bequeath them with honors and even more powers and
// 						responsibility. Their care over what was his resulted in receiving more than they had,
// 						for themselves. But the last servant, he did not invest or take action to grow the sum
// 						his master entrusted to him. He buried the talent, keeping it exactly as it was, to
// 						return to his master when he came to collect. The master was wrathful, saying "_from the
// 						one who has not, even what he has will be taken away_". And he cast his "_wicked and
// 						slothful servant_" out into the night.
// 					</Text>

// 					<Text>
// 						The Baby Boomers and Generation X were "wicked and slothful" servants. They had more
// 						rights and freedoms in their adulthoods than the generations before them...and their
// 						lazy and disinterested attitudes towards "politics", their neglect to preserve and grow
// 						the freedoms and progress they so greatly enjoyed with affirmative and forward
// 						investment in "politics", has left younger generations with less rights to enjoy in
// 						their adulthoods than what was available to them as children. Millennials, Generation Z,
// 						Generation Alpha; all of us have less rights to our autonomy and less freedom of speech,
// 						movement, public gathering, and expression than what we grew up being told we could have
// 						"once you’re 18". In just 10 years America has gone from one of the most socially
// 						progressive countries in the world to one of the most oppressive. The democracy America
// 						was so proud of is dead and rotting; Trump's authoritarian regime has murdered it.
// 					</Text>

// 					<Text>
// 						Democracy is never a guaranteed or static structure; democracy lives and breathes
// 						through its own employment. The phrase "if you don’t use it, you’ll lose it" is often
// 						used in reference to physical strength or flexibility or, sometimes, in reference to
// 						cognitive agility. But it should be just as deeply understood in its application to rule
// 						for and by The People. Only 22.7% of the voting population, in America, actually voted
// 						for Donald Trump’s second term in office. 22.1% voted for Kamala Harris; 24.7% of the
// 						voting population did not vote. Now, some percentage of those people could not vote
// 						because of the reduction of mail-in voting, gerrymandering, or complete inability to get
// 						to the polling locations, but plenty of them kept the "I’m not into politics"
// 						perspective or didn’t think it mattered if they voted or not. The rest of the
// 						population—including minors, residents, and refugees—were ineligible to vote. I offer
// 						all those figures and sums because I am attempting to make the point that _a larger
// 						percentage of the voting population didn’t vote, at all, than either of the percentages
// 						for the respective candidates did_. This is "wicked and slothful". This is taking no
// 						interest in preserving or bettering the state of the nation. They didn’t use their right
// 						to vote; and now a terrifying amount of Americans have lost that right entirely.
// 					</Text>

// 					<Text>
// 						American democracy has been murdered by the Trump Regime, there is no doubt of that; but
// 						the huge swaths of people who didn’t care enough to participate in the democratic
// 						process aided and abetted this authoritarian coup. The rights, protections, and services
// 						that were given a generation or two before have been, or are in the process of being,
// 						gutted. Entire demographic minorities are being targeted by public and government
// 						entities alike. Eugenics has a new face and so does White Supremacy; it’s the White
// 						House Emblem. And it will take more than peaceful protests and strikes to undo what has
// 						been done. No resurrection will be possible, a new nation will have to be created,
// 						labored over, and born. And birth is never bloodless.
// 					</Text>

// 					<Text>
// 						I do not wish to give the impression that all hope is lost; it isn’t. But the wisps of
// 						hope will vanish into the winds of history if people do not take action. There can be no
// 						more disinterest. There can be no more lazy or careless regards towards "politics". It
// 						isn’t about party lines or religious alignment anymore, it is about the rights and
// 						actual lives of the American people. If all of the executive atrocities have not yet
// 						affected you, I promise you they will; just give it a little time. No one is safe, or
// 						will be for much longer. And the only way to save the entire nation will be to put your
// 						various grievances and differences aside and unite. We must stand together, locked arm
// 						in arm, and declare that we will have our rights to our autonomy and freedom. We must do
// 						so with the resolve to take it back, if it is not given to us. Organize, my friends.
// 						Creating networks and communities, cooperative sharing of resources and information is
// 						no longer a nice idea: it is vital. We The People must build our nation from the ground
// 						up; just like a fetus must grow and form from cellular to systematic, we too must
// 						gather, merge, split and specialize into a country. And we can do this. We must.
// 					</Text>

// 					<span className='mt-4 mb-2 block indent-10 font-serif text-3xl italic'>
// 						Testem Perhibo, Friends
// 					</span>
// 				</Section>
// 			</Page>
// 		</>
// 	)
// }

// export default PoliticalProseOverParables
