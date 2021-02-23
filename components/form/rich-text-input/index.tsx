/* 
   
   warning: not fully implemented or tested — do not use in production
            use at your own risk.
   
    */

import { useEffect, useState } from 'react'

import { slugify } from '@nick-mazuk/lib/text-styling'
import { Editor } from '@tinymce/tinymce-react'
import debounce from 'debounce'
import htmlToMarkdown from 'html-to-md'
import html2Text from 'html2plaintext'
import MarkdownToHtml from 'markdown-it'

import type { FormSync } from '..'
import { TextContent } from '../../../elements/text-content'
import { Feedback } from '../text-input-helpers/text-input-feedback'
import { HelpText } from '../text-input-helpers/text-input-help-text'
import { LabelGroup } from '../text-input-helpers/text-input-label-group'
import { Progress } from '../text-input-helpers/text-input-progress'
import { Status } from '../text-input-helpers/text-input-status'
import { TextInputWrapper } from '../text-input-helpers/text-input-wrapper'

// eslint-disable-next-line import/exports-last -- used elsewhere
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

const getPlainText = (html: string): string => {
    return html2Text(html).replace(/\n/gu, '')
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
                        <Editor
                            value={value}
                            onEditorChange={handleChange}
                            onBlur={() => validate(value)}
                            init={{
                                menubar: false,
                                inline: true,
                                plugins: ['autolink lists link', 'paste'],
                                placeholder: props.placeholder,
                                /* eslint-disable camelcase -- 3rd party api */
                                content_css: false,
                                default_link_target: '',
                                link_assume_external_targets: 'https',
                                link_default_protocol: 'https',
                                link_title: false,
                                target_list: false,
                                /* eslint-enable camelcase -- 3rd party api */
                                toolbar: 'bold italic link | numlist bullist',
                            }}
                        />
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
