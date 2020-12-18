import { useCallback } from 'react'

import { parseFullName } from 'parse-full-name'
import isEmail from 'validator/lib/isEmail'
import isURL from 'validator/lib/isURL'

import type { FormSync } from '.'
import { User } from '../../elements/icon'
import { TextInput } from './text-input'
import type { Sizes } from './text-input-helpers/text-input-base'

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
    readonly?: boolean
    disabled?: boolean

    hideIcon?: boolean
    requiredMessage?: string
    successMessage?: string
    maxCharacters?: number

    onChange?: (value: string) => void

    formSync?: FormSync
}

const parser = (name: string): Record<string, string> | string => {
    const parsedName = parseFullName(name)
    if (parsedName.error?.length !== 0) return name
    return {
        title: parsedName.title ?? '',
        first: parsedName.first ?? '',
        middle: parsedName.middle ?? '',
        last: parsedName.last ?? '',
        nick: parsedName.nick ?? '',
        suffix: parsedName.suffix ?? '',
        full: name,
    }
}

export const NameInput = (props: Props): JSX.Element => {
    const { onChange } = props
    const handleChange = useCallback(
        (value: string): string => {
            if (onChange) onChange(value)
            return value
        },
        [onChange]
    )
    return (
        <TextInput
            id={props.id}
            label={props.label ?? 'Full name'}
            name={props.name}
            type='text'
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            help={props.help}
            info={props.info}
            size={props.size}
            optional={props.optional}
            hideOptionalLabel={props.hideOptionalLabel}
            readonly={props.readonly}
            disabled={props.disabled}
            prefix={props.hideIcon ? '' : <User />}
            requiredMessage={props.requiredMessage ?? 'Enter your name'}
            successMessage={props.successMessage ?? ''}
            validationRules={[
                {
                    assert: (value: string) => !isEmail(value),
                    error: 'Cannot be an email',
                },
                {
                    assert: (value: string) => !isURL(value),
                    error: 'Cannot be a url',
                },
            ]}
            onUpdate={handleChange}
            parser={parser}
            maxCharacters={props.maxCharacters}
            formSync={props.formSync}
        />
    )
}

export type NameInput = ReturnType<typeof NameInput>
