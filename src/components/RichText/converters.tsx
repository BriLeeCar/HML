import { SectionHeading } from '@/components/Structure/Section'
import { Bold, InlineLink, Large, OL, Text, UL } from '@/components/Text'
import type { JSXConverters, JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import type { NodeTypes } from './_types'
import * as Components from './components'

export const nodeConverter: JSXConverters<NodeTypes> = {
	heading: ({ node, nodesToJSX }) => {
		if (node.tag == 'h2' && node.children.length > 0) {
			return <SectionHeading>{nodesToJSX({ nodes: node.children })}</SectionHeading>
		}
		if (node.tag == 'h3' && node.children.length > 0) {
			return <Large>{nodesToJSX({ nodes: node.children })}</Large>
		}
	},
	paragraph: ({ node, nodesToJSX }) => {
		if (node.type == 'paragraph' && node.children.length > 0) {
			return <Text>{nodesToJSX({ nodes: node.children })}</Text>
		}
	},
	text: ({ node }) => {
		if (node.type === 'text') {
			if (node.format == 1) {
				return <Bold>{node.text}</Bold>
			}

			return node.text
		}
		return null
	},
	list: ({ node, nodesToJSX }) => {
		if (node.tag == 'ul') {
			return <UL>{nodesToJSX({ nodes: node.children })}</UL>
		}
		return <OL>{nodesToJSX({ nodes: node.children })}</OL>
	},
	listitem: ({ node, nodesToJSX }) => {
		return <li>{nodesToJSX({ nodes: node.children })}</li>
	},
	link: ({ node, nodesToJSX }) => {
		return (
			node.fields.url && (
				<InlineLink
					href={node.fields.url}
					target={node.fields.newTab ? '_blank' : '_self'}>
					{nodesToJSX({ nodes: node.children })}
				</InlineLink>
			)
		)
	},
}

export const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
	...defaultConverters,
	blocks: {
		'toggle-list': ({ node }) => <Components.ToggleList {...node.fields} />,
		'toggle-list-item': ({ node }) => <Components.ToggleListItem {...node.fields} />,
		section: ({ node }) => <Components.Section {...node.fields} />,
		'rich-text': ({ node }) => <Components.RichText {...node.fields} />,
	},
	...nodeConverter,
})
