import { useCallback } from 'react'

import {
    isNumber,
    formatNumber,
    truncateDecimals,
    addThousandsSeparators,
    fixedDecimals,
} from '@nick-mazuk/lib/number-styling'

import type { FormSync } from '.'
import type { AffixContent } from './helpers/text-input-affix'
import type { Sizes } from './helpers/text-input-base'
import type { Progress, ValidationRules } from './text-input'
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
    readonly?: boolean
    disabled?: boolean
    decimals?: number
    maxDecimals?: number

    prefix?: AffixContent
    requiredMessage?: string
    successMessage?: string
    validationRules?: ValidationRules
    progress?: Progress

    onChange?: (value: string) => void

    formSync?: FormSync
}

const parser = (number: string): string => {
    return formatNumber(number).replace(/,/gu, '')
}

const onFormat = (number: string, decimals: number | undefined): string => {
    if (decimals) return fixedDecimals(formatNumber(number), decimals)
    return formatNumber(number)
}

const onUpdate = (number: string, oldNumber: string, decimals: number | undefined): string => {
    if (number === '' || number === '-') return number
    if (isNumber(number)) {
        let string = addThousandsSeparators(number)
        if (decimals) string = truncateDecimals(string, decimals)
        return string
    }
    return oldNumber
}

export const NumberInput = (props: Props): JSX.Element => {
    const maxDecimals = props.maxDecimals ?? props.decimals
    const { onChange } = props
    const updater = useCallback(
        (number: string, oldNumber: string): string => {
            const newNumber = onUpdate(number, oldNumber, maxDecimals)
            if (newNumber !== oldNumber && onChange) onChange(newNumber)
            return newNumber
        },
        [maxDecimals, onChange]
    )

    const formatter = useCallback(
        (number: string): string => {
            return onFormat(number, props.decimals)
        },
        [props.decimals]
    )
    return (
        <TextInput
            id={props.id}
            label={props.label ?? 'Number'}
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
            prefix={props.prefix}
            successMessage={props.successMessage}
            requiredMessage={props.requiredMessage}
            formatter={formatter}
            onUpdate={updater}
            parser={parser}
            progress={props.progress}
            tabNums
            keyboard='decimal'
            validationRules={props.validationRules}
            formSync={props.formSync}
        />
    )
}

export type NumberInput = ReturnType<typeof NumberInput>
