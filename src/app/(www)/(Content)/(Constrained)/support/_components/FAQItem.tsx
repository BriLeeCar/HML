'use client'

import { useState } from 'react'
import { Bold, Text } from '~/components'

export const FAQItem = ({ question, answer }: { question: string; answer: ReactNode }) => {
	const [open, setOpen] = useState(false)
	return (
		<details>
			<summary onClick={() => setOpen(prev => !prev)}>{question}</summary>
			{open && <div className='prose prose-invert mt-4'>{answer}</div>}
		</details>
	)
}

export const FAQItems = [
	{
		question: 'Can I bring my pets?',
	},
	{
		question: 'What are my "safety needs"?',
		answer: () => (
			<>
				<Text>
					<Bold>Safety Needs</Bold> are one of the metrics we take into consideration when helping
					you look for locations and pathways out of the country. They are the protections or
					accesses that are most crucial for you to have quality of life.
				</Text>
				<Text>
					If you are transgender, your saftey needs are probably things like:
					<ol>
						<li>legal protections against anti-trans discimination</li>
						<li>access to medical/gender affirming care.</li>
					</ol>
				</Text>
				<Text>
					If you are BIPOC, they could be things like protections against:
					<ol>
						<li>discrimination</li>
						<li>harassment</li>
					</ol>
				</Text>
			</>
		),
	},
	{
		question: 'Can I seek asylum if I am disabled?',
		answer: () => (
			<Text>
				<Bold>Yes</Bold>! Countries cannot deny your application for international protection based
				on whether or not you can work. Asylum is not a tradional entry path and it works entirely
				different from traditional paths of immigration like visas.{' '}
			</Text>
		),
	},
	{
		question: 'What is the difference between a traditional path of immigration and asylum?',
	},
]

/* 
### Q: Can I bring my pets?

#### If you're taking a **traditional** path:

- Yes but it is usually a very expensive process. Your pet will need to, *at minimum*:
  1. Be up-to-date on all vaccines
  2. Be chipped
  3. Have a Health/Travel certificate from a USDA certified vetrinarian

#### If you're taking the **asylum** path: 

It is not possible to bring pets unless you can arrange for their (sometimes required) quarintine, boarding, or fostering prior to you enterting the asylum facilities. 

- If your animal is a **service animal**, there are some protections that can be discussed with a legal representitive. Service animals are typically defined as being:
  1. Prescribed
  2. Well Trained
  3. Tasking


### Q: What is the difference between a traditional path of immigration and asylum?

The two are extremely different and asylum should only be used as a last resort and because you are experiencing or have a well founded fear of persecution and no protection from it. 

#### Applying for a **visa** or other type of residence permit

This allows you to retain control of your life. You decide where you work, where you live, and have flexibility of choice. Most of these paths are renewable and a longterm path to additional citizenship or permenant residence permission.

#### Applying for **asylum**

Asking for entrance to a country because you need international protection from individuals that your government will not protect you from or from the government itself and no other body of influence in your home country can protect you from the government. It can lead to citenzship, in some countries, but during the process of seeking and claiming asylum, you may not have any choice in where you live or whether or not you work, where you work. 
*/
