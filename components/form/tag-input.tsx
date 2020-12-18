import type { ChangeEvent, KeyboardEvent } from 'react'
import { useState } from 'react'

import { formatNumber } from '@nick-mazuk/lib/number-styling'
import { slugify } from '@nick-mazuk/lib/text-styling'

import type { FormSync } from '.'
import { Tag } from '../../dashboard/elements/tag'
import { Tag as TagIcon } from '../../elements/icon'
import type { Sizes } from './text-input-helpers/text-input-base'
import { TextInputBase } from './text-input-helpers/text-input-base'

type Props = {
    children?: never
    label?: string
    name?: string
    id?: string

    placeholder?: string
    defaultValue?: string
    defaultTags?: Set<string>
    help?: string
    info?: string
    size?: Sizes
    optional?: boolean
    hideOptionalLabel?: boolean
    readonly?: boolean
    disabled?: boolean

    hideIcon?: boolean
    requiredMessage?: string
    successMessage?: string
    maxTags?: number

    onChange?: (value: string[]) => void

    formSync?: FormSync
}

const getIdentificationData = (props: Props): [string, string, string] => {
    let { name, label, id } = props
    if (!label && !name && !id) throw new Error('Input must have a label, name, or id')
    if (!name) name = id ?? slugify(label ?? '')
    if (!id) id = name
    if (!label) label = ''
    return [name, label, id]
}

const getProgress = (currentTags: Set<string>, maxTags?: number): string => {
    if (!maxTags) return ''
    return `${currentTags.size} / ${formatNumber(maxTags)} tags`
}

// eslint-disable-next-line max-lines-per-function, sonarjs/cognitive-complexity -- will fix
export const TagInput = (props: Props): JSX.Element => {
    const [name, label, id] = getIdentificationData(props)
    const [value, setValue] = useState(props.defaultValue ?? '')
    const [isValid, setIsValid] = useState(true)
    const [allTags, setAllTags] = useState(props.defaultTags ?? new Set<string>())
    const [progress, setProgress] = useState(getProgress(allTags, props.maxTags))
    const [showSuccess, setShowSuccess] = useState(false)
    const { onChange } = props

    const handleChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
        setValue(event.target.value)
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (props.maxTags && allTags.size >= props.maxTags) return
        if (event.key === 'Enter') {
            event.preventDefault()
            const newTags = new Set(allTags)
            newTags.add(value)
            setAllTags(newTags)
            setValue('')
            setProgress(getProgress(newTags, props.maxTags))
            if (onChange) onChange([...newTags])
        }
    }

    const removeTag = (tagValue: string) => {
        if (props.disabled || props.readonly) return
        const newTags = new Set(allTags)
        newTags.delete(tagValue)
        setAllTags(newTags)
    }

    return (
        <div>
            <TextInputBase
                id={id}
                label={label}
                name={name}
                type='text'
                placeholder={props.placeholder}
                value={value}
                size={props.size}
                optional={props.optional}
                hideOptionalLabel={props.hideOptionalLabel}
                readonly={props.readonly}
                disabled={props.disabled}
                help={props.help}
                info={props.info}
                prefix={props.hideIcon ? '' : <TagIcon />}
                invalid={!isValid}
                progress={progress}
                error={isValid ? '' : props.requiredMessage}
                success={showSuccess ? props.successMessage : ''}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
            <div className='-m-2 mt-2'>
                {[...allTags].sort().map((tagValue) => {
                    return (
                        <div className='m-2' key={tagValue}>
                            <Tag size='small' onRemove={() => removeTag(tagValue)}>
                                {tagValue}
                            </Tag>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export type TagInput = ReturnType<typeof TagInput>
