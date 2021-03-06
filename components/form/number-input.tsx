import { useCallback } from 'react'

import {
    isNumber,
    formatNumber,
    truncateDecimals,
    addThousandsSeparators,
    fixedDecimals,
    stringToNumber,
} from '@nick-mazuk/lib/number-styling'

import type { FormSync } from '.'
import type { WithClickCallback } from '../../hoc/with-click'
import type { Progress, ValidationRules } from './text-input'
import { TextInput } from './text-input'
import type { AffixContent } from './text-input-helpers/text-input-affix'
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
    maxDecimals?: number
    min?: number
    max?: number
    disallowNegatives?: boolean

    prefix?: AffixContent
    prefixOnClick?: WithClickCallback
    suffix?: AffixContent
    suffixOnClick?: WithClickCallback
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

const onUpdate = (
    number: string,
    oldNumber: string,
    decimals: number | undefined,
    disallowNegatives: boolean | undefined
): string => {
    if (disallowNegatives && number.match(/-/u)) return oldNumber
    if (decimals === 0 && number.match(/\./u)) return oldNumber
    if (number === '' || number === '-') return number
    if (isNumber(number)) {
        let string = addThousandsSeparators(number)
        if (decimals) string = truncateDecimals(string, decimals)
        return string
    }
    return oldNumber
}

const createValidationRules = (props: Props): ValidationRules => {
    const { min, max, validationRules } = props
    const rules = validationRules ?? []
    if (typeof min !== 'undefined') {
        rules.push({
            assert: (value) => stringToNumber(value) >= min,
            error: `Must be greater than ${min}`,
        })
    }
    if (typeof max !== 'undefined') {
        rules.push({
            assert: (value) => stringToNumber(value) <= max,
            error: `Must be greater than ${max}`,
        })
    }
    return rules
}

export const NumberInput = (props: Props): JSX.Element => {
    const maxDecimals = props.maxDecimals ?? props.decimals
    const { onChange } = props
    const updater = useCallback(
        (number: string, oldNumber: string): string => {
            const newNumber = onUpdate(number, oldNumber, maxDecimals, props.disallowNegatives)
            if (newNumber !== oldNumber && onChange) onChange(newNumber)
            return newNumber
        },
        [maxDecimals, onChange, props.disallowNegatives]
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
            prefixOnClick={props.prefixOnClick}
            suffix={props.suffix}
            suffixOnClick={props.prefixOnClick}
            successMessage={props.successMessage}
            requiredMessage={props.requiredMessage}
            formatter={formatter}
            onUpdate={updater}
            parser={parser}
            progress={props.progress}
            tabNums
            keyboard='decimal'
            validationRules={createValidationRules(props)}
            formSync={props.formSync}
        />
    )
}

export type NumberInput = ReturnType<typeof NumberInput>
