import type { Attributes, ReactNode } from 'react'
import React, { Fragment } from 'react'

import { slugify } from '@nick-mazuk/lib/text-styling'
import MarkdownTransformer from 'markdown-to-jsx'

import { Link } from './link'

type As = 'div' | 'article'

type Props = {
    children: string
    as?: As
    forceWrapper?: boolean
    h1?: boolean
    h2?: boolean
    h3?: boolean
    h4?: boolean
    h5?: boolean
    h6?: boolean
    bold?: boolean
    italic?: boolean
    underline?: boolean
    link?: boolean
    ol?: boolean
    ul?: boolean
    code?: boolean
}

// eslint-disable-next-line sonarjs/cognitive-complexity -- really not complex
const getCreateElementFunction = (props: Props) => {
    const allowedTags: Set<string> = new Set(['p', 'span'])
    if (props.h1) allowedTags.add('h1')
    if (props.h2) allowedTags.add('h2')
    if (props.h3) allowedTags.add('h3')
    if (props.h4) allowedTags.add('h4')
    if (props.h5) allowedTags.add('h5')
    if (props.h6) allowedTags.add('h6')
    if (props.bold) allowedTags.add('strong')
    if (props.italic) allowedTags.add('em')
    if (props.underline) allowedTags.add('u')
    if (props.link) allowedTags.add('a')
    if (props.ol) allowedTags.add('ol')
    if (props.ul) allowedTags.add('ul')
    if (props.ol || props.ul) allowedTags.add('li')
    if (props.code) allowedTags.add('code')
    return (type: any, innerProps?: Attributes | null, children?: ReactNode) => {
        return typeof type === 'string' && allowedTags.has(type)
            ? React.createElement(type, props, children)
            : (React.createElement(Fragment, { key: innerProps?.key }, children) as any)
    }
}

export const Markdown = (props: Props): JSX.Element => {
    return (
        <MarkdownTransformer
            options={{
                wrapper: props.as,
                forceWrapper: props.forceWrapper,
                slugify: slugify,
                disableParsingRawHTML: true,
                createElement: getCreateElementFunction(props),
                overrides: {
                    a: Link,
                },
            }}
        >
            {props.children}
        </MarkdownTransformer>
    )
}

export type Markdown = ReturnType<typeof Markdown>
