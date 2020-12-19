import type { ChangeEvent, KeyboardEvent } from 'react'
import { useEffect, useState } from 'react'

import classNames from 'classnames'

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
    const { onChange, maxTags, disabled, readonly, defaultTags, defaultValue, formSync } = props
    const [name, label, id] = getIdentificationData(props)
    const [value, setValue] = useState(defaultValue ?? '')
    const [isValid, setIsValid] = useState(true)
    const [allTags, setAllTags] = useState(defaultTags ?? new Set<string>())
    const [progress, setProgress] = useState(getProgress(allTags, maxTags))
    const tagContainerClasses = classNames('-m-2 flex flex-wrap', {
        'mt-1': maxTags,
        'mt-2': !maxTags && !props.requiredMessage,
    })

    const resetToDefault = () => {
        setAllTags(defaultTags ?? new Set<string>())
        setValue(defaultValue ?? '')
    }

    const validate = (newTags?: Set<string>): boolean => {
        let valid = false
        if (props.optional) valid = true
        if ((newTags ?? allTags).size > 0) valid = true
        setIsValid(valid)
        return valid
    }

    const syncWithForm = (newTags: Set<string>) => {
        if (formSync) formSync.updateForm(name, [...newTags], validate, resetToDefault)
    }

    const handleChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
        setValue(event.target.value)
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            if (maxTags && allTags.size >= maxTags) return
            if (value.trim() === '') return

            const newTags = new Set(allTags)
            newTags.add(value.trim().toLowerCase())

            if (newTags.size === allTags.size) return

            setAllTags(newTags)
            setValue('')
            setProgress(getProgress(newTags, maxTags))
            validate(newTags)
            syncWithForm(newTags)

            if (onChange) onChange([...newTags])
        }
    }

    const removeTag = (tagValue: string) => {
        if (disabled || readonly) return
        const newTags = new Set(allTags)
        newTags.delete(tagValue)
        setAllTags(newTags)
        setProgress(getProgress(newTags, maxTags))
        validate(newTags)
        syncWithForm(newTags)
    }

    useEffect(() => {
        syncWithForm(allTags)
        // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run once
    }, [])

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
                readonly={readonly}
                disabled={disabled}
                help={props.help}
                info={props.info}
                prefix={props.hideIcon ? '' : <TagIcon />}
                invalid={!isValid}
                progress={progress}
                error={isValid ? '' : props.requiredMessage}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
            <div className={tagContainerClasses}>
                {[...allTags].sort().map((tagValue) => {
                    const onRemove =
                        // eslint-disable-next-line no-undefined -- necessary
                        readonly || disabled ? undefined : () => removeTag(tagValue)
                    return (
                        <div className='m-2' key={tagValue}>
                            <Tag size='small' onRemove={onRemove}>
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
