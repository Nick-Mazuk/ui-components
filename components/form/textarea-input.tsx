import { useCallback } from 'react'

import type { FormSync } from '.'
import type { Sizes } from './helpers/text-input-base'
import type { Formatter, Parser, Progress, Updater, ValidationRules } from './text-input'
import { TextInput } from './text-input'

type Props = {
    children?: never
    label?: string
    name?: string
    id?: string

    placeholder?: string
    defaultValue?: string
    help?: string
    info?: string
    size?: Sizes
    optional?: boolean
    hideOptionalLabel?: boolean
    disabled?: boolean
    readonly?: boolean

    successMessage?: string
    requiredMessage?: string
    onUpdate?: Updater
    validationRules?: ValidationRules
    parser?: Parser
    formatter?: Formatter
    progress?: Progress
    onChange?: (value: string) => void
    maxCharacters?: number

    formSync?: FormSync
}

export const TextAreaInput = (props: Props): JSX.Element => {
    const { onChange, onUpdate } = props
    const handleChange = useCallback(
        (value: string, oldValue: string): string => {
            const newValue = onUpdate ? onUpdate(value, oldValue) : value
            if (newValue !== oldValue && onChange) onChange(value)
            return value
        },
        [onChange, onUpdate]
    )
    return (
        <TextInput
            id={props.id}
            label={props.label ?? 'Content'}
            name={props.name}
            type='textarea'
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            help={props.help}
            info={props.info}
            size={props.size}
            optional={props.optional}
            hideOptionalLabel={props.hideOptionalLabel}
            readonly={props.readonly}
            disabled={props.disabled}
            autoComplete='off'
            successMessage={props.successMessage}
            requiredMessage={props.requiredMessage}
            onUpdate={handleChange}
            validationRules={props.validationRules}
            parser={props.parser}
            formatter={props.formatter}
            progress={props.progress}
            maxCharacters={props.maxCharacters}
            formSync={props.formSync}
        />
    )
}

export type TextAreaInput = ReturnType<typeof TextAreaInput>
