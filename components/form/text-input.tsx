import type { ChangeEvent, FocusEvent, KeyboardEvent } from 'react'
import { useCallback, useEffect, useState } from 'react'

import { slugify } from '@nick-mazuk/lib/text-styling'

import type { ClearFunction, FormDataValue, FormSync, ValidateFunction } from '.'
import type { WithClickCallback } from '../../hoc/with-click'
import type { AffixContent } from './text-input-helpers/text-input-affix'
import type { Autocomplete, Keyboard, Sizes, Type } from './text-input-helpers/text-input-base'
import { TextInputBase } from './text-input-helpers/text-input-base'

/* props - 
   coolness - persist, suggestion text, autocomplete
*/

/* eslint-disable import/exports-last -- used in other text-input components */
export type ValidationRules = {
    assert: (value: string) => boolean
    error?: string
}[]
export type Parser = (value: string) => FormDataValue
export type Updater = (value: string, oldValue: string) => string
export type Formatter = (value: string) => string
export type Progress = (value: string) => string
/* eslint-enable import/exports-last -- used in other text-input components */

type Props = {
    children?: never
    type: Type
    label?: string
    name?: string
    id?: string
    placeholder?: string
    defaultValue?: string

    size?: Sizes
    optional?: boolean
    readonly?: boolean
    disabled?: boolean
    textRight?: boolean
    tabNums?: boolean
    hideOptionalLabel?: boolean
    help?: string
    info?: string
    successMessage?: string
    requiredMessage?: string
    prefix?: AffixContent
    suffix?: AffixContent
    prefixOnClick?: WithClickCallback
    suffixOnClick?: WithClickCallback
    prefixName?: string
    suffixName?: string
    suggestions?: string[]
    onSuggestionSelected?: (value: string) => void
    keyboard?: Keyboard
    autoComplete?: Autocomplete

    onUpdate?: Updater
    validationRules?: ValidationRules
    parser?: Parser
    formatter?: Formatter
    progress?: Progress
    maxCharacters?: number

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

const getDefaultValue = (props: Props): string => {
    return props.defaultValue ?? ''
}

const validate = (
    value: string,
    optional: boolean | undefined,
    requiredMessage: string | undefined,
    rules?: ValidationRules
): [boolean, string] => {
    if (value.length === 0) {
        if (optional) return [true, '']
        return [false, requiredMessage ?? '']
    }
    for (const rule of rules ?? []) if (!rule.assert(value)) return [false, rule.error ?? '']
    return [true, '']
}

const parseValue = (value: string, parser?: Parser): FormDataValue => {
    if (parser) return parser(value)
    return value
}

const getUpdatedValue = (
    value: string,
    oldValue: string,
    updater: Updater | undefined,
    maxCharacters: number | undefined
): string => {
    if (typeof maxCharacters !== 'undefined' && value.length > maxCharacters) return oldValue
    if (updater) return updater(value, oldValue)
    return value
}

const format = (value: string, formatter?: Formatter): string => {
    if (formatter) return formatter(value)
    return value
}

const getProgress = (value: string, progress?: Progress, maxCharacters?: number): string => {
    if (progress) return progress(value)
    if (typeof maxCharacters !== 'undefined') return `${value.length} / ${maxCharacters}`
    return ''
}

const syncWithForm = (
    formSync: FormSync | undefined,
    name: string,
    value: string,
    parser: Parser | undefined,
    updateValidation: ValidateFunction,
    clear: ClearFunction
): void => {
    if (formSync) formSync.updateForm(name, parseValue(value, parser), updateValidation, clear)
}

// eslint-disable-next-line max-lines-per-function, sonarjs/cognitive-complexity -- will fix
export const TextInput = (props: Props): JSX.Element => {
    const defaultValue = getDefaultValue(props)
    const [name, label, id] = getIdentificationData(props)
    const [value, setValue] = useState(defaultValue)
    const [valid, setValid] = useState(true)
    const [showSuccess, setShowSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isInputFocused, setIsInputFocused] = useState(false)
    const [activeSuggestion, setActiveSuggestion] = useState(-1)
    const [progress, setProgress] = useState(
        getProgress(defaultValue, props.progress, props.maxCharacters)
    )

    const updateValue = useCallback(
        (newValue: string): void => {
            setValue(newValue)
            setProgress(getProgress(newValue, props.progress, props.maxCharacters))
        },
        [props.maxCharacters, props.progress]
    )

    const clearData = useCallback(() => {
        updateValue(defaultValue)
        setValid(true)
        setShowSuccess(false)
        setErrorMessage('')
    }, [defaultValue, updateValue])

    const updateValidation: ValidateFunction = useCallback(
        (inputValue) => {
            const newValue = inputValue ?? value
            const [isValid, message] = validate(
                newValue,
                props.optional,
                props.requiredMessage,
                props.validationRules
            )

            if (isValid) {
                setErrorMessage('')
                setValid(true)
                syncWithForm(
                    props.formSync,
                    name,
                    newValue,
                    props.parser,
                    updateValidation,
                    clearData
                )
            } else {
                setErrorMessage(message)
                setShowSuccess(false)
                setValid(false)
            }

            return isValid
        },
        [
            value,
            props.optional,
            props.requiredMessage,
            props.validationRules,
            props.formSync,
            props.parser,
            clearData,
            name,
        ]
    )

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>): void => {
            const newValue = getUpdatedValue(
                event.target.value,
                value,
                props.onUpdate,
                props.maxCharacters
            )
            updateValue(newValue)
            if (!valid) updateValidation(newValue)
        },
        [value, props.onUpdate, props.maxCharacters, updateValue, valid, updateValidation]
    )

    const handleFocus = useCallback(() => {
        setIsInputFocused(true)
    }, [])

    const handleBlur = useCallback(
        (event: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>): void => {
            setIsInputFocused(false)
            const newValue = event.target.value
            const isValid = updateValidation(newValue)
            if (isValid) {
                setShowSuccess(true)
                updateValue(format(newValue, props.formatter))
            }
        },
        [updateValidation, updateValue, props.formatter]
    )

    const handleSuggestionClick = (newValue: string) => {
        if (props.onSuggestionSelected) props.onSuggestionSelected(newValue)
        updateValue(newValue)
    }

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLInputElement>) => {
            switch (event.key) {
                case 'Enter':
                    if (props.suggestions && activeSuggestion >= 0) {
                        handleSuggestionClick(props.suggestions[activeSuggestion])
                    } else {
                        syncWithForm(
                            props.formSync,
                            name,
                            value,
                            props.parser,
                            updateValidation,
                            clearData
                        )
                    }
                    break
                case 'ArrowDown':
                case 'Down':
                    if (props.suggestions)
                        setActiveSuggestion((activeSuggestion + 1) % props.suggestions.length)
                    break
                case 'ArrowUp':
                case 'Up':
                    if (props.suggestions) {
                        setActiveSuggestion(
                            (Math.max(activeSuggestion, 0) - 1 + props.suggestions.length) %
                                props.suggestions.length
                        )
                    }
                    break
                default:
                    setActiveSuggestion(-1)
            }
        },
        [
            activeSuggestion,
            clearData,
            handleSuggestionClick,
            name,
            props.formSync,
            props.parser,
            props.suggestions,
            updateValidation,
            value,
        ]
    )

    // registers the input with the form on mount
    useEffect(() => {
        syncWithForm(props.formSync, name, value, props.parser, updateValidation, clearData)
        // eslint-disable-next-line react-hooks/exhaustive-deps -- no dependencies so the function runs once
    }, [])

    return (
        <TextInputBase
            id={id}
            label={label}
            name={name}
            type={props.type}
            placeholder={props.placeholder}
            value={value}
            size={props.size}
            optional={props.optional}
            hideOptionalLabel={props.hideOptionalLabel}
            readonly={props.readonly}
            disabled={props.disabled}
            textRight={props.textRight}
            help={props.help}
            info={props.info}
            prefix={props.prefix}
            suffix={props.suffix}
            prefixOnClick={props.prefixOnClick}
            suffixOnClick={props.suffixOnClick}
            prefixName={props.prefixName}
            suffixName={props.suffixName}
            suggestions={props.suggestions}
            activeSuggestion={activeSuggestion}
            onSuggestionClick={handleSuggestionClick}
            keyboard={props.keyboard}
            autoComplete={props.autoComplete}
            tabNums={props.tabNums}
            invalid={!valid}
            progress={progress}
            error={errorMessage}
            success={showSuccess ? props.successMessage : ''}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            isInputFocused={isInputFocused}
        />
    )
}

export type TextInput = ReturnType<typeof TextInput>
