import { useCallback } from 'react'

import type { FormSync } from 'components/form'
import type { AffixContent } from 'components/form/helpers/text-input-affix'
import type { Sizes } from 'components/form/helpers/text-input-base'
import { TextInput } from 'components/form/text-input'

type Props = {
    children?: never
    label?: string
    name?: string
    id?: string

    placeholder?: string
    defaultValue?: string
    size?: Sizes
    optional?: boolean
    readonly?: boolean
    disabled?: boolean
    decimals?: number
    maxDecimals?: number

    prefix?: AffixContent
    requiredMessage?: string
    successMessage?: string

    formSync?: FormSync
}

const parser = (number: string): string => {
    return number.replaceAll(',', '')
}

const onFormat = (number: string, decimals: number | undefined): string => {
    if (number.startsWith('.')) return `0${number}`
    if (number.endsWith('.')) return number.slice(0, -1)
    if (decimals && number.charAt(number.length - decimals) === '.') return `${number}0`
    return number
}

const onUpdate = (number: string, oldNumber: string, decimals: number | undefined): string => {
    // eslint-disable-next-line unicorn/no-unsafe-regex -- no idea how to fix
    if (number.match(/^([\d,]*\.?(\d*)?)?$/u)) {
        const string = number.startsWith('.') ? `0${number}` : number
        const parts = string.replaceAll(',', '').toString().split('.')
        // eslint-disable-next-line unicorn/no-unsafe-regex -- no idea how to fix
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/gu, ',')
        if (decimals && parts[1]) parts[1] = parts[1].slice(0, decimals)
        return parts.join('.')
    }
    return oldNumber
}

export const NumberInput = (props: Props): JSX.Element => {
    const maxDecimals = props.maxDecimals ?? props.decimals
    const updater = useCallback(
        (number: string, oldNumber: string): string => {
            return onUpdate(number, oldNumber, maxDecimals)
        },
        [maxDecimals]
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
            size={props.size}
            optional={props.optional}
            readonly={props.readonly}
            disabled={props.disabled}
            prefix={props.prefix}
            successMessage={props.successMessage}
            requiredMessage={props.requiredMessage}
            formatter={formatter}
            onUpdate={updater}
            parser={parser}
            tabNums
            keyboard='decimal'
            formSync={props.formSync}
        />
    )
}

export type NumberInput = ReturnType<typeof NumberInput>
