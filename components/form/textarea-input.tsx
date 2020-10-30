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

    formSync?: FormSync
}

export const TextAreaInput = (props: Props): JSX.Element => {
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
            onUpdate={props.onUpdate}
            validationRules={props.validationRules}
            parser={props.parser}
            formatter={props.formatter}
            progress={props.progress}
            formSync={props.formSync}
        />
    )
}

export type TextAreaInput = ReturnType<typeof TextAreaInput>
