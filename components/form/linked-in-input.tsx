import { useCallback } from 'react'

import isURL from 'validator/lib/isURL'

import type { FormSync } from '.'
import type { Icon } from '../../elements/icon'
import { LinkedIn } from '../../elements/icon'
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
    icon?: Icon

    hideIcon?: boolean
    requiredMessage?: string
    successMessage?: string
    disableAutocomplete?: boolean
    maxCharacters?: number

    onChange?: (value: string) => void

    formSync?: FormSync
}

const validationRules = [
    {
        assert: (value: string) => isURL(value, { protocols: ['http', 'https'] }),
        error: `Enter a valid url`,
    },
]

export const LinkedInInput = (props: Props): JSX.Element => {
    const label = props.label ?? 'LinkedIn page'
    const icon = props.icon ?? <LinkedIn />

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
            label={label}
            name={props.name}
            type='url'
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            help={props.help}
            info={props.info}
            size={props.size}
            optional={props.optional}
            hideOptionalLabel={props.hideOptionalLabel}
            readonly={props.readonly}
            disabled={props.disabled}
            prefix={props.hideIcon ? '' : icon}
            requiredMessage={props.requiredMessage ?? `Enter a LinkedIn page url`}
            successMessage={props.successMessage ?? ''}
            validationRules={validationRules}
            onUpdate={handleChange}
            maxCharacters={props.maxCharacters}
            keyboard='url'
            formSync={props.formSync}
        />
    )
}

export type LinkedInInput = ReturnType<typeof LinkedInInput>
