import { useCallback } from 'react'

import { isNumber } from '@nick-mazuk/lib/number-styling'
import { dateStringToMilli, isValidDate } from '@nick-mazuk/lib/time'

import type { FormSync } from '.'
import { Calendar } from '../../elements/icon'
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
    decimals?: number

    hideIcon?: boolean
    requiredMessage?: string
    successMessage?: string

    onChange?: (value: string) => void

    formSync?: FormSync
}

const parser = (date: string): string => {
    return String(dateStringToMilli(date))
}

export const DateInput = (props: Props): JSX.Element => {
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
            type='text'
            id={props.id}
            label={props.label ?? 'Date'}
            name={props.name}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            help={props.help}
            info={props.info}
            size={props.size}
            optional={props.optional}
            hideOptionalLabel={props.hideOptionalLabel}
            readonly={props.readonly}
            disabled={props.disabled}
            successMessage={props.successMessage}
            requiredMessage={props.requiredMessage}
            onUpdate={handleChange}
            validationRules={[
                {
                    assert: (value: string) => isValidDate(value),
                    error: 'Must be a valid date',
                },
                {
                    assert: (value: string) => !isNumber(value),
                    error: 'Cannot be a number',
                },
            ]}
            prefix={props.hideIcon ? '' : <Calendar />}
            parser={parser}
            formSync={props.formSync}
        />
    )
}

export type DateInput = ReturnType<typeof DateInput>
