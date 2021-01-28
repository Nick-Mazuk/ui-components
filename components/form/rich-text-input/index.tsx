/* 
   
   warning: not fully implemented or tested — do not use in production
            use at your own risk.
   
    */

import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

import { slugify } from '@nick-mazuk/lib/text-styling'
import debounce from 'debounce'
import htmlToMarkdown from 'html-to-md'
import getPlainText from 'html2plaintext'
import MarkdownToHtml from 'markdown-it'
import type { ReactQuillProps, Range } from 'react-quill'

import type { FormSync } from '..'
import { TextContent } from '../../../elements/text-content'
import { Feedback } from '../text-input-helpers/text-input-feedback'
import { HelpText } from '../text-input-helpers/text-input-help-text'
import { LabelGroup } from '../text-input-helpers/text-input-label-group'
import { Progress } from '../text-input-helpers/text-input-progress'
import { Status } from '../text-input-helpers/text-input-status'
import { TextInputWrapper } from '../text-input-helpers/text-input-wrapper'
import { RichTextToolbar } from './helpers/toolbar'

// eslint-disable-next-line import/exports-last -- used in toolbar.tsx
export type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type SaveFormat = 'plain text' | 'markdown'

type Props = {
    label?: string
    name?: string
    id?: string
    defaultValue?: string
    formSync?: FormSync
    fullWidth?: boolean
    responsive?: boolean

    info?: string
    help?: string
    optional?: boolean
    readonly?: boolean
    disabled?: boolean
    hideOptionalLabel?: boolean
    placeholder?: string

    maxCharacters?: number

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

    saveFormat: SaveFormat | SaveFormat[]
}

const ReactQuill = dynamic(import('react-quill'), {
    ssr: false,
})

type Context = {
    format: Record<string, string | boolean | number | undefined>
}

type KeyBindings = Record<
    string,
    {
        key: string
        shiftKey?: boolean
        shortKey?: boolean
        handler: (range: Range, context: Context) => void
        quill: {
            formatLine: (
                index: number | undefined,
                length: number | undefined,
                block: string,
                add: boolean | string
            ) => void
            formatText: (
                index: number | undefined,
                length: number | undefined,
                block: string,
                add: boolean | string | null
            ) => void
        }
    }
>

const keyBindings: KeyBindings = {
    header1: {
        quill: { formatLine: () => null, formatText: () => null },
        key: '1',
        shiftKey: true,
        shortKey: true,
        handler: function (range, context) {
            if (context.format.header === 2) this.quill.formatLine(range?.index, 1, 'header', false)
            else this.quill.formatLine(range?.index, 1, 'header', '2')
        },
    },
    header2: {
        quill: { formatLine: () => null, formatText: () => null },
        key: '2',
        shiftKey: true,
        shortKey: true,
        handler: function (range, context) {
            if (context.format.header === 3) this.quill.formatLine(range?.index, 1, 'header', false)
            else this.quill.formatLine(range?.index, 1, 'header', '3')
        },
    },
    codeBlock: {
        quill: { formatLine: () => null, formatText: () => null },
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
        quill: { formatLine: () => null, formatText: () => null },
        key: 'k',
        shortKey: true,
        handler: function (range, context) {
            // eslint-disable-next-line no-alert -- NEEDS TO BE FIXED EVENTUALLY
            const newUrl = prompt('Enter link URL:', String(context.format.link))
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

const getIdentificationData = (props: Props): [string, string, string] => {
    let { name, label, id } = props
    if (!label && !name && !id) throw new Error('Input must have a label, name, or id')
    if (!name) name = id ?? slugify(label ?? '')
    if (!id) id = name
    if (!label) label = ''
    return [name, label, id]
}

const getMaxCharacterProgress = (html: string, maxCharacters: number | undefined): string => {
    if (typeof maxCharacters === 'undefined') return ''
    const plainText = getPlainText(html)
    return `${plainText.length} / ${maxCharacters}`
}

const markdownToHtml = new MarkdownToHtml()
// eslint-disable-next-line max-lines-per-function, sonarjs/cognitive-complexity -- it's going to be long
export const RichTextInput = (props: Props): JSX.Element => {
    const [name, label] = getIdentificationData(props)
    const [value, setValue] = useState(
        props.defaultValue ? markdownToHtml.render(props.defaultValue) : '<p></p>'
    )
    const [isValid, setIsValid] = useState(true)

    const validate = (newValue: string): boolean => {
        let changeIsValid = true
        if (props.maxCharacters && getPlainText(newValue).length > props.maxCharacters)
            changeIsValid = false
        setIsValid(changeIsValid)
        return changeIsValid
    }

    const syncWithForm = (newValue: string): void => {
        const { formSync } = props
        if (!formSync) return
        const parsedValues: { text: string; markdown: string } = { text: '', markdown: '' }
        if (props.saveFormat.includes('plain text')) parsedValues.text = getPlainText(newValue)
        if (props.saveFormat.includes('markdown')) parsedValues.markdown = htmlToMarkdown(newValue)
        formSync.updateForm(
            name,
            parsedValues,
            () => validate(newValue),
            () => true
        )
    }

    const syncWithFormDebounced = debounce(syncWithForm, 1000)

    // eslint-disable-next-line react-hooks/exhaustive-deps -- should be called only once, otherwise infinite loop
    useEffect(() => syncWithForm(value), [])

    const handleChange = (newValue: string) => {
        setValue(newValue)
        syncWithFormDebounced(newValue)
        if (!isValid) validate(newValue)
    }

    let content = (
        <textarea value={value} className='outline-none' placeholder={props.placeholder} />
    )
    if (typeof window !== 'undefined') {
        content = (
            <ReactQuill
                value={value}
                onChange={handleChange}
                onBlur={() => validate(value)}
                modules={modules}
                placeholder={props.placeholder}
                theme=''
                formats={getFormats(props)}
            />
        )
    }

    return (
        <div className='flex flex-col space-y-1'>
            <div className='flex items-baseline'>
                <div>
                    <LabelGroup label={label} info={props.info} />
                    <HelpText text={props.help} />
                </div>
                <Status
                    optional={props.optional && !props.hideOptionalLabel}
                    readonly={props.readonly && !props.disabled}
                />
            </div>
            <TextInputWrapper hasError={!isValid} disabled={props.disabled}>
                <div className='w-full px-4 pb-3 text-gray-900 min-h-32'>
                    <TextContent responsive={props.responsive} fullwidth={props.fullWidth}>
                        <RichTextToolbar elements={getElements(props)} />
                        {content}
                    </TextContent>
                </div>
            </TextInputWrapper>
            <div className='flex'>
                <Feedback
                    error={isValid ? '' : `Must be under ${props.maxCharacters} characters`}
                    success=''
                />
                <Progress
                    text={getMaxCharacterProgress(value, props.maxCharacters)}
                    invalid={!isValid}
                />
            </div>
        </div>
    )
}

export type RichTextInput = ReturnType<typeof RichTextInput>
