import type { FormSync } from '.'
import type { AffixContent } from './helpers/text-input-affix'
import type { Sizes } from './helpers/text-input-base'
import { NumberInput } from './number-input'
import type { Progress } from './text-input'

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
    requireDecimals?: boolean

    prefix?: AffixContent
    requiredMessage?: string
    successMessage?: string
    progress?: Progress

    onChange?: (value: string) => void

    formSync?: FormSync
}

export const DollarInput = (props: Props): JSX.Element => {
    return (
        <NumberInput
            id={props.id}
            label={props.label ?? 'Dollar amount'}
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
            onChange={props.onChange}
            maxDecimals={2}
            // eslint-disable-next-line no-undefined -- undefined required
            decimals={props.requireDecimals ? 2 : undefined}
            progress={props.progress}
            prefix='$'
            formSync={props.formSync}
        />
    )
}

export type DollarInput = ReturnType<typeof DollarInput>
