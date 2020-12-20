/* 
   
   warning: not fully implemented — do not use in production
   
    */

import { useState } from 'react'

import dynamic from 'next/dynamic'

import type { ReactQuillProps, Range } from 'react-quill'

import type { FormSync } from '..'
import { TextContent } from '../../../elements/text-content'
import { TextInputWrapper } from '../text-input-helpers/text-input-wrapper'
import { RichTextToolbar } from './helpers/toolbar'

// eslint-disable-next-line import/exports-last -- used in toolbar.tsx
export type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type Props = {
    name: string
    defaultValue?: Node[]
    formSync?: FormSync
    fullWidth?: boolean

    h1?: boolean | Heading
    h2?: boolean | Heading
    bold?: boolean
    italic?: boolean
    underline?: boolean
    link?: boolean
    ol?: boolean
    ul?: boolean
    code?: boolean
    image?: boolean
}

const ReactQuill = dynamic(import('react-quill'), {
    ssr: false,
})

type Context = {
    format: Record<string, string | boolean | number | undefined>
}

type Handler = {
    (range: Range, context: Context): void
    quill: {
        formatLine: any
    }
}

type KeyBindings = Record<
    string,
    {
        key: string
        shiftKey?: boolean
        shortKey?: boolean
        handler: (range: Range, context: Context) => void
    }
>

const keyBindings: KeyBindings = {
    header1: {
        key: '1',
        shiftKey: true,
        shortKey: true,
        handler: function (range, context) {
            if (context.format.header === 2) this.quill.formatLine(range?.index, 1, 'header', false)
            else this.quill.formatLine(range?.index, 1, 'header', '2')
        },
    },
    header2: {
        key: '2',
        shiftKey: true,
        shortKey: true,
        handler: function (range, context) {
            if (context.format.header === 3) this.quill.formatLine(range?.index, 1, 'header', false)
            else this.quill.formatLine(range?.index, 1, 'header', '3')
        },
    },
    codeBlock: {
        key: 'e',
        shiftKey: true,
        shortKey: true,
        handler: function (range, context) {
            if (context.format['code-block'])
                this.quill.formatLine(range?.index, 1, 'code-block', false)
            else this.quill.formatLine(range?.index, 1, 'code-block', true)
        },
    },
    link: {
        key: 'k',
        shortKey: true,
        handler: function (range, context) {
            const newUrl = prompt('Enter link URL:', context.format.link)
            if (newUrl === '') this.quill.formatText(range?.index, range?.length, 'link', false)
            else this.quill.formatText(range?.index, range?.length, 'link', newUrl)
        },
    },
}

const modules: ReactQuillProps['modules'] = {
    toolbar: { container: '#rich-text-toolbar' },
    keyboard: {
        bindings: keyBindings,
    },
}

const getElements = (props: Props) => {
    return {
        h1: props.h1,
        h2: props.h2,
        bold: props.bold,
        italic: props.italic,
        underline: props.underline,
        link: props.link,
        ol: props.ol,
        ul: props.ul,
        code: props.code,
        image: props.image,
    }
}

// eslint-disable-next-line sonarjs/cognitive-complexity -- really not complex
const getFormats = (props: Props): string[] => {
    const formats = []
    if (props.h1 || props.h2) formats.push('header')
    if (props.bold) formats.push('bold')
    if (props.italic) formats.push('italic')
    if (props.underline) formats.push('underline')
    if (props.link) formats.push('link')
    if (props.ol || props.ul) formats.push(...['list', 'indent'])
    if (props.ol) formats.push('ordered')
    if (props.ul) formats.push('bulleted')
    if (props.code) formats.push('code-block')
    if (props.image) formats.push('image')
    return formats
}

export const RichTextInput = (props: Props): JSX.Element => {
    const [value, setValue] = useState('<p>Text…</p>')

    let content = <textarea value={value} className='outline-none' />
    if (typeof window !== 'undefined') {
        content = (
            <ReactQuill
                value={value}
                onChange={setValue}
                modules={modules}
                theme=''
                formats={getFormats(props)}
            />
        )
    }

    return (
        <TextInputWrapper>
            <div className='w-full px-4 pb-3 text-gray-900 min-h-32'>
                <TextContent responsive fullwidth>
                    <RichTextToolbar elements={getElements(props)} />
                    {content}
                </TextContent>
            </div>
        </TextInputWrapper>
    )
}

export type RichTextInput = ReturnType<typeof RichTextInput>
